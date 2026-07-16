"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { RESTAURANT, GALLERY_IMAGES, VALUES } from "@/lib/data";
import PhoneWidget from "@/components/ui/PhoneWidget";
import { fadeUp, slideInLeft, slideInRight, staggerContainerFast } from "@/lib/animations";

const aboutImage = GALLERY_IMAGES.find((img) => img.src === "/images/gallery-10.jpg") ?? GALLERY_IMAGES[4];

export default function AboutPreview() {
  return (
    <section className="section-pad" style={{ padding: "96px 40px", background: "var(--bg)" }}>
      <div
        className="about-grid"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1.15fr",
          gap: 64,
          alignItems: "center",
        }}
      >
        {/* SOL — Görsel */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideInLeft}
          style={{ position: "relative" }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "4/5",
              borderRadius: 28,
              overflow: "hidden",
              boxShadow: "0 24px 60px var(--shadow)",
              border: "6px solid var(--card)",
            }}
          >
            <Image
              src={aboutImage.src}
              alt={aboutImage.alt}
              fill
              sizes="(max-width: 767px) 100vw, 45vw"
              style={{ objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, transparent 55%, rgba(43,33,24,.55) 100%)",
              }}
            />
          </div>

          {/* Google puanı rozeti */}
          <div
            className="about-float-badge"
            style={{
              position: "absolute",
              bottom: -18,
              left: 24,
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 20px",
              borderRadius: 18,
              background: "var(--card)",
              border: "1px solid var(--border)",
              boxShadow: "0 12px 32px var(--shadow)",
              zIndex: 2,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--gold), var(--accent))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Star size={18} color="#fff" fill="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "var(--text)", lineHeight: 1.2 }}>
                {RESTAURANT.rating} Google Puanı
              </div>
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                {RESTAURANT.reviewCount} değerlendirme
              </div>
            </div>
          </div>

          {/* Konum kartı */}
          <div
            className="about-float-location"
            style={{
              position: "absolute",
              top: 24,
              right: -20,
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              maxWidth: 220,
              padding: "14px 16px",
              borderRadius: 16,
              background: "rgba(20,14,10,.82)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,.14)",
              boxShadow: "0 12px 32px rgba(0,0,0,.3)",
              zIndex: 2,
            }}
          >
            <MapPin size={18} color="var(--gold)" style={{ flexShrink: 0, marginTop: 1 }} />
            <span style={{ fontSize: 12.5, color: "#fff", lineHeight: 1.5, fontWeight: 500 }}>
              {RESTAURANT.addressShort}
            </span>
          </div>
        </motion.div>

        {/* SAĞ — İçerik */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideInRight}
        >
          <span
            style={{
              fontFamily: "var(--font-script)",
              fontSize: 30,
              color: "var(--primary)",
              display: "block",
              marginBottom: 6,
            }}
          >
            Hikayemiz
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(30px, 3.6vw, 44px)",
              fontWeight: 800,
              color: "var(--text)",
              lineHeight: 1.15,
              marginBottom: 20,
            }}
          >
            <span style={{ color: "var(--primary)" }}>BOB The Pasta Factory</span> ile tanışın
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--text-muted)", marginBottom: 14 }}>
            {RESTAURANT.description}
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--text-muted)", marginBottom: 32 }}>
            {`${RESTAURANT.taglineTr} — her tabak, ocağın karşısında, gözünüzün önünde şekillenir.`}
          </p>

          <motion.div
            className="values-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainerFast}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 16,
              marginBottom: 32,
            }}
          >
            {VALUES.map((v) => (
              <motion.div
                key={v.title}
                variants={fadeUp}
                style={{
                  padding: "18px 16px",
                  borderRadius: 18,
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 8 }}>{v.icon}</div>
                <div style={{ fontSize: 14.5, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>
                  {v.title}
                </div>
                <div style={{ fontSize: 12.5, lineHeight: 1.55, color: "var(--text-muted)" }}>
                  {v.desc}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <Link
              href="/hakkimizda"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 15.5,
                fontWeight: 700,
                color: "var(--primary-dark)",
                textDecoration: "none",
              }}
            >
              Hikayemizi Oku <ArrowRight size={17} />
            </Link>
            <PhoneWidget variant="light" size="sm" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
