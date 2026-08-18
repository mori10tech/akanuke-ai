import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  const client =
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim() ?? "";

  const publisherId = client.replace(/^ca-/, "");

  if (!/^pub-\d{16}$/.test(publisherId)) {
    return new NextResponse(
      "# NEXT_PUBLIC_ADSENSE_CLIENT is not configured.\n",
      {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store",
        },
      },
    );
  }

  return new NextResponse(
    `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    },
  );
}
