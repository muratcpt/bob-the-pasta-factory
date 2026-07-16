"use client";
import { motion } from "framer-motion";
import { MapPin, Phone, MessageCircle, Clock, ArrowRight, Navigation } from "lucide-react";
import { RESTAURANT } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/animations";
import AnimatedCTAButton from "@/components/ui/AnimatedCTAButton";

const CONTACT_CARDS = [
  {
    icon: MapPin,
    label: "Adres",
    value: RESTAURANT.addressShort,
    actionLabel: "Yol Tarifi Al",
    href: RESTAURANT.googleMapsDirections,
    external: true,
    gradient: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
  },
  {
    icon: Phone,
    label: "Telefon",
    value: RESTAURANT.phone,
    actionLabel: "Hemen Arayın",
    href: `tel:${RESTAURANT.phoneRaw}`,
    external: false,
    gradient: "linear-gradient(135deg, var(--secondary), var(--secondary-dark))",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Anında Yanıt Alın",
    actionLabel: "WhatsApp'tan Yazın",
    href: `${RESTAURANT.whatsapp}?text=${encodeURIComponent(
      "Merhaba, BOB The Pasta Factory hakkında bilgi almak istiyorum 🍝"
    )}`,
    external: true,
    gradient: "linear-gradient(135deg, #2ecc71, #25d366)",
  },
  {
    icon: Clock,
    label: "Çalışma Saatleri",
    value: "Pzt–Cmt: 12:00–23:00 · Paz: 14:00–23:00",
    actionLabel: "Rezervasyon Yap",
    href: `${RESTAURANT.whatsapp}?text=${encodeURIComponent(
      "Merhaba, BOB The Pasta Factory'de rezervasyon yaptırmak istiyorum 🍝"
    )}`,
    external: true,
    gradient: "linear-gradient(135deg, var(--gold), #8a6a1f)",
  },
];

export default function ContactSection() {
  return (
    <section id="iletisim" className="section-pad" style={{ padding: "100px 40px", background: "var(--bg)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}
        >
          <div
            style={{
              fontFamily: "var(--font-script)",
              fontSize: 30,
              color: "var(--primary)",
              marginBottom: 4,
            }}
          >
            Sizi Bekliyoruz!
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(30px, 4vw, 42px)",
              color: "var(--text)",
              marginBottom: 14,
            }}
          >
            Bize Ulaşın 📍
          </h2>
          <p style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.7 }}>
            Çanakkale Kemalpaşa&apos;daki fabrikamıza bekleriz — sorularınız için arayın,
            WhatsApp&apos;tan yazın ya da yolunuzu haritadan bulun.
          </p>
        </motion.div>

        <div
          className="map-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.6fr",
            gap: 32,
            alignItems: "stretch",
          }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            {CONTACT_CARDS.map((c) => (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noopener noreferrer" : undefined}
                variants={fadeUp}
                whileHover={{ x: 4, transition: { duration: 0.2, ease: "easeOut" as const } }}
                className="card"
                style={{
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                  padding: "20px 22px",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: c.gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 6px 16px rgba(43, 33, 24, 0.22)",
                  }}
                >
                  <c.icon size={23} color="#fff" strokeWidth={2.2} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 11.5,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: ".06em",
                      color: "var(--text-muted)",
                      marginBottom: 4,
                    }}
                  >
                    {c.label}
                  </div>
                  <div style={{ fontSize: 15.5, fontWeight: 800, color: "var(--text)", marginBottom: 6, lineHeight: 1.35 }}>
                    {c.value}
                  </div>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "var(--primary-dark)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    {c.actionLabel} <ArrowRight size={13} />
                  </span>
                </div>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            style={{
              position: "relative",
              borderRadius: 24,
              overflow: "hidden",
              minHeight: 420,
              border: "1px solid var(--border)",
              boxShadow: "0 20px 60px var(--shadow)",
            }}
          >
            <iframe
              src={RESTAURANT.googleMaps}
              width="100%"
              height="100%"
              style={{ border: 0, display: "block", minHeight: 420 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="BOB The Pasta Factory Konum"
            />
            <div
              style={{
                position: "absolute",
                top: 18,
                left: 18,
                right: 18,
                maxWidth: 300,
                padding: "14px 18px",
                borderRadius: 16,
                background: "rgba(255,255,255,.82)",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,.6)",
                boxShadow: "0 8px 28px rgba(43, 33, 24, 0.22)",
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                pointerEvents: "none",
              }}
            >
              <span style={{ fontSize: 18, lineHeight: 1 }}>📍</span>
              <span style={{ fontSize: 13.5, fontWeight: 700, color: "var(--text)", lineHeight: 1.4 }}>
                {RESTAURANT.addressShort}
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{
            marginTop: 56,
            position: "relative",
            overflow: "hidden",
            borderRadius: 28,
            padding: "48px 44px",
            background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 55%, var(--secondary-dark) 135%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 28,
            flexWrap: "wrap",
            boxShadow: "0 24px 60px var(--shadow)",
          }}
        >
          <div
            className="animate-blob"
            style={{
              position: "absolute",
              top: -80,
              right: -60,
              width: 260,
              height: 260,
              background: "rgba(255,255,255,.12)",
              filter: "blur(10px)",
              pointerEvents: "none",
            }}
          />
          <div
            className="animate-blob animation-delay-4000"
            style={{
              position: "absolute",
              bottom: -100,
              left: -60,
              width: 220,
              height: 220,
              background: "rgba(255,255,255,.08)",
              filter: "blur(10px)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 1, minWidth: 260 }}>
            <div style={{ fontFamily: "var(--font-script)", fontSize: 26, color: "var(--accent)", marginBottom: 2 }}>
              Buon Appetito!
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(24px, 3vw, 32px)",
                color: "#fff",
                marginBottom: 8,
              }}
            >
              Bir Masa Ayırtalım mı? 🍝
            </h3>
            <p style={{ color: "rgba(255,255,255,.88)", fontSize: 15, lineHeight: 1.6, maxWidth: 420 }}>
              Parmesan tekerinde hazırlanan makarnalarımız için yerinizi hemen ayırtın, sizi
              Kemalpaşa&apos;da ağırlayalım.
            </p>
          </div>

          <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 14, flexWrap: "wrap" }}>
            <AnimatedCTAButton size="lg" />
            <motion.a
              href={RESTAURANT.googleMapsDirections}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="btn-outline"
              style={{ padding: "17px 32px", fontSize: 16 }}
            >
              <Navigation size={17} /> Yol Tarifi Al
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
