import { NextRequest, NextResponse } from "next/server";

import { DIAGNOSIS_IMAGE_BUCKET } from "../../../../lib/diagnoses/images";
import { createAdminClient } from "../../../../lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const USERS_PER_PAGE = 200;
const STORAGE_DELETE_BATCH_SIZE = 100;

type DiagnosisRow = {
  id: string;
  before_image_path: string | null;
  after_image_path: string | null;
};

function getInactiveCutoffDate() {
  const cutoff = new Date();

  cutoff.setUTCFullYear(
    cutoff.getUTCFullYear() - 1,
  );

  return cutoff;
}

function isAuthorized(
  request: NextRequest,
) {
  const cronSecret =
    process.env.CRON_SECRET;

  if (!cronSecret) {
    console.error(
      "[AKANUKE.AI] CRON_SECRET が設定されていません",
    );

    return false;
  }

  return (
    request.headers.get(
      "authorization",
    ) === `Bearer ${cronSecret}`
  );
}

export async function GET(
  request: NextRequest,
) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  const dryRun =
    request.nextUrl.searchParams.get(
      "dryRun",
    ) === "true";

  try {
    const adminClient =
      createAdminClient();

    const cutoff =
      getInactiveCutoffDate();

    let page = 1;
    let scannedUserCount = 0;
    let inactiveUserCount = 0;
    let plannedDiagnosisCount = 0;
    let plannedImageCount = 0;
    let deletedDiagnosisCount = 0;
    let deletedImageCount = 0;

    const failedUsers: Array<{
      userId: string;
      reason: string;
    }> = [];

    while (true) {
      const {
        data,
        error: usersError,
      } =
        await adminClient.auth.admin.listUsers(
          {
            page,
            perPage:
              USERS_PER_PAGE,
          },
        );

      if (usersError) {
        throw usersError;
      }

      const users =
        data.users ?? [];

      if (users.length === 0) {
        break;
      }

      scannedUserCount +=
        users.length;

      for (const user of users) {
        const referenceDateValue =
          user.last_sign_in_at ??
          user.created_at;

        if (!referenceDateValue) {
          continue;
        }

        const referenceDate =
          new Date(
            referenceDateValue,
          );

        if (
          Number.isNaN(
            referenceDate.getTime(),
          )
        ) {
          console.error(
            "[AKANUKE.AI] 最終ログイン日時の解析に失敗",
            {
              userId: user.id,
              referenceDateValue,
            },
          );

          continue;
        }

        if (
          referenceDate >= cutoff
        ) {
          continue;
        }

        inactiveUserCount += 1;

        try {
          const {
            data: diagnoses,
            error:
              diagnosesError,
          } = await adminClient
            .from("diagnoses")
            .select(
              "id, before_image_path, after_image_path",
            )
            .eq(
              "user_id",
              user.id,
            )
            .returns<
              DiagnosisRow[]
            >();

          if (diagnosesError) {
            throw diagnosesError;
          }

          if (
            !diagnoses ||
            diagnoses.length === 0
          ) {
            continue;
          }

          const imagePaths =
            Array.from(
              new Set(
                diagnoses.flatMap(
                  (
                    diagnosis,
                  ) =>
                    [
                      diagnosis.before_image_path,
                      diagnosis.after_image_path,
                    ].filter(
                      (
                        path,
                      ): path is string =>
                        typeof path ===
                          "string" &&
                        path.length >
                          0,
                    ),
                ),
              ),
            );

          plannedDiagnosisCount +=
            diagnoses.length;

          plannedImageCount +=
            imagePaths.length;

          if (dryRun) {
            console.log(
              "[AKANUKE.AI] 長期未ログイン削除 dry-run",
              {
                userId:
                  user.id,
                diagnosisCount:
                  diagnoses.length,
                imageCount:
                  imagePaths.length,
                lastSignInAt:
                  user.last_sign_in_at,
              },
            );

            continue;
          }

          for (
            let index = 0;
            index <
            imagePaths.length;
            index +=
            STORAGE_DELETE_BATCH_SIZE
          ) {
            const batch =
              imagePaths.slice(
                index,
                index +
                  STORAGE_DELETE_BATCH_SIZE,
              );

            const {
              error:
                storageDeleteError,
            } =
              await adminClient.storage
                .from(
                  DIAGNOSIS_IMAGE_BUCKET,
                )
                .remove(batch);

            if (
              storageDeleteError
            ) {
              throw storageDeleteError;
            }

            deletedImageCount +=
              batch.length;
          }

          const diagnosisIds =
            diagnoses.map(
              (
                diagnosis,
              ) =>
                diagnosis.id,
            );

          const {
            error:
              diagnosisDeleteError,
          } = await adminClient
            .from("diagnoses")
            .delete()
            .eq(
              "user_id",
              user.id,
            )
            .in(
              "id",
              diagnosisIds,
            );

          if (
            diagnosisDeleteError
          ) {
            throw diagnosisDeleteError;
          }

          deletedDiagnosisCount +=
            diagnosisIds.length;

          console.log(
            "[AKANUKE.AI] 長期未ログインユーザーの診断データを削除",
            {
              userId:
                user.id,
              diagnosisCount:
                diagnosisIds.length,
              imageCount:
                imagePaths.length,
              lastSignInAt:
                user.last_sign_in_at,
            },
          );
        } catch (userError) {
          console.error(
            "[AKANUKE.AI] 長期未ログインユーザーの削除に失敗",
            {
              userId:
                user.id,
              error:
                userError,
            },
          );

          failedUsers.push({
            userId:
              user.id,
            reason:
              userError instanceof
              Error
                ? userError.message
                : "Unknown error",
          });
        }
      }

      if (
        users.length <
        USERS_PER_PAGE
      ) {
        break;
      }

      page += 1;
    }

    const hasFailures =
      failedUsers.length > 0;

    return NextResponse.json(
      {
        success: !hasFailures,
        dryRun,
        cutoff:
          cutoff.toISOString(),
        scannedUserCount,
        inactiveUserCount,
        plannedDiagnosisCount,
        plannedImageCount,
        deletedDiagnosisCount,
        deletedImageCount,
        failedUserCount:
          failedUsers.length,
        failedUsers,
      },
      {
        status:
          hasFailures ? 500 : 200,
      },
    );
  } catch (error) {
    console.error(
      "[AKANUKE.AI] 長期未ログインデータ削除Cronエラー",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "長期未ログインデータの削除処理に失敗しました。",
      },
      {
        status: 500,
      },
    );
  }
}