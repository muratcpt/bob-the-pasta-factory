"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { RESTAURANT, VALUES } from "@/lib/data";
import { fadeUp, slideInLeft, slideInRight, staggerContainer } from "@/lib/animations";
import AnimatedCTAButton from "@/components/ui/AnimatedCTAButton";

const EXTRA_VALUES = [
  {
    icon: "👨‍👩‍👧‍👦",
    title: "Aile Sıcaklığı",
    desc: "Kapımızdan girdiğiniz an bir misafirhanenin sıcaklığını hissedin isteriz — herkes bizim için sofra ailesinin bir parçası.",
  },
  {
    icon: "🌾",
    title: "Sürdürülebilir Kaynak",
    desc: "Taze ve mevsimlik malzemeleri güvenilir yerel tedarikçilerden özenle seçip mutfağımıza öyle taşıyoruz.",
  },
];

const ALL_VALUES = [...VALUES, ...EXTRA_VALUES];

const MILESTONES = [
  {
    title: "Kapılarımızı Açtık",
    desc: "BOB The Pasta Factory, Kemalpaşa Mahallesi'nde küçük ama tutkulu bir mutfakla İtalyan usulü makarna serüvenine başladı.",
  },
  {
    title: "Parmesan Tekeri Sunumu İmza Lezzetimiz Oldu",
    desc: "Dev bir parmesan tekerinin içinde son dokunuşuyla önünüzde hazırlanan fettucine, misafirlerimizin gözdesi haline geldi.",
  },
  {
    title: "El Yapımı Makarna Atölyeleri Başladı",
    desc: "Günlük taze üretime geçtik; her fettucine, ravioli ve lazanya mutfağımızda elle açılıp, elle doldurulmaya başlandı.",
  },
  {
    title: `${RESTAURANT.instagramFollowers} Takipçiye Ulaştık`,
    desc: `Instagram'da ${RESTAURANT.instagramHandle} ailemiz büyüdü; ${RESTAURANT.reviewCount}+ değerlendirme ile ${RESTAURANT.rating} puanlık bir güven inşa ettik.`,
  },
];

const HERO_LEAVES = [
  { left: "5%", dur: "12s", delay: "0s", ls: 1, emoji: "🌿" },
  { left: "16%", dur: "14.5s", delay: "2.4s", ls: 0.8, emoji: "🧀" },
  { left: "27%", dur: "10.5s", delay: "1.1s", ls: 0.9, emoji: "🍃" },
  { left: "63%", dur: "13s", delay: "3.2s", ls: 1.1, emoji: "🌿" },
  { left: "79%", dur: "11.5s", delay: "0.6s", ls: 0.85, emoji: "🧀" },
  { left: "91%", dur: "15s", delay: "4s", ls: 1, emoji: "🍃" },
];

export default function HakkimizdaPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section style={{ position: "relative", overflow: "hidden", background: "var(--bg)", paddingTop: 168, paddingBottom: 88 }}>
        {HERO_LEAVES.map((leaf, i) => (
          <span
            key={i}
            className="leaf-item"
            style={
              {
                left: leaf.left,
                fontSize: 22,
                "--dur": leaf.dur,
                "--delay": leaf.delay,
                "--ls": leaf.ls,
                "--lo": 0.5,
                "--sx1": "24px",
                "--sx2": "12px",
                "--r1": "80deg",
                "--r2": "200deg",
              } as React.CSSProperties
            }
          >
            {leaf.emoji}
          </span>
        ))}
        <div className="section-pad" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", position: "relative", textAlign: "center" }}>
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span style={{ fontFamily: "var(--font-script)", fontSize: 34, color: "var(--primary)", display: "block", marginBottom: 6 }}>
              Hikayemiz
            </span>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px, 5vw, 58px)",
                fontWeight: 800,
                color: "var(--text)",
                margin: "0 0 20px",
                lineHeight: 1.1,
              }}
            >
              Hakkımızda
            </h1>
            <p style={{ fontSize: 17, color: "var(--text-muted)", maxWidth: 620, margin: "0 auto", lineHeight: 1.75 }}>
              {`${RESTAURANT.tagline} — Çanakkale Kemalpaşa'da her tabakla İtalya'yı sofranıza taşıyoruz.`}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── HİKAYE (2 sütun) ── */}
      <section style={{ background: "var(--bg)", padding: "16px 0 96px" }}>
        <div className="section-pad" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 64, alignItems: "center" }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
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
                  boxShadow: "0 20px 60px var(--shadow)",
                }}
              >
                <Image
                  src="/images/gallery-7.jpg"
                  alt="Günlük taze el yapımı pasta"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 767px) 100vw, 500px"
                />
              </div>

              <div
                className="about-float-badge"
                style={{
                  position: "absolute",
                  bottom: -20,
                  left: -20,
                  background: "var(--card)",
                  borderRadius: 18,
                  padding: "14px 20px",
                  boxShadow: "0 10px 34px var(--shadow)",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  border: "1px solid var(--border)",
                }}
              >
                <span style={{ fontSize: 22 }}>⭐</span>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 17, color: "var(--text)", lineHeight: 1.2 }}>
                    {RESTAURANT.rating} Google Puanı
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{RESTAURANT.reviewCount}+ değerlendirme</div>
                </div>
              </div>

              <div
                className="about-float-location"
                style={{
                  position: "absolute",
                  top: 24,
                  right: -20,
                  background: "var(--card)",
                  borderRadius: 14,
                  padding: "10px 16px",
                  boxShadow: "0 8px 24px var(--shadow)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  border: "1px solid var(--border)",
                }}
              >
                <span>📍</span>
                <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text)" }}>Kemalpaşa Mahallesi</span>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideInRight}>
              <span style={{ fontFamily: "var(--font-script)", fontSize: 30, color: "var(--primary)", display: "block", marginBottom: 4 }}>
                Buon Appetito!
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(28px, 3.6vw, 40px)",
                  fontWeight: 800,
                  color: "var(--text)",
                  margin: "0 0 22px",
                  lineHeight: 1.2,
                }}
              >
                Çanakkale&apos;nin Kalbinde <span style={{ color: "var(--primary)" }}>Gerçek İtalyan</span> Lezzeti
              </h2>
              <p style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 18 }}>
                {RESTAURANT.description} Kemalpaşa Mahallesi&apos;ndeki kapımızdan girdiğiniz andan itibaren tek bir hedefimiz var:
                şehrin en keyifli makarna deneyimini sofranıza taşımak.
              </p>
              <p style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 18 }}>
                Mutfağımızın kalbinde el yapımı makarna var. Fettucine&apos;lerimiz her gün taze yoğrulur, bol yumurta sarısıyla
                açılır ve imza lezzetimiz olan dev parmesan tekerinde son dokunuşuyla önünüzde hazırlanır — hem gözünüze hem
                damağınıza hitap eden eşsiz bir kremsi doku.
              </p>
              <p style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 28 }}>
                Lazanyadan ravioliye, deniz mahsüllü makarnalardan el yapımı focaccia sandviçlere kadar her tarif emek ve
                tutkuyla masanıza geliyor. &ldquo;{RESTAURANT.tagline}&rdquo; sözünü her gün yeniden kazanmak için çalışıyoruz.
              </p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <AnimatedCTAButton size="md" />
                <Link href="/menu" className="btn-outline">
                  📖 Menüyü İncele
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── DEĞERLERİMİZ ── */}
      <section style={{ background: "var(--bg-alt)", padding: "96px 0" }}>
        <div className="section-pad" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 56px" }}
          >
            <span style={{ fontFamily: "var(--font-script)", fontSize: 30, color: "var(--primary)", display: "block", marginBottom: 4 }}>
              İlkelerimiz
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 3.6vw, 40px)",
                fontWeight: 800,
                color: "var(--text)",
                margin: "0 0 14px",
              }}
            >
              Değerlerimiz
            </h2>
            <p style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.7 }}>
              Her tabakta bizi biz yapan, mutfağımıza yön veren altı temel ilke.
            </p>
          </motion.div>

          <motion.div
            className="values-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}
          >
            {ALL_VALUES.map((v) => (
              <motion.div
                key={v.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="card"
                style={{ padding: "34px 26px", textAlign: "center" }}
              >
                <div style={{ fontSize: 38, marginBottom: 16 }}>{v.icon}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 700, marginBottom: 10, color: "var(--text)" }}>
                  {v.title}
                </h3>
                <p style={{ fontSize: 14.5, color: "var(--text-muted)", lineHeight: 1.65, margin: 0 }}>{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ZAMAN TÜNELİ ── */}
      <section style={{ background: "var(--bg)", padding: "96px 0" }}>
        <div className="section-pad" style={{ maxWidth: 860, margin: "0 auto", padding: "0 40px" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            style={{ textAlign: "center", marginBottom: 60 }}
          >
            <span style={{ fontFamily: "var(--font-script)", fontSize: 30, color: "var(--primary)", display: "block", marginBottom: 4 }}>
              Yolculuğumuz
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 3.6vw, 40px)",
                fontWeight: 800,
                color: "var(--text)",
                margin: 0,
              }}
            >
              Bugüne Nasıl Geldik
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            style={{ position: "relative" }}
          >
            <div style={{ position: "absolute", top: 6, bottom: 6, left: 23, width: 2, background: "var(--border)" }} />
            {MILESTONES.map((m, i) => (
              <motion.div
                key={m.title}
                variants={slideInLeft}
                style={{
                  display: "flex",
                  gap: 28,
                  position: "relative",
                  marginBottom: i === MILESTONES.length - 1 ? 0 : 40,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: 15,
                    boxShadow: "0 4px 16px var(--shadow)",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="card" style={{ padding: "20px 24px", flex: 1 }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, marginBottom: 6, color: "var(--text)" }}>
                    {m.title}
                  </h3>
                  <p style={{ fontSize: 14.5, color: "var(--text-muted)", lineHeight: 1.65, margin: 0 }}>{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ALT GRADIENT CTA ── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "88px 0",
          background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 55%, var(--secondary-dark) 130%)",
        }}
      >
        <div
          className="animate-blob"
          style={{ position: "absolute", width: 340, height: 340, background: "rgba(255,255,255,.08)", top: -140, left: -90, borderRadius: "50%" }}
        />
        <div
          className="animate-blob animation-delay-2000"
          style={{ position: "absolute", width: 280, height: 280, background: "rgba(255,255,255,.06)", bottom: -110, right: -70, borderRadius: "50%" }}
        />
        <div className="section-pad" style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px", position: "relative", textAlign: "center" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <span style={{ fontFamily: "var(--font-script)", fontSize: 32, color: "var(--accent)", display: "block", marginBottom: 6 }}>
              Sofranızda Buluşalım
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 800,
                color: "#fff",
                margin: "0 0 16px",
                lineHeight: 1.2,
              }}
            >
              Bir Sonraki Yemeğinizi Bizimle Planlayın 🍝
            </h2>
            <p style={{ color: "rgba(255,255,255,.88)", fontSize: 16, maxWidth: 520, margin: "0 auto 32px", lineHeight: 1.7 }}>
              Yerinizi ayırtın, dev parmesan tekerinde hazırlanan imza lezzetimizi ve tüm menümüzü keşfedin.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <AnimatedCTAButton size="lg" />
              <Link href="/menu" className="btn-outline">
                📖 Menüyü Gör
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
