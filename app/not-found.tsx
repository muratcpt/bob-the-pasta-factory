"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, fadeIn, staggerContainer } from "@/lib/animations";

const QUICK_LINKS = [
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/galeri", label: "Galeri" },
  { href: "/iletisim", label: "İletişim" },
];

interface FloatingEmoji {
  icon: string;
  top: string;
  left?: string;
  right?: string;
  size: number;
  delay: number;
  duration: number;
}

const FLOATING_EMOJI: FloatingEmoji[] = [
  { icon: "🍝", top: "16%", left: "8%", size: 36, delay: 0, duration: 5.5 },
  { icon: "🧀", top: "72%", left: "11%", size: 30, delay: 0.6, duration: 6 },
  { icon: "🫓", top: "20%", right: "9%", size: 28, delay: 0.3, duration: 5 },
  { icon: "🍅", top: "68%", right: "10%", size: 30, delay: 0.9, duration: 6.5 },
];

export default function NotFound() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "180px 40px 100px",
        background: "var(--bg)",
      }}
    >
      {/* dekoratif bloblar */}
      <div
        className="animate-blob"
        style={{
          position: "absolute",
          top: -140,
          left: -120,
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: "rgba(193,68,45,.10)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <div
        className="animate-blob animation-delay-2000"
        style={{
          position: "absolute",
          bottom: -160,
          right: -100,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "rgba(107,122,79,.12)",
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />
      <div
        className="animate-blob animation-delay-4000"
        style={{
          position: "absolute",
          top: "38%",
          right: "22%",
          width: 240,
          height: 240,
          borderRadius: "50%",
          background: "rgba(201,162,75,.14)",
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />

      {/* süzülen yemek emojileri */}
      {FLOATING_EMOJI.map((e, i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -16, 0], rotate: [0, i % 2 === 0 ? 8 : -8, 0] }}
          transition={{
            duration: e.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: e.delay,
          }}
          style={{
            position: "absolute",
            top: e.top,
            left: e.left,
            right: e.right,
            fontSize: e.size,
            opacity: 0.5,
            pointerEvents: "none",
            filter: "drop-shadow(0 6px 14px rgba(120,70,40,.18))",
          }}
        >
          {e.icon}
        </motion.span>
      ))}

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        style={{ position: "relative", zIndex: 1, maxWidth: 640 }}
      >
        <motion.div
          variants={fadeIn}
          className="animate-float"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(120px, 22vw, 260px)",
            lineHeight: 0.9,
            background:
              "linear-gradient(135deg, var(--primary) 0%, var(--gold) 55%, var(--secondary) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.02em",
          }}
        >
          404
        </motion.div>

        <motion.span
          variants={fadeUp}
          style={{
            display: "inline-block",
            fontFamily: "var(--font-script)",
            fontSize: 36,
            color: "var(--primary-dark)",
            marginTop: -8,
            marginBottom: 4,
          }}
        >
          Kaybolduk Galiba…
        </motion.span>

        <motion.h1
          variants={fadeUp}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(28px, 4vw, 42px)",
            color: "var(--text)",
            margin: "0 0 16px",
          }}
        >
          Sayfa Bulunamadı
        </motion.h1>

        <motion.p
          variants={fadeUp}
          style={{
            fontSize: 16.5,
            lineHeight: 1.7,
            color: "var(--text-muted)",
            maxWidth: 480,
            margin: "0 auto 40px",
          }}
        >
          Aradığınız sayfa taşınmış, adı değişmiş ya da hiç var olmamış olabilir.
          Neyse ki mutfağımız hâlâ sıcak, parmesan tekerimiz hazır — sizi gerçek
          İtalyan lezzetleriyle bekliyoruz. 🧀🍝
        </motion.p>

        <motion.div
          variants={fadeUp}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <Link href="/" className="btn-primary">
            🏠 Ana Sayfaya Dön
          </Link>
          <Link href="/menu" className="btn-outline">
            📖 Menüyü Gör
          </Link>
        </motion.div>

        <motion.div
          variants={fadeUp}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            fontSize: 14,
          }}
        >
          {QUICK_LINKS.map((link, i) => (
            <span key={link.href} style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
              {i > 0 && <span style={{ color: "var(--border)" }}>·</span>}
              <Link
                href={link.href}
                style={{ color: "var(--text-muted)", textDecoration: "none", fontWeight: 600 }}
              >
                {link.label}
              </Link>
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
