"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { RESTAURANT, MENU } from "@/lib/data";
import { fadeUp, staggerContainer, scaleIn } from "@/lib/animations";
import AnimatedCTAButton from "@/components/ui/AnimatedCTAButton";

/* ─── Dekoratif fesleğen yaprağı / buhar SVG'leri (inline data URI — HTTP isteği yok) ─── */
const LEAF_SHAPES = [
  `<svg xmlns='http://www.w3.org/2000/svg' width='54' height='54' viewBox='0 0 54 54'><path d='M27 3C40 9 49 20 49 31c0 12-10 20-22 20S5 43 5 31C5 20 14 9 27 3z' fill='COLOR'/><path d='M27 7v40' stroke='rgba(120,90,50,.3)' stroke-width='1.2'/></svg>`,
  `<svg xmlns='http://www.w3.org/2000/svg' width='38' height='64' viewBox='0 0 38 64'><path d='M19 62c9-8-9-15 0-23s-9-15 0-23' stroke='COLOR' stroke-width='6' stroke-linecap='round' fill='none'/></svg>`,
  `<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'><path d='M24 2c9 7 16 15 16 23a16 16 0 1 1-32 0c0-8 7-16 16-23z' fill='COLOR'/></svg>`,
];

const LEAF_COLORS = [
  "rgba(255,250,240,.88)",
  "rgba(255,255,255,.82)",
  "rgba(255,246,228,.85)",
  "rgba(250,238,220,.8)",
];

const LEAVES = Array.from({ length: 8 }, (_, i) => {
  const svg = LEAF_SHAPES[i % LEAF_SHAPES.length].replace(/COLOR/g, LEAF_COLORS[i % LEAF_COLORS.length]);
  const sway = (i % 2 === 0 ? 1 : -1) * (22 + (i % 4) * 12);
  const rot = (i % 2 === 0 ? 1 : -1) * (180 + (i % 3) * 70);
  return {
    id: i,
    dataUri: `data:image/svg+xml,${encodeURIComponent(svg)}`,
    left: 3 + ((i * 12.5) % 94),
    dur: `${9 + (i % 5) * 1.6}s`,
    delay: `${i * 0.45}s`,
    scale: 0.75 + (i % 4) * 0.22,
    opacity: 0.45 + (i % 3) * 0.12,
    sx1: `${sway}px`,
    sx2: `${Math.round(sway * 0.6)}px`,
    r1: `${Math.round(rot * 0.5)}deg`,
    r2: `${rot}deg`,
  };
});

export default function Hero() {
  const menuPreview = MENU.slice(0, 5);

  return (
    <section
      className="section-pad"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(165deg, var(--bg) 0%, var(--bg-alt) 100%)",
        padding: "150px 40px 88px",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Atmosfer blob'ları */}
      <div
        className="animate-blob"
        style={{
          position: "absolute",
          top: "-10%",
          right: "-8%",
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "rgba(193,68,45,.10)",
          filter: "blur(60px)",
          zIndex: 1,
        }}
      />
      <div
        className="animate-blob animation-delay-4000"
        style={{
          position: "absolute",
          bottom: "-14%",
          left: "-6%",
          width: 360,
          height: 360,
          borderRadius: "50%",
          background: "rgba(107,122,79,.10)",
          filter: "blur(60px)",
          zIndex: 1,
        }}
      />

      {/* Yükselen fesleğen yaprakları */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 2, pointerEvents: "none" }}>
        {LEAVES.map((leaf) => (
          <div
            key={leaf.id}
            className="leaf-item"
            style={
              {
                left: `${leaf.left}%`,
                "--dur": leaf.dur,
                "--delay": leaf.delay,
                "--ls": leaf.scale,
                "--lo": leaf.opacity,
                "--sx1": leaf.sx1,
                "--sx2": leaf.sx2,
                "--r1": leaf.r1,
                "--r2": leaf.r2,
              } as React.CSSProperties
            }
          >
            <img src={leaf.dataUri} alt="" width={40} height={54} style={{ display: "block" }} />
          </div>
        ))}
      </div>

      <div
        className="about-grid"
        style={{
          position: "relative",
          zIndex: 3,
          maxWidth: 1280,
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1.05fr 0.95fr",
          gap: 56,
          alignItems: "center",
        }}
      >
        {/* ── SOL: metin ── */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div
            variants={fadeUp}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 18px",
              borderRadius: 100,
              background: "rgba(255,255,255,.65)",
              backdropFilter: "blur(8px)",
              border: "1.5px solid var(--border)",
              boxShadow: "0 4px 18px var(--shadow)",
              fontSize: 13.5,
              fontWeight: 700,
              color: "var(--primary-dark)",
              marginBottom: 22,
            }}
          >
            ⭐ {RESTAURANT.rating} Google Puanı · {RESTAURANT.reviewCount}+ Yorum
          </motion.div>

          <motion.div
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-script)",
              fontSize: "clamp(28px,3.6vw,42px)",
              color: "var(--primary)",
              lineHeight: 1,
              marginBottom: 6,
            }}
          >
            Buon Appetito!
          </motion.div>

          <motion.h1
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(40px,6vw,76px)",
              lineHeight: 1.04,
              letterSpacing: "-0.01em",
              color: "var(--text)",
              margin: "0 0 22px",
            }}
          >
            BOB The{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Pasta
            </span>{" "}
            Factory
          </motion.h1>

          <motion.p
            variants={fadeUp}
            style={{
              fontSize: "clamp(16px,1.6vw,19px)",
              color: "var(--text-muted)",
              lineHeight: 1.75,
              maxWidth: 520,
              margin: "0 0 34px",
            }}
          >
            {RESTAURANT.taglineTr} 🍝 {RESTAURANT.description}
          </motion.p>

          <motion.div
            variants={fadeUp}
            style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 30 }}
          >
            <AnimatedCTAButton size="lg" />
            <Link
              href="/menu"
              className="btn-outline"
              style={{ padding: "17px 34px", fontSize: 16 }}
            >
              📖 Menüyü İncele
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 26 }}
          >
            {menuPreview.map((cat, i) => (
              <div
                key={cat.id}
                className="btn-pill animate-float"
                style={{ cursor: "default", animationDelay: `${i * 0.35}s` }}
              >
                {cat.icon} {cat.name}
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
              fontSize: 13.5,
              fontWeight: 500,
              color: "var(--text-muted)",
            }}
          >
            <span>📍 {RESTAURANT.addressShort}</span>
            <span>🕐 {RESTAURANT.hours.weekdays}</span>
          </motion.div>
        </motion.div>

        {/* ── SAĞ: fotoğraf çerçevesi ── */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          style={{ position: "relative" }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "4/5",
              borderRadius: 28,
              overflow: "hidden",
              boxShadow: "0 34px 70px var(--shadow)",
              border: "6px solid var(--card)",
            }}
          >
            <Image
              src="/images/gallery-5.jpg"
              alt="BOB The Pasta Factory — deniz mahsüllü el yapımı fettucine"
              fill
              priority
              sizes="(max-width: 767px) 88vw, (max-width: 1023px) 46vw, 40vw"
              style={{ objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(43,33,24,.5) 0%, transparent 42%)",
              }}
            />
          </div>

          <div
            className="hero-float-card animate-float"
            style={{
              position: "absolute",
              left: -26,
              bottom: 30,
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "16px 20px",
              maxWidth: 250,
              borderRadius: 20,
              background: "var(--card)",
              border: "1px solid var(--border)",
              boxShadow: "0 20px 44px var(--shadow)",
              zIndex: 4,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                flexShrink: 0,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
                boxShadow: "0 6px 18px rgba(156,53,31,.35)",
              }}
            >
              🍝
            </div>
            <div>
              <div style={{ fontSize: 14.5, fontWeight: 800, color: "var(--text)", lineHeight: 1.25 }}>
                Günlük Taze Üretim
              </div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
                El yapımı, her gün taze
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Scroll göstergesi ── */}
      <div
        className="animate-float"
        style={{
          position: "absolute",
          bottom: 22,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: ".14em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          Keşfet
        </span>
        <ChevronDown size={20} color="var(--primary)" />
      </div>
    </section>
  );
}
