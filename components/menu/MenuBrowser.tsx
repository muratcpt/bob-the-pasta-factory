"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
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

/* Gerçek fotoğrafımız olan kategoriler görsel kart, olmayanlar renkli gradient kart alır. */
const CATEGORY_VISUAL: Record<string, { image?: string; gradient?: string }> = {
  "fix-menuler": { image: "/images/gallery-3.jpg" },
  "parmesan-tekerinde-makarnalar": { image: "/images/hero-bg.jpg" },
  lazanya: { image: "/images/gallery-2.jpg" },
  ravioli: { image: "/images/gallery-9.jpg" },
  "focaccia-sandvicler": { gradient: "linear-gradient(135deg, var(--secondary), var(--secondary-dark))" },
  tiramisu: { gradient: "linear-gradient(135deg, var(--gold), #a5813a)" },
  kahveler: { gradient: "linear-gradient(135deg, #4a3524, var(--text))" },
  icecekler: { gradient: "linear-gradient(135deg, var(--primary), #e2896f)" },
};

const HERO_PILLS = [`⭐ ${RESTAURANT.rating} Puan`, RESTAURANT.priceRange, "🍝 El Yapımı"];

function itemCount(category: MenuCategory) {
  const direct = category.items?.length ?? 0;
  const nested = category.subcategories?.reduce((s, sc) => s + sc.items.length, 0) ?? 0;
  return direct + nested;
}

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

function CategoryCard({
  category,
  active,
  onSelect,
}: {
  category: MenuCategory;
  active: boolean;
  onSelect: () => void;
}) {
  const visual = CATEGORY_VISUAL[category.id] ?? {};
  const count = itemCount(category);

  return (
    <motion.button
      variants={fadeUp}
      type="button"
      onClick={onSelect}
      whileHover={{ y: -5 }}
      style={{
        position: "relative",
        aspectRatio: "5/4",
        borderRadius: 20,
        overflow: "hidden",
        cursor: "pointer",
        padding: 0,
        border: active ? "3px solid var(--gold)" : "3px solid transparent",
        boxShadow: active ? "0 14px 34px var(--shadow)" : "0 6px 18px var(--shadow)",
        background: visual.gradient ?? "#1a1410",
        transition: "border-color .2s, box-shadow .2s",
      }}
    >
      {visual.image && (
        <>
          <Image
            src={visual.image}
            alt={category.name}
            fill
            sizes="(max-width: 767px) 46vw, 22vw"
            style={{ objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(20,14,10,.15) 0%, rgba(20,14,10,.82) 100%)",
            }}
          />
        </>
      )}

      <span
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          padding: "3px 10px",
          borderRadius: 100,
          fontSize: 11,
          fontWeight: 700,
          color: "#fff",
          background: "rgba(0,0,0,.35)",
          backdropFilter: "blur(4px)",
        }}
      >
        {count} ürün
      </span>

      {active && (
        <span
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "var(--gold)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Check size={14} color="#2b2118" strokeWidth={3} />
        </span>
      )}

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          padding: "12px",
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: 30 }}>{category.icon}</span>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: 15.5,
            lineHeight: 1.25,
            color: "#fff",
            textShadow: "0 2px 10px rgba(0,0,0,.4)",
          }}
        >
          {category.name}
        </span>
      </div>
    </motion.button>
  );
}

function CategoryContent({ category }: { category: MenuCategory }) {
  const cols = GRID_COLS[category.id] ?? 2;
  const visual = CATEGORY_VISUAL[category.id] ?? {};

  return (
    <motion.div
      key={category.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div
        style={{
          position: "relative",
          borderRadius: 24,
          overflow: "hidden",
          marginBottom: 32,
          minHeight: visual.image ? 180 : "auto",
          display: "flex",
          alignItems: "flex-end",
          background: visual.image ? undefined : visual.gradient ?? "var(--bg-alt)",
        }}
      >
        {visual.image && (
          <>
            <Image src={visual.image} alt={category.name} fill sizes="100vw" style={{ objectFit: "cover" }} />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, rgba(20,14,10,.82) 0%, rgba(20,14,10,.35) 65%, transparent 100%)",
              }}
            />
          </>
        )}
        <div style={{ position: "relative", padding: "26px 30px", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: category.description ? 8 : 0 }}>
            <span style={{ fontSize: 32, lineHeight: 1 }}>{category.icon}</span>
            <h2
              style={{
                margin: 0,
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(22px, 3vw, 30px)",
                color: visual.image || visual.gradient ? "#fff" : "var(--text)",
                textShadow: visual.image || visual.gradient ? "0 2px 10px rgba(0,0,0,.35)" : "none",
              }}
            >
              {category.name}
            </h2>
          </div>
          {category.description && (
            <p
              style={{
                margin: 0,
                fontSize: 14,
                maxWidth: 560,
                color: visual.image || visual.gradient ? "rgba(255,255,255,.88)" : "var(--text-muted)",
              }}
            >
              {category.description}
            </p>
          )}
        </div>
      </div>

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
    </motion.div>
  );
}

export default function MenuBrowser() {
  const [activeSlug, setActiveSlug] = useState(MENU[0].slug);
  const [showJumpBtn, setShowJumpBtn] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && MENU.some((c) => c.slug === hash)) {
        setActiveSlug(hash);
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const observer = new IntersectionObserver(([entry]) => setShowJumpBtn(!entry.isIntersecting), {
      rootMargin: "-90px 0px 0px 0px",
    });
    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  const activeCategory = MENU.find((c) => c.slug === activeSlug) ?? MENU[0];

  const handleSelect = (slug: string, scroll: boolean) => {
    setActiveSlug(slug);
    window.history.replaceState(null, "", `#${slug}`);
    if (scroll) {
      contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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
            sandviçlere, İtalyan usulü tiramisuya kadar — bir kategori seçin, lezzete başlayın.
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

      {/* ─── KATEGORİ GRID'İ ─── */}
      <div className="section-pad" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px 56px" }}>
        <motion.div
          ref={gridRef}
          className="menu-category-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}
        >
          {MENU.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              active={cat.slug === activeSlug}
              onSelect={() => handleSelect(cat.slug, true)}
            />
          ))}
        </motion.div>
      </div>

      {/* ─── SEÇİLİ KATEGORİ İÇERİĞİ ─── */}
      <div
        ref={contentRef}
        className="section-pad"
        style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px 40px", scrollMarginTop: 96 }}
      >
        <AnimatePresence mode="wait">
          <CategoryContent key={activeCategory.id} category={activeCategory} />
        </AnimatePresence>
      </div>

      {/* ─── HIZLI KATEGORİ DÖNÜŞ BUTONU ─── */}
      <AnimatePresence>
        {showJumpBtn && (
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            onClick={() => gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            style={{
              position: "fixed",
              bottom: 24,
              left: 24,
              zIndex: 50,
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 20px",
              borderRadius: 100,
              background: "var(--card)",
              border: "1.5px solid var(--border)",
              boxShadow: "0 10px 30px var(--shadow)",
              fontSize: 13.5,
              fontWeight: 700,
              color: "var(--text)",
              cursor: "pointer",
            }}
            className="menu-jump-btn"
          >
            🍽️ Kategoriler
          </motion.button>
        )}
      </AnimatePresence>

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
