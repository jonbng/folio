import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Check if request is from localhost
    const hostname = request.nextUrl.hostname;
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "Unknown";

    // Ignore localhost requests
    if (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      ip === "127.0.0.1" ||
      ip === "::1" ||
      ip.startsWith("127.") ||
      ip === "::ffff:127.0.0.1"
    ) {
      return NextResponse.json({ success: true, ignored: true });
    }

    const webhookUrl =
      "https://discord.com/api/webhooks/1441360221158113381/DoTJned3ebb3NoJ_4Yhi9eClkcs5mIo2ytotjom7IIb94UofehBZ6oO1X37RZ8Y9ueqZ";

    // Get visitor information
    const userAgent = request.headers.get("user-agent") || "Unknown";
    const timestamp = new Date().toISOString();
    const referer = request.headers.get("referer") || "Direct";
    const acceptLanguage = request.headers.get("accept-language") || "Unknown";

    // Format the Discord message
    const embed = {
      title: "🔔 New Visitor on /block",
      color: 0x5865f2, // Discord blurple
      fields: [
        {
          name: "🌐 IP Address",
          value: `\`${ip}\``,
          inline: true,
        },
        {
          name: "⏰ Timestamp",
          value: `\`${timestamp}\``,
          inline: true,
        },
        {
          name: "🖥️ User Agent",
          value: `\`\`\`${userAgent.substring(0, 100)}${userAgent.length > 100 ? "..." : ""}\`\`\``,
          inline: false,
        },
        {
          name: "🔗 Referer",
          value: `\`${referer}\``,
          inline: true,
        },
        {
          name: "🌍 Language",
          value: `\`${acceptLanguage}\``,
          inline: true,
        },
      ],
      timestamp: timestamp,
      footer: {
        text: "Block Page Tracker",
      },
    };

    // Send to Discord webhook
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [embed],
      }),
    });

    if (!response.ok) {
      console.error("Failed to send webhook:", await response.text());
      return NextResponse.json(
        { error: "Failed to send webhook" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error tracking visit:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
