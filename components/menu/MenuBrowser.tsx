"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MENU, RESTAURANT } from "@/lib/data";
import type { MenuItem, MenuCategory } from "@/lib/data";
import { fadeUp, fadeIn, staggerContainer, staggerContainerFast } from "@/lib/animations";
import AnimatedCTAButton from "@/components/ui/AnimatedCTAButton";
import PhoneWidget from "@/components/ui/PhoneWidget";

const BADGE_LABELS: Record<NonNullable<MenuItem["badge"]>, string> = {
  popular: "🔥 Popüler",
  chef: "👨‍🍳 Şef Önerisi",
  spicy: "🌶️ Acılı",
};

/* Kategoriye göre masaüstü sütun sayısı — açıklaması uzun ürünler 2, kısa/açıklamasız
   listeler (kahve/içecek) 3 sütun. .menu-item-grid zaten mobilde 1'e düşürüyor. */
const GRID_COLS: Record<string, number> = {
  "fix-menuler": 2,
  "focaccia-sandvicler": 2,
  lazanya: 2,
  ravioli: 2,
  tiramisu: 2,
  kahveler: 3,
  icecekler: 3,
};

const HERO_PILLS = [`⭐ ${RESTAURANT.rating} Puan`, RESTAURANT.priceRange, "🍝 El Yapımı"];

function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <div
      className="card"
      style={{
        padding: "22px",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {item.badge && (
        <span className={`menu-badge ${item.badge}`} style={{ alignSelf: "flex-start", marginBottom: 10 }}>
          {BADGE_LABELS[item.badge]}
        </span>
      )}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 14 }}>
        <h4 style={{ margin: 0, fontSize: 16.5, fontWeight: 700, color: "var(--text)", lineHeight: 1.35 }}>
          {item.name}
        </h4>
        <span
          style={{
            flexShrink: 0,
            fontSize: 20,
            fontWeight: 800,
            color: "var(--primary-dark)",
            whiteSpace: "nowrap",
          }}
        >
          ₺{item.price}
        </span>
      </div>
      {item.description && (
        <p
          style={{
            margin: "8px 0 0",
            fontSize: 13.5,
            lineHeight: 1.55,
            color: "var(--text-muted)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {item.description}
        </p>
      )}
      {item.note && (
        <p style={{ margin: "10px 0 0", fontSize: 11.5, fontStyle: "italic", color: "var(--text-light)" }}>
          {item.note}
        </p>
      )}
    </div>
  );
}

function CategorySection({ category, isLast }: { category: MenuCategory; isLast: boolean }) {
  const cols = GRID_COLS[category.id] ?? 2;

  return (
    <motion.section
      id={category.slug}
      style={{
        scrollMarginTop: 150,
        padding: "56px 0",
        borderBottom: isLast ? "none" : "1px solid var(--border)",
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeUp}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: category.description ? 8 : 26 }}>
        <span style={{ fontSize: 34, lineHeight: 1 }}>{category.icon}</span>
        <h2
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(24px, 3vw, 32px)",
            color: "var(--text)",
          }}
        >
          {category.name}
        </h2>
      </div>

      {category.description && (
        <p style={{ fontSize: 14.5, color: "var(--text-muted)", maxWidth: 640, marginBottom: 28 }}>
          {category.description}
        </p>
      )}

      {category.items && (
        <div
          className="menu-item-grid"
          style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 20 }}
        >
          {category.items.map((item) => (
            <MenuItemCard key={item.name} item={item} />
          ))}
        </div>
      )}

      {category.subcategories && (
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {category.subcategories.map((sub) => (
            <div key={sub.id}>
              <h3
                style={{
                  margin: "0 0 16px",
                  paddingLeft: 14,
                  borderLeft: "3px solid var(--secondary)",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 19,
                  color: "var(--secondary)",
                }}
              >
                {sub.name}
              </h3>
              <div className="menu-item-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
                {sub.items.map((item) => (
                  <MenuItemCard key={item.name} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.section>
  );
}

export default function MenuBrowser() {
  const [activeSlug, setActiveSlug] = useState(MENU[0].slug);

  useEffect(() => {
    const sections = MENU.map((cat) => document.getElementById(cat.slug)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const topMost = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        setActiveSlug(topMost.target.id);
      },
      { rootMargin: "-160px 0px -65% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleTabClick = (slug: string) => {
    const el = document.getElementById(slug);
    if (!el) return;
    setActiveSlug(slug);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      {/* ─── HERO ─── */}
      <section
        className="section-pad"
        style={{
          background: "linear-gradient(180deg, var(--bg-alt) 0%, var(--bg) 100%)",
          paddingTop: 168,
          paddingBottom: 60,
          paddingLeft: 40,
          paddingRight: 40,
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <motion.span
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            style={{
              display: "block",
              fontFamily: "var(--font-script)",
              fontSize: 36,
              color: "var(--primary)",
              marginBottom: 4,
            }}
          >
            Afiyet Olsun!
          </motion.span>
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            style={{
              margin: "0 0 16px",
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(38px, 5.5vw, 60px)",
              lineHeight: 1.1,
              color: "var(--text)",
            }}
          >
            Menümüz 🍝
          </motion.h1>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            style={{
              margin: "0 auto 28px",
              maxWidth: 600,
              fontSize: 17,
              lineHeight: 1.7,
              color: "var(--text-muted)",
            }}
          >
            Parmesan tekerinde son dokunuşla hazırlanan el yapımı makarnalardan taze focaccia
            sandviçlere, İtalyan usulü tiramisuya kadar — Çanakkale&apos;de bir pasta factory
            deneyimi.
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainerFast}
            style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 12 }}
          >
            {HERO_PILLS.map((pill) => (
              <motion.span
                key={pill}
                variants={fadeUp}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "9px 18px",
                  borderRadius: 100,
                  background: "var(--card)",
                  border: "1.5px solid var(--border)",
                  boxShadow: "0 2px 12px var(--shadow)",
                  fontSize: 13.5,
                  fontWeight: 600,
                  color: "var(--text)",
                }}
              >
                {pill}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── SEKME ÇUBUĞU ─── */}
      <div
        style={{
          position: "sticky",
          top: 80,
          zIndex: 60,
          background: "var(--bg)",
          borderBottom: "1px solid var(--border)",
          boxShadow: "0 6px 20px var(--shadow)",
        }}
      >
        <div
          className="menu-tabs section-pad"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "14px 40px",
            display: "flex",
            justifyContent: "center",
            gap: 10,
            overflowX: "auto",
            whiteSpace: "nowrap",
          }}
        >
          {MENU.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleTabClick(cat.slug)}
              className={`btn-pill${activeSlug === cat.slug ? " active" : ""}`}
              style={{ flexShrink: 0 }}
            >
              <span>{cat.icon}</span> {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* ─── KATEGORİLER ─── */}
      <div className="section-pad" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
        {MENU.map((cat, i) => (
          <CategorySection key={cat.id} category={cat} isLast={i === MENU.length - 1} />
        ))}
      </div>

      {/* ─── ALT CTA BANDI ─── */}
      <section
        className="section-pad"
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "90px 40px",
          textAlign: "center",
          background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 55%, var(--secondary) 100%)",
        }}
      >
        <div
          className="animate-blob"
          style={{
            position: "absolute",
            top: -120,
            left: -100,
            width: 340,
            height: 340,
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
            width: 380,
            height: 380,
            borderRadius: "50%",
            background: "rgba(231,194,125,.2)",
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={staggerContainer}
          style={{ position: "relative", zIndex: 1, maxWidth: 640, margin: "0 auto" }}
        >
          <motion.h2
            variants={fadeUp}
            style={{
              margin: "0 0 14px",
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 42px)",
              color: "#fff",
              textShadow: "0 4px 24px rgba(0,0,0,.2)",
            }}
          >
            Siparişinizi Hemen Verin 🍝
          </motion.h2>
          <motion.p
            variants={fadeUp}
            style={{ marginBottom: 30, fontSize: 16, lineHeight: 1.6, color: "rgba(255,255,255,.88)" }}
          >
            Masa ayırtmak ya da paket sipariş vermek için WhatsApp&apos;tan yazın, hemen dönüş
            yapalım.
          </motion.p>
          <motion.div variants={fadeUp} style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 16 }}>
            <AnimatedCTAButton size="lg" label="💬 Sipariş İçin WhatsApp'tan Yazın" />
            <PhoneWidget variant="dark" size="md" />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
