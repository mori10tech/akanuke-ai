import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const inquiryTypes = [
  "サービスの使い方について",
  "AI診断について",
  "Afterイメージについて",
  "ログイン・LINE連携について",
  "アカウント・データについて",
  "不具合について",
  "その他",
] as const;

type ContactRequestBody = {
  name?: unknown;
  email?: unknown;
  category?: unknown;
  message?: unknown;
  privacyConsent?: unknown;
  website?: unknown;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    let body: ContactRequestBody;

    try {
      body = (await request.json()) as ContactRequestBody;
    } catch {
      return NextResponse.json(
        {
          ok: false,
          message: "送信内容を確認できませんでした。",
        },
        {
          status: 400,
        },
      );
    }

    const name = normalizeText(body.name);
    const email = normalizeText(body.email);
    const category = normalizeText(body.category);
    const message = normalizeText(body.message);
    const website = normalizeText(body.website);

    /*
     * Bot対策用のハニーポット。
     * 通常のユーザーには表示しない項目です。
     * 値が入っている場合はBotの可能性が高いため、
     * メールを送信せず正常終了として扱います。
     */
    if (website) {
      return NextResponse.json({
        ok: true,
      });
    }

    if (!name || name.length > 100) {
      return NextResponse.json(
        {
          ok: false,
          message: "お名前を正しく入力してください。",
        },
        {
          status: 400,
        },
      );
    }

    if (!email || email.length > 254 || !isValidEmail(email)) {
      return NextResponse.json(
        {
          ok: false,
          message: "メールアドレスを正しく入力してください。",
        },
        {
          status: 400,
        },
      );
    }

    if (
      !category ||
      !inquiryTypes.includes(
        category as (typeof inquiryTypes)[number],
      )
    ) {
      return NextResponse.json(
        {
          ok: false,
          message: "お問い合わせ種別を正しく選択してください。",
        },
        {
          status: 400,
        },
      );
    }

    if (!message || message.length > 3000) {
      return NextResponse.json(
        {
          ok: false,
          message: "お問い合わせ内容を正しく入力してください。",
        },
        {
          status: 400,
        },
      );
    }

    if (body.privacyConsent !== true) {
      return NextResponse.json(
        {
          ok: false,
          message: "個人情報の取扱いへの同意が必要です。",
        },
        {
          status: 400,
        },
      );
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT ?? "587");
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;

    const fromEmail =
      process.env.CONTACT_FROM_EMAIL ?? "info@akanukeai.com";

    const toEmail =
      process.env.CONTACT_TO_EMAIL ?? "info@akanukeai.com";

    if (
      !smtpHost ||
      !smtpUser ||
      !smtpPassword ||
      !Number.isInteger(smtpPort)
    ) {
      console.error(
        "[contact] SMTP environment variables are not configured.",
      );

      return NextResponse.json(
        {
          ok: false,
          message:
            "現在お問い合わせを送信できません。時間をおいてもう一度お試しください。",
        },
        {
          status: 503,
        },
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });

    const mailText = [
      "AKANUKE.AIのお問い合わせフォームから",
      "新しいお問い合わせが届きました。",
      "",
      "■ お名前",
      name,
      "",
      "■ メールアドレス",
      email,
      "",
      "■ お問い合わせ種別",
      category,
      "",
      "■ お問い合わせ内容",
      message,
      "",
      "------------------------------",
    ].join("\n");

    await transporter.sendMail({
      from: {
        name: "AKANUKE.AI",
        address: fromEmail,
      },
      to: toEmail,
      replyTo: email,
      subject: `【AKANUKE.AI】お問い合わせ｜${category}`,
      text: mailText,
    });

    return NextResponse.json({
      ok: true,
      message: "お問い合わせを送信しました。",
    });
  } catch (error) {
    console.error("[contact] Failed to send contact email.", error);

    return NextResponse.json(
      {
        ok: false,
        message:
          "お問い合わせの送信に失敗しました。時間をおいてもう一度お試しください。",
      },
      {
        status: 500,
      },
    );
  }
}