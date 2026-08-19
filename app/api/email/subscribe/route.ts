import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const SMTP_HOST = "mail.spacemail.com";
const SMTP_PORT = 465;
const SMTP_USER = process.env.SPACEMAIL_USER || "costumer@vexdou.space";
const SMTP_PASSWORD = process.env.SPACEMAIL_PASSWORD || "";
const WEBSITE = "https://vexdou.space";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildHtmlEmail(recipient: string) {
  const safeRecipient = escapeHtml(recipient);
  const year = new Date().getFullYear();

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Welcome to Vexdou.space</title>
</head>
<body style="margin:0;padding:0;background:#eef2f7;font-family:Arial,Helvetica,sans-serif;color:#172033;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:30px 10px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:650px;background:#fff;border-radius:24px;overflow:hidden;box-shadow:0 15px 50px rgba(0,0,0,.10);">
<tr><td align="center" style="padding:48px 25px;background:linear-gradient(135deg,#0f172a 0%,#1d4ed8 55%,#7c3aed 100%);color:#fff;">
<div style="width:75px;height:75px;line-height:75px;margin:auto;border-radius:22px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.20);font-size:35px;font-weight:900;">V</div>
<div style="margin-top:20px;font-size:32px;font-weight:900;letter-spacing:-1px;">Vexdou</div>
<div style="margin-top:9px;font-size:14px;opacity:.88;">Modern Digital Experience</div>
</td></tr>
<tr><td style="padding:40px 32px;">
<div style="font-size:26px;font-weight:800;color:#111827;margin-bottom:16px;">Hello 👋</div>
<div style="font-size:15px;line-height:1.8;color:#64748b;">
Welcome to <strong style="color:#2563eb;">Vexdou.space</strong>.<br><br>
We're happy to connect with you. Vexdou is a modern digital platform focused on technology, creative design, useful digital services, and creating a smooth experience for every visitor.
</div>
<div style="margin-top:32px;font-size:12px;font-weight:900;letter-spacing:1.5px;color:#2563eb;">ABOUT VEXDOU</div>
<div style="margin-top:10px;font-size:15px;line-height:1.8;color:#64748b;">
Vexdou is built around a simple vision: <strong style="color:#334155;">create modern digital experiences that are beautiful, fast, useful and easy to use.</strong><br><br>
Our platform continues to grow with new ideas, features and digital experiences.
</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:25px;">
<tr><td style="padding:18px;background:#f8fafc;border:1px solid #edf1f5;border-radius:16px;"><div style="font-size:16px;font-weight:800;color:#172033;">✦ Modern Digital Experiences</div><div style="margin-top:7px;font-size:13px;line-height:1.6;color:#64748b;">Clean and modern experiences designed with simplicity and quality in mind.</div></td></tr>
<tr><td style="height:10px;"></td></tr>
<tr><td style="padding:18px;background:#f8fafc;border:1px solid #edf1f5;border-radius:16px;"><div style="font-size:16px;font-weight:800;color:#172033;">⚡ Fast & Responsive</div><div style="margin-top:7px;font-size:13px;line-height:1.6;color:#64748b;">Designed to provide a smooth experience across modern devices.</div></td></tr>
<tr><td style="height:10px;"></td></tr>
<tr><td style="padding:18px;background:#f8fafc;border:1px solid #edf1f5;border-radius:16px;"><div style="font-size:16px;font-weight:800;color:#172033;">🌐 Vexdou.space</div><div style="margin-top:7px;font-size:13px;line-height:1.6;color:#64748b;">Your destination for the growing Vexdou digital platform.</div></td></tr>
<tr><td style="height:10px;"></td></tr>
<tr><td style="padding:18px;background:#f8fafc;border:1px solid #edf1f5;border-radius:16px;"><div style="font-size:16px;font-weight:800;color:#172033;">🚀 Always Improving</div><div style="margin-top:7px;font-size:13px;line-height:1.6;color:#64748b;">Vexdou continues to evolve with new ideas, features and experiences.</div></td></tr>
</table>
<div style="text-align:center;margin-top:34px;"><a href="${WEBSITE}" style="display:inline-block;padding:16px 30px;border-radius:13px;background:#2563eb;color:#fff;text-decoration:none;font-size:14px;font-weight:800;">Explore Vexdou.space →</a></div>
<div style="margin-top:32px;padding:22px;border-radius:17px;background:#eff6ff;border:1px solid #dbeafe;">
<div style="font-size:15px;font-weight:800;color:#1e3a8a;">A Personal Message From Vexdou</div>
<div style="margin-top:9px;font-size:13px;line-height:1.8;color:#475569;">Thank you for connecting with Vexdou. Every part of Vexdou.space is being built with attention to quality, creativity and a better digital experience. We appreciate your interest in what we're building.</div>
</div>
<div style="margin-top:28px;padding:20px;border-radius:16px;background:#f8fafc;">
<div style="font-size:12px;font-weight:900;letter-spacing:1px;color:#64748b;margin-bottom:12px;">MESSAGE INFORMATION</div>
<div style="font-size:13px;line-height:2;color:#475569;"><strong>Recipient:</strong> ${safeRecipient}<br><strong>Sender:</strong> costumer@vexdou.space<br><strong>Website:</strong> Vexdou.space</div>
</div>
</td></tr>
<tr><td align="center" style="padding:32px 20px;background:#0f172a;color:#94a3b8;font-size:12px;line-height:1.8;">
<div style="font-size:20px;font-weight:900;color:#fff;">Vexdou</div>
<div>Vexdou.space</div>
<div><a href="${WEBSITE}" style="color:#60a5fa;text-decoration:none;">${WEBSITE}</a></div>
<div style="margin-top:15px;font-size:11px;color:#64748b;">© ${year} Vexdou. All rights reserved.</div>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const website = typeof body?.website === "string" ? body.website.trim() : "";

    if (website) {
      return NextResponse.json({ ok: true, message: "Thanks." });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, message: "Please enter a valid email address." }, { status: 400 });
    }

    if (!SMTP_PASSWORD) {
      console.error("SPACEMAIL_PASSWORD is not configured.");
      return NextResponse.json({ ok: false, message: "Email service is not configured yet." }, { status: 503 });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: true,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 20000,
    });

    await transporter.sendMail({
      from: `Vexdou <${SMTP_USER}>`,
      to: email,
      replyTo: SMTP_USER,
      subject: "Welcome to Vexdou.space ✦ Your Digital Experience Starts Here",
      text: `Hello,\n\nWelcome to Vexdou.space.\n\nVexdou is a modern digital platform focused on technology, creative design, useful digital services and smooth digital experiences.\n\nVisit: ${WEBSITE}\n\nThank you for connecting with Vexdou.\n\nVexdou\nVexdou.space`,
      html: buildHtmlEmail(email),
    });

    return NextResponse.json({ ok: true, message: "Your Vexdou email has been sent. Check your inbox." });
  } catch (error) {
    console.error("Vexdou email error:", error);
    return NextResponse.json({ ok: false, message: "We could not send the email right now. Please try again later." }, { status: 500 });
  }
}
