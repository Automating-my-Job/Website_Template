/**
 * Per-route OpenGraph image (1200x630) for /work, the hiring portfolio.
 * Mirrors the root app/opengraph-image.tsx convention (statically generated
 * branded card) but leads with the "hire me" framing so a shared /work link
 * previews as the person, not the studio.
 */
import { ImageResponse } from "next/og";

export const alt = "Tom Romano, the Technical Chief of Staff";
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
            Tom Romano, VP Strategy & Execution
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
            The Technical Chief of Staff
          </div>
          <div
            style={{
              fontSize: "32px",
              fontWeight: 400,
              color: "#334155",
              letterSpacing: "-0.01em",
            }}
          >
            Thirteen years running executive operating systems.
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
          <div style={{ fontSize: "18px", color: "#64748B" }}>opsgs.com/work</div>
          <div
            style={{
              fontSize: "14px",
              color: "#94A3B8",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Portfolio
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
