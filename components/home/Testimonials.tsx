"use client";
import { motion } from "framer-motion";
import { Quote, Star, BadgeCheck } from "lucide-react";
import { TESTIMONIALS, RESTAURANT, type Testimonial } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/animations";

const SOURCE_META: Record<Testimonial["source"], { color: string; bg: string }> = {
  Google: { color: "#1a73e8", bg: "rgba(26,115,232,0.1)" },
  Yandex: { color: "#e02d1f", bg: "rgba(224,45,31,0.1)" },
};

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function TestimonialCard({ t }: { t: Testimonial }) {
  const meta = SOURCE_META[t.source];
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6, boxShadow: "0 18px 44px rgba(120,70,40,0.22)" }}
      transition={{ duration: 0.3, ease: "easeOut" as const }}
      className="card"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "38px 30px 28px",
        overflow: "hidden",
      }}
    >
      <Quote
        size={70}
        strokeWidth={1.5}
        style={{
          position: "absolute",
          top: 14,
          right: 18,
          color: "var(--primary)",
          opacity: 0.09,
          transform: "scaleX(-1)",
        }}
      />

      <div style={{ display: "flex", gap: 3, marginBottom: 16, position: "relative" }}>
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} size={16} fill="var(--gold)" color="var(--gold)" />
        ))}
      </div>

      <p
        style={{
          fontStyle: "italic",
          fontSize: 15.5,
          lineHeight: 1.75,
          color: "var(--text)",
          marginBottom: 24,
          position: "relative",
          flexGrow: 1,
        }}
      >
        “{t.text}”
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          paddingTop: 18,
          borderTop: "1px solid var(--border)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
              color: "#fff",
              fontWeight: 700,
              fontSize: 14.5,
              fontFamily: "var(--font-display)",
            }}
          >
            {getInitials(t.name)}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14.5, color: "var(--text)" }}>{t.name}</div>
            <div style={{ fontSize: 12.5, color: "var(--text-light)" }}>{t.timeAgo}</div>
          </div>
        </div>

        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            padding: "4px 11px",
            borderRadius: 100,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.01em",
            background: meta.bg,
            color: meta.color,
            whiteSpace: "nowrap",
          }}
        >
          <BadgeCheck size={12} />
          {t.source}
        </span>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section
      className="section-pad"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--bg-alt)",
        padding: "110px 40px",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(var(--border) 1.5px, transparent 1.5px)",
          backgroundSize: "26px 26px",
          opacity: 0.6,
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto" }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 58px" }}
        >
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-script)",
              fontSize: 36,
              color: "var(--primary)",
              marginBottom: 2,
              lineHeight: 1,
            }}
          >
            Buon Appetito!
          </motion.p>
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 800,
              color: "var(--text)",
              marginBottom: 14,
              lineHeight: 1.15,
            }}
          >
            Misafirlerimiz Ne Diyor?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 18 }}
          >
            Google ve Yandex&apos;te bize güvenen misafirlerimizin gerçek yorumları.
          </motion.p>
          <motion.div
            variants={fadeUp}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 20px",
              borderRadius: 100,
              background: "var(--card)",
              border: "1px solid var(--border)",
              fontSize: 13.5,
              fontWeight: 700,
              color: "var(--text)",
            }}
          >
            <Star size={15} fill="var(--gold)" color="var(--gold)" />
            {RESTAURANT.rating}
            <span style={{ fontWeight: 500, color: "var(--text-muted)" }}>
              · {RESTAURANT.reviewCount} değerlendirme
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          className="testimonials-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}
        >
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
