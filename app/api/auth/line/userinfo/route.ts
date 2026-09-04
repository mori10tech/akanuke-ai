import {
  NextRequest,
  NextResponse,
} from "next/server";

type LineProfile = {
  userId?: string;
  displayName?: string;
  pictureUrl?: string;
};

export async function GET(
  request: NextRequest,
) {
  const authorization =
    request.headers.get("authorization");

  if (
    !authorization?.startsWith("Bearer ")
  ) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  try {
    const response = await fetch(
      "https://api.line.me/v2/profile",
      {
        headers: {
          Authorization: authorization,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            "Failed to get LINE profile",
        },
        {
          status: response.status,
        },
      );
    }

    const profile =
      (await response.json()) as LineProfile;

    if (!profile.userId) {
      return NextResponse.json(
        {
          error:
            "LINE user ID was not returned",
        },
        {
          status: 502,
        },
      );
    }

    return NextResponse.json({
      sub: profile.userId,
      name: profile.displayName ?? "",
      picture: profile.pictureUrl ?? null,
    });
  } catch (error) {
    console.error(
      "LINE userinfo error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "LINE profile request failed",
      },
      {
        status: 500,
      },
    );
  }
}