"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, MessageCircle, BookOpen, MapPin, Clock, Copy, Check } from "lucide-react";
import { RESTAURANT } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/animations";
import AnimatedCTAButton from "@/components/ui/AnimatedCTAButton";
import InstagramIcon from "@/components/ui/InstagramIcon";

const waMessage = encodeURIComponent(
  "Merhaba, BOB The Pasta Factory'de rezervasyon yaptırmak istiyorum 🍝"
);

function ActionCard({
  icon,
  title,
  subtitle,
  href,
  target,
  bg,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  href: string;
  target?: string;
  bg: string;
}) {
  return (
    <motion.a
      variants={fadeUp}
      href={href}
      target={target}
      rel={target ? "noopener noreferrer" : undefined}
      whileHover={{ y: -6 }}
      className="card"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
        padding: "36px 24px",
        textDecoration: "none",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 68,
          height: 68,
          borderRadius: "50%",
          background: bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          boxShadow: "0 8px 24px rgba(0,0,0,.18)",
        }}
      >
        {icon}
      </div>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 19, color: "var(--text)" }}>
        {title}
      </div>
      <div style={{ fontSize: 14, color: "var(--text-muted)" }}>{subtitle}</div>
    </motion.a>
  );
}

export default function IletisimPage() {
  const [copied, setCopied] = useState(false);
  const copyPhone = () => {
    navigator.clipboard.writeText(RESTAURANT.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <section
        style={{
          position: "relative",
          paddingTop: 160,
          paddingBottom: 90,
          textAlign: "center",
          overflow: "hidden",
          background: "linear-gradient(135deg, var(--text), #3a2a1a)",
          color: "#fff",
        }}
        className="section-pad"
      >
        <div
          className="animate-blob"
          style={{
            position: "absolute",
            top: -80,
            left: -60,
            width: 320,
            height: 320,
            background: "rgba(193,68,45,.35)",
            filter: "blur(70px)",
          }}
        />
        <div
          className="animate-blob animation-delay-2000"
          style={{
            position: "absolute",
            bottom: -100,
            right: -60,
            width: 340,
            height: 340,
            background: "rgba(107,122,79,.35)",
            filter: "blur(70px)",
          }}
        />
        <div style={{ position: "relative", maxWidth: 680, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ fontFamily: "var(--font-script)", fontSize: 30, color: "var(--gold)", marginBottom: 6 }}>
            Bize Ulaşın
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(34px, 5vw, 54px)",
              marginBottom: 16,
            }}
          >
            İletişim
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,.82)", lineHeight: 1.7, marginBottom: 24 }}>
            Rezervasyon, sipariş ya da sorularınız için bize dilediğiniz kanaldan ulaşabilirsiniz.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }} className="contact-pills">
            <span className="btn-pill">⭐ {RESTAURANT.rating} Google Puanı</span>
            <span className="btn-pill">🕐 {RESTAURANT.hours.weekdays}</span>
            <span className="btn-pill">📍 Çanakkale Merkez</span>
          </div>
        </div>
      </section>

      <section style={{ padding: "72px 40px 0" }} className="section-pad">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="action-grid"
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          <ActionCard
            icon={<Phone size={28} />}
            title="Hemen Ara"
            subtitle={RESTAURANT.phone}
            href={`tel:${RESTAURANT.phoneRaw}`}
            bg="linear-gradient(135deg, var(--primary), var(--primary-dark))"
          />
          <ActionCard
            icon={<MessageCircle size={28} />}
            title="WhatsApp"
            subtitle="Rezervasyon & Sipariş"
            href={`${RESTAURANT.whatsapp}?text=${waMessage}`}
            target="_blank"
            bg="linear-gradient(135deg, #2ecc71, #25D366)"
          />
          <ActionCard
            icon={<BookOpen size={28} />}
            title="Menüyü Gör"
            subtitle="Tüm lezzetlerimiz"
            href="/menu"
            bg="linear-gradient(135deg, var(--gold), #a5813a)"
          />
        </motion.div>
      </section>

      <section style={{ padding: "72px 40px" }} className="section-pad">
        <div
          className="map-grid"
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1.5fr",
            gap: 28,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div className="card" style={{ padding: 22, display: "flex", gap: 14 }}>
              <MapPin size={22} color="var(--primary)" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ fontWeight: 700, marginBottom: 4, color: "var(--text)" }}>Adres</div>
                <div style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.6 }}>{RESTAURANT.address}</div>
                <a
                  href={RESTAURANT.googleMapsDirections}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 13, color: "var(--primary-dark)", fontWeight: 600, marginTop: 6, display: "inline-block" }}
                >
                  Yol Tarifi Al →
                </a>
              </div>
            </div>

            <div className="card" style={{ padding: 22, display: "flex", gap: 14, alignItems: "center" }}>
              <Phone size={22} color="var(--primary)" style={{ flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, marginBottom: 4, color: "var(--text)" }}>Telefon</div>
                <div style={{ fontSize: 14, color: "var(--text-muted)" }}>{RESTAURANT.phone}</div>
              </div>
              <button
                onClick={copyPhone}
                aria-label="Telefon numarasını kopyala"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  border: "1.5px solid var(--border)",
                  background: copied ? "var(--secondary)" : "var(--bg-alt)",
                  color: copied ? "#fff" : "var(--text)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all .2s",
                }}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>

            <div className="card" style={{ padding: 22, display: "flex", gap: 14 }}>
              <Clock size={22} color="var(--primary)" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ fontWeight: 700, marginBottom: 4, color: "var(--text)" }}>Çalışma Saatleri</div>
                <div style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7 }}>
                  Hafta içi &amp; Cumartesi: {RESTAURANT.hours.weekdays}
                  <br />
                  Pazar: {RESTAURANT.hours.sunday}
                </div>
              </div>
            </div>

            <a
              href={RESTAURANT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="card"
              style={{
                padding: 22,
                display: "flex",
                gap: 14,
                alignItems: "center",
                textDecoration: "none",
                background: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
                border: "none",
              }}
            >
              <InstagramIcon size={26} color="#fff" style={{ flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 700, color: "#fff" }}>{RESTAURANT.instagramHandle}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,.85)" }}>
                  {RESTAURANT.instagramFollowers} takipçi · Takip Et
                </div>
              </div>
            </a>
          </div>

          <div
            className="card"
            style={{ position: "relative", minHeight: 420, overflow: "hidden", padding: 0 }}
          >
            <iframe
              src={RESTAURANT.googleMaps}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 420, position: "absolute", inset: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="BOB The Pasta Factory Konum"
            />
            <div
              style={{
                position: "absolute",
                bottom: 16,
                left: 16,
                background: "rgba(255,255,255,.92)",
                backdropFilter: "blur(8px)",
                borderRadius: 14,
                padding: "10px 16px",
                fontSize: 13,
                fontWeight: 600,
                color: "var(--text)",
                boxShadow: "0 4px 16px rgba(0,0,0,.15)",
              }}
            >
              📍 {RESTAURANT.addressShort}
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "72px 40px",
          textAlign: "center",
          background: "linear-gradient(135deg, var(--primary), var(--primary-dark), var(--secondary))",
          color: "#fff",
        }}
        className="section-pad"
      >
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, marginBottom: 26 }}>
          Görüşmek İçin Sabırsızlanıyoruz 🍝
        </h2>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href={`tel:${RESTAURANT.phoneRaw}`} className="btn-outline">
            📞 Ara
          </a>
          <AnimatedCTAButton size="lg" />
          <Link href="/menu" className="btn-outline">
            📖 Menü
          </Link>
        </div>
      </section>
    </>
  );
}
