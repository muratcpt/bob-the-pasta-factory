"use client";
import { motion } from "framer-motion";
import { RESTAURANT } from "@/lib/data";

function PhoneIcon({ size = 28, color = "#C9A24B" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
    </svg>
  );
}

export default function PhoneWidget({
  variant = "dark",
  size = "md",
}: {
  variant?: "dark" | "light";
  size?: "sm" | "md";
}) {
  const isDark = variant === "dark";
  const isSm = size === "sm";
  return (
    <motion.a
      href={`tel:${RESTAURANT.phoneRaw}`}
      whileHover={{ scale: 1.04, y: -1 }}
      whileTap={{ scale: 0.97 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: isSm ? 10 : 14,
        padding: isSm ? "9px 16px" : "12px 20px",
        borderRadius: 14,
        background: isDark ? "rgba(20,14,10,.88)" : "var(--bg-alt)",
        backdropFilter: isDark ? "blur(12px)" : "none",
        border: isDark ? "1px solid rgba(255,255,255,.12)" : "1.5px solid var(--border)",
        textDecoration: "none",
        boxShadow: isDark ? "0 4px 20px rgba(0,0,0,.25)" : "0 2px 12px rgba(120,70,40,.1)",
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      <div style={{ position: "relative", flexShrink: 0 }}>
        <motion.div
          animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2.3, ease: "easeOut" }}
          style={{
            position: "absolute",
            inset: -6,
            borderRadius: "50%",
            background: isDark ? "rgba(201,162,75,.3)" : "rgba(193,68,45,.3)",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2.3, delay: 0.15, ease: "easeOut" }}
          style={{
            position: "absolute",
            inset: -3,
            borderRadius: "50%",
            background: isDark ? "rgba(201,162,75,.25)" : "rgba(193,68,45,.25)",
          }}
        />
        <motion.div
          animate={{
            rotate: [0, -16, 16, -13, 13, -9, 9, -5, 5, 0],
            scale: [1, 1.08, 1.08, 1.05, 1.05, 1.02, 1.02, 1, 1, 1],
          }}
          transition={{ duration: 0.85, repeat: Infinity, repeatDelay: 2.6, ease: "easeInOut" }}
          style={{
            width: isSm ? 36 : 44,
            height: isSm ? 36 : 44,
            borderRadius: "50%",
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: isDark
              ? "linear-gradient(135deg,#C9A24B,#E7C27D)"
              : "linear-gradient(135deg,var(--primary),var(--primary-dark))",
            boxShadow: isDark ? "0 3px 14px rgba(201,162,75,.4)" : "0 3px 14px rgba(193,68,45,.4)",
          }}
        >
          <PhoneIcon size={isSm ? 16 : 20} color={isDark ? "#2A1D10" : "#fff"} />
        </motion.div>
      </div>
      <div>
        <div
          style={{
            fontSize: isSm ? 10 : 11,
            fontWeight: 600,
            letterSpacing: ".04em",
            textTransform: "uppercase",
            color: isDark ? "rgba(255,255,255,.55)" : "var(--text-muted)",
            marginBottom: 3,
          }}
        >
          Hemen Arayın:
        </div>
        <div style={{ fontSize: isSm ? 14 : 16, fontWeight: 800, color: isDark ? "#fff" : "var(--text)" }}>
          {RESTAURANT.phone}
        </div>
      </div>
    </motion.a>
  );
}
