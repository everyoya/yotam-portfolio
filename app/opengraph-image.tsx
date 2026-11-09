import { ImageResponse } from "next/og";

export const alt = "Yotam Harel - Product marketing, GTM, and product education";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "flex-start",
          background: "#ffffff",
          color: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "68px 76px",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            color: "#0066ff",
            display: "flex",
            fontFamily: "Arial, sans-serif",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          Yotam Harel
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 72,
              fontWeight: 500,
              letterSpacing: "-0.045em",
              lineHeight: 1.04,
              maxWidth: 910,
            }}
          >
            Projects that make products easier to understand.
          </div>
          <div
            style={{
              color: "#525252",
              display: "flex",
              fontFamily: "Arial, sans-serif",
              fontSize: 28,
              lineHeight: 1.3,
            }}
          >
            Product marketing · GTM · Product education
          </div>
        </div>

        <div
          style={{
            borderTop: "2px solid #0a0a0a",
            display: "flex",
            fontFamily: "Arial, sans-serif",
            fontSize: 22,
            justifyContent: "space-between",
            paddingTop: 18,
            width: "100%",
          }}
        >
          <span>yotamharel.com</span>
          <span>Selected work</span>
        </div>
      </div>
    ),
    size,
  );
}
