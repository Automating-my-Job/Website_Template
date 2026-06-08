/**
 * Dynamic OpenGraph image (1200x630) generated at the edge via next/og.
 * Next.js auto-serves this file's default export as the route's og:image.
 * Exports `runtime`, `alt`, `size`, and `contentType` metadata that Next reads.
 * Renders a static branded card (accent bar, name, title, domain) as a PNG.
 */
import { ImageResponse } from "next/og";

export const alt = "Tom Romano, OPS GS LLC";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#FAFAFA",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            width: "64px",
            height: "4px",
            background: "#2563EB",
            borderRadius: "2px",
          }}
        />

        {/* Center content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "18px",
              fontWeight: 500,
              color: "#2563EB",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            OPS GS LLC
          </div>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 700,
              color: "#0F172A",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Tom Romano
          </div>
          <div
            style={{
              fontSize: "36px",
              fontWeight: 400,
              color: "#334155",
              letterSpacing: "-0.01em",
            }}
          >
            The Technical Chief of Staff
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "18px", color: "#64748B" }}>opsgs.com</div>
          <div
            style={{
              fontSize: "14px",
              color: "#94A3B8",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Strategy & Operations
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
