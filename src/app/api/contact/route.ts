import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const CONTACT_TYPES: Record<string, string> = {
  bug: "バグ報告（アプリが正常に動かない）",
  feature: "機能の要望・改善提案",
  account: "アカウント・データに関するトラブル",
  privacy: "個人情報の削除・開示請求",
  other: "その他",
};

const ENV_OPTIONS: Record<string, string> = {
  iphone_safari: "iPhone / Safari",
  android_chrome: "Android / Chrome",
  pc_chrome: "PC / Chrome",
  pc_safari: "PC / Safari",
  pc_other: "PC / その他ブラウザ",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contactType, email, name, message, environment } = body;

    if (!contactType || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "必須項目が入力されていません" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { ok: false, error: "メールアドレスの形式が正しくありません" },
        { status: 400 }
      );
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error("SMTP configuration missing");
      return NextResponse.json(
        { ok: false, error: "メール送信の設定が完了していません" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort ?? "587", 10),
      secure: smtpPort === "465",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const envLabels =
      environment?.length > 0
        ? environment
            .map((key: string) => ENV_OPTIONS[key] ?? key)
            .join(", ")
        : "（未入力）";

    const text = [
      "【Tap4 お問い合わせ】",
      "",
      `■ お問い合わせの種類`,
      CONTACT_TYPES[contactType] ?? contactType,
      "",
      `■ メールアドレス`,
      email,
      "",
      `■ お名前`,
      name || "（未入力）",
      "",
      `■ 使用環境`,
      envLabels,
      "",
      `■ お問い合わせ内容`,
      message,
    ].join("\n");

    await transporter.sendMail({
      from: `"Tap4 お問い合わせ" <${smtpUser}>`,
      to: "tap4inquiry@gmail.com",
      replyTo: email,
      subject: `[Tap4] ${CONTACT_TYPES[contactType] ?? contactType} - ${email}`,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { ok: false, error: "送信に失敗しました" },
      { status: 500 }
    );
  }
}
