import {
  ImageResponse,
} from "next/og";

export const runtime = "edge";

export const alt =
  "AKANUKE.AI｜第一印象は、変えられる。";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType =
  "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #FFFFFF 0%, #F8FBFF 55%, #EEF6FF 100%)",
          color: "#111111",
          fontFamily:
            "Arial, Helvetica, sans-serif",
        }}
      >
        {/* 右上のブルー装飾 */}
        <div
          style={{
            position:
              "absolute",
            top: -170,
            right: -110,
            width: 520,
            height: 520,
            display: "flex",
            borderRadius:
              "999px",
            background:
              "linear-gradient(135deg, #1677FF 0%, #63A7FF 100%)",
            opacity: 0.1,
          }}
        />

        {/* 左下のブルー装飾 */}
        <div
          style={{
            position:
              "absolute",
            left: -160,
            bottom: -260,
            width: 620,
            height: 620,
            display: "flex",
            borderRadius:
              "999px",
            background:
              "#1677FF",
            opacity: 0.06,
          }}
        />

        {/* 黄色アクセント */}
        <div
          style={{
            position:
              "absolute",
            top: 72,
            right: 88,
            width: 22,
            height: 22,
            display: "flex",
            borderRadius:
              "999px",
            background:
              "#FFD400",
          }}
        />

        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection:
              "column",
            justifyContent:
              "center",
            padding:
              "68px 84px",
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems:
                "center",
              gap: 14,
              fontSize: 30,
              fontWeight: 800,
              letterSpacing:
                "-0.03em",
            }}
          >
            <span>
              AKANUKE
            </span>

            <span
              style={{
                color:
                  "#1677FF",
              }}
            >
              .AI
            </span>
          </div>

          {/* Badge */}
          <div
            style={{
              display: "flex",
              marginTop: 52,
              alignItems:
                "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems:
                  "center",
                padding:
                  "11px 20px",
                borderRadius:
                  999,
                background:
                  "#EEF6FF",
                color:
                  "#1677FF",
                fontSize: 21,
                fontWeight: 700,
                letterSpacing:
                  "0.04em",
              }}
            >
              AI × メンズ美容
            </div>
          </div>

          {/* Main copy */}
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 68,
              lineHeight: 1.15,
              fontWeight: 900,
              letterSpacing:
                "-0.045em",
            }}
          >
            第一印象は、
            <span
              style={{
                color:
                  "#1677FF",
              }}
            >
              変えられる。
            </span>
          </div>

          {/* Description */}
          <div
            style={{
              display: "flex",
              marginTop: 25,
              fontSize: 28,
              lineHeight: 1.55,
              fontWeight: 500,
              color:
                "rgba(17,17,17,0.62)",
            }}
          >
            AIが、あなただけの垢抜けプランを提案。
          </div>

          {/* Footer */}
          <div
            style={{
              marginTop: 54,
              display: "flex",
              alignItems:
                "center",
              justifyContent:
                "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems:
                  "center",
                padding:
                  "15px 25px",
                borderRadius:
                  14,
                background:
                  "#FFD400",
                color:
                  "#111111",
                fontSize: 22,
                fontWeight: 800,
              }}
            >
              AI診断を無料で試す
            </div>

            <div
              style={{
                display: "flex",
                color:
                  "rgba(17,17,17,0.38)",
                fontSize: 21,
                fontWeight: 600,
              }}
            >
              akanukeai.com
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}