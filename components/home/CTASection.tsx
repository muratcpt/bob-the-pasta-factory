"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { RESTAURANT } from "@/lib/data";
import { fadeUp, fadeIn, staggerContainer, staggerContainerFast } from "@/lib/animations";

const WHATSAPP_HREF = `${RESTAURANT.whatsapp}?text=${encodeURIComponent(
  "Merhaba! BOB The Pasta Factory'de yer ayırtmak istiyorum 🍝"
)}`;

const TRUST_PILLS = [
  `⭐ ${RESTAURANT.rating} · ${RESTAURANT.reviewCount} değerlendirme`,
  "💬 Hızlı Yanıt",
  `🕐 ${RESTAURANT.hours.weekdays}`,
  "📍 Çanakkale Merkez",
];

interface CardProps {
  icon: string;
  title: string;
  desc: string;
  cta: string;
  variant: "light" | "whatsapp" | "dark";
}

function CardShell({ icon, title, desc, cta, variant }: CardProps) {
  const isLight = variant === "light";
  const isWhatsapp = variant === "whatsapp";

  const background = isLight
    ? "#fffdf8"
    : isWhatsapp
      ? "linear-gradient(150deg, #2ecc71, #1fa855)"
      : "linear-gradient(160deg, #2b2118, #17120c)";

  const textColor = isLight ? "var(--text)" : "#fff";
  const descColor = isLight ? "var(--text-muted)" : "rgba(255,255,255,.78)";
  const iconBg = isLight
    ? "var(--bg-alt)"
    : isWhatsapp
      ? "rgba(255,255,255,.18)"
      : "linear-gradient(135deg, var(--gold), #e7c27d)";
  const border = isLight
    ? "1.5px solid var(--border)"
    : isWhatsapp
      ? "1.5px solid rgba(255,255,255,.25)"
      : "1.5px solid rgba(201,162,75,.35)";

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        padding: "40px 30px",
        borderRadius: 24,
        background,
        border,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 6,
        textDecoration: "none",
        boxShadow: isLight ? "0 8px 30px rgba(120,70,40,.14)" : "0 12px 40px rgba(0,0,0,.28)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: 62,
          height: 62,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          background: iconBg,
          marginBottom: 10,
          flexShrink: 0,
          boxShadow: isLight ? "none" : "0 4px 18px rgba(0,0,0,.25)",
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: 22,
          color: textColor,
        }}
      >
        {title}
      </div>
      <p style={{ fontSize: 14.5, lineHeight: 1.6, color: descColor, marginBottom: 18, minHeight: 44 }}>
        {desc}
      </p>
      <div
        style={{
          marginTop: "auto",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 20px",
          borderRadius: 100,
          fontSize: 13.5,
          fontWeight: 700,
          color: isLight ? "#fff" : variant === "dark" ? "#2b2118" : "#fff",
          background: isLight
            ? "linear-gradient(135deg, var(--primary), var(--primary-dark))"
            : isWhatsapp
              ? "#fff"
              : "linear-gradient(135deg, var(--gold), #e7c27d)",
        }}
      >
        {cta}
        <ArrowRight size={15} />
      </div>
    </div>
  );
}

export default function CTASection() {
  return (
    <section
      className="section-pad"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "110px 40px",
        background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 55%, var(--secondary) 100%)",
      }}
    >
      {/* nokta deseni */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(255,255,255,.16) 1.5px, transparent 1.5px)",
          backgroundSize: "26px 26px",
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />

      {/* dekoratif bloblar */}
      <div
        className="animate-blob"
        style={{
          position: "absolute",
          top: -120,
          left: -100,
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: "rgba(255,255,255,.14)",
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />
      <div
        className="animate-blob animation-delay-2000"
        style={{
          position: "absolute",
          bottom: -140,
          right: -80,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "rgba(231,194,125,.22)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <div
        className="animate-blob animation-delay-4000"
        style={{
          position: "absolute",
          top: "35%",
          right: "20%",
          width: 260,
          height: 260,
          borderRadius: "50%",
          background: "rgba(107,122,79,.25)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto" }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={staggerContainer}
          style={{ textAlign: "center", marginBottom: 60 }}
        >
          <motion.span
            variants={fadeIn}
            style={{
              display: "inline-block",
              fontFamily: "var(--font-script)",
              fontSize: 34,
              color: "var(--accent)",
              marginBottom: 6,
            }}
          >
            Açlığınızı Bize Bırakın
          </motion.span>
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(30px, 4.5vw, 48px)",
              color: "#fff",
              lineHeight: 1.15,
              margin: "0 0 14px",
              textShadow: "0 4px 24px rgba(0,0,0,.2)",
            }}
          >
            Yerinizi Hemen Ayırtın 🍝
          </motion.h2>
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 16.5,
              color: "rgba(255,255,255,.88)",
              maxWidth: 560,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Parmesan tekerinde hazırlanan el yapımı makarnaların tadına bakmak için hemen
            yerinizi ayırtın ya da online sipariş verin.
          </motion.p>
        </motion.div>

        <motion.div
          className="action-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 28,
            marginBottom: 56,
          }}
        >
          <motion.div variants={fadeUp} whileHover={{ y: -8, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link href="/menu" style={{ display: "block", height: "100%", textDecoration: "none" }}>
              <CardShell
                icon="📖"
                title="Online Menü"
                desc="Fix menülerimizi, parmesan tekeri lezzetlerimizi ve tatlılarımızı inceleyin."
                cta="Menüyü Gör"
                variant="light"
              />
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} whileHover={{ y: -8, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "block", height: "100%", textDecoration: "none" }}
            >
              <CardShell
                icon="💬"
                title="WhatsApp'tan Yaz"
                desc="Sorularınız ve rezervasyon talebiniz için doğrudan yazın, hemen dönüş yapalım."
                cta="Yaz"
                variant="whatsapp"
              />
            </a>
          </motion.div>

          <motion.div variants={fadeUp} whileHover={{ y: -8, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <a
              href={`tel:${RESTAURANT.phoneRaw}`}
              style={{ display: "block", height: "100%", textDecoration: "none" }}
            >
              <CardShell
                icon="📞"
                title="Hemen Ara"
                desc={`${RESTAURANT.phone} — masa ayırtmak için bizi arayın.`}
                cta="Ara"
                variant="dark"
              />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="contact-pills"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={staggerContainerFast}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 14,
          }}
        >
          {TRUST_PILLS.map((pill) => (
            <motion.span
              key={pill}
              variants={fadeUp}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "10px 20px",
                borderRadius: 100,
                background: "rgba(255,255,255,.14)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,.24)",
                color: "#fff",
                fontSize: 13.5,
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              {pill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
