"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MENU, GALLERY_IMAGES, RESTAURANT } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/animations";
import AnimatedCTAButton from "@/components/ui/AnimatedCTAButton";

/* ─── Yardımcılar ─── */
function findCategory(id: string) {
  const cat = MENU.find((c) => c.id === id);
  if (!cat) throw new Error(`MENU kategorisi bulunamadı: ${id}`);
  return cat;
}

function galleryAlt(src: string) {
  return GALLERY_IMAGES.find((g) => g.src === src)?.alt ?? "BOB The Pasta Factory";
}

const parmesanCat = findCategory("parmesan-tekerinde-makarnalar");
const lazanyaCat = findCategory("lazanya");
const ravioliCat = findCategory("ravioli");
const fixMenuCat = findCategory("fix-menuler");
const focacciaCat = findCategory("focaccia-sandvicler");
const tiramisuCat = findCategory("tiramisu");

const ravioliTeaser =
  ravioliCat.items?.find((i) => i.badge === "popular")?.description ??
  ravioliCat.items?.[0]?.description ??
  "";

const tiramisuFlavors =
  tiramisuCat.items?.map((i) => i.name.replace(/\s*Tiramisu\s*$/i, "").trim()).join(" · ") ?? "";
const tiramisuTeaser = `${tiramisuFlavors} çeşitleriyle; ${tiramisuCat.description ?? ""}`.trim();

/* Toplam lezzet sayısını gerçek veriden hesapla (fabrikasyon yok) */
const totalItemCount = MENU.reduce((sum, c) => {
  const direct = c.items?.length ?? 0;
  const nested = c.subcategories?.reduce((s, sc) => s + sc.items.length, 0) ?? 0;
  return sum + direct + nested;
}, 0);
const roundedItemCount = Math.floor(totalItemCount / 10) * 10;

type CardSize = "large" | "wide" | "small";

interface BentoCardData {
  id: string;
  slug: string;
  icon: string;
  name: string;
  teaser: string;
  image: string;
  size: CardSize;
  signature?: boolean;
}

const CARDS: BentoCardData[] = [
  {
    id: parmesanCat.id,
    slug: parmesanCat.slug,
    icon: parmesanCat.icon,
    name: parmesanCat.name,
    teaser: parmesanCat.description ?? "",
    image: "/images/hero-bg.jpg",
    size: "large",
    signature: true,
  },
  {
    id: ravioliCat.id,
    slug: ravioliCat.slug,
    icon: ravioliCat.icon,
    name: ravioliCat.name,
    teaser: ravioliTeaser,
    image: "/images/gallery-8.jpg",
    size: "small",
  },
  {
    id: fixMenuCat.id,
    slug: fixMenuCat.slug,
    icon: fixMenuCat.icon,
    name: fixMenuCat.name,
    teaser: fixMenuCat.description ?? "",
    image: "/images/gallery-7.jpg",
    size: "small",
  },
  {
    id: lazanyaCat.id,
    slug: lazanyaCat.slug,
    icon: lazanyaCat.icon,
    name: lazanyaCat.name,
    teaser: lazanyaCat.items?.[0]?.description ?? "",
    image: "/images/gallery-2.jpg",
    size: "wide",
  },
  {
    id: focacciaCat.id,
    slug: focacciaCat.slug,
    icon: focacciaCat.icon,
    name: focacciaCat.name,
    teaser: focacciaCat.description ?? "",
    image: "/images/gallery-3.jpg",
    size: "small",
  },
  {
    id: tiramisuCat.id,
    slug: tiramisuCat.slug,
    icon: tiramisuCat.icon,
    name: tiramisuCat.name,
    teaser: tiramisuTeaser,
    image: "/images/gallery-5.jpg",
    size: "small",
  },
];

function spanFor(size: CardSize): React.CSSProperties {
  if (size === "large") return { gridColumn: "span 2", gridRow: "span 2" };
  if (size === "wide") return { gridColumn: "span 2", gridRow: "span 1" };
  return { gridColumn: "span 1", gridRow: "span 1" };
}

const imageVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.08, transition: { duration: 0.5, ease: "easeOut" as const } },
};
const overlayVariants = {
  rest: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" as const } },
};
const detailVariants = {
  rest: { opacity: 0, y: 14 },
  hover: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
};

function BentoCard({ card }: { card: BentoCardData }) {
  const isLarge = card.size === "large";
  const isSmall = card.size === "small";
  const titleSize = isLarge ? 28 : card.size === "wide" ? 21 : 17;
  const pad = isLarge ? 30 : 22;

  return (
    <motion.div variants={fadeUp} style={{ ...spanFor(card.size), minHeight: isLarge ? 320 : 200 }}>
      <motion.div
        initial="rest"
        whileHover="hover"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: 22,
          overflow: "hidden",
          cursor: "pointer",
          background: "#1a1410",
        }}
      >
        <motion.div variants={imageVariants} style={{ position: "absolute", inset: 0 }}>
          <Image
            src={card.image}
            alt={galleryAlt(card.image)}
            fill
            sizes={isLarge ? "(max-width: 767px) 100vw, 55vw" : "(max-width: 767px) 100vw, 30vw"}
            style={{ objectFit: "cover" }}
          />
        </motion.div>

        {/* Sabit alt gradient — başlık her zaman okunur olsun */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(20,14,10,0) 40%, rgba(20,14,10,.88) 100%)",
          }}
        />

        {/* Hover'da beliren domates rengi gradient overlay */}
        <motion.div
          variants={overlayVariants}
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(160deg, rgba(193,68,45,.55) 0%, rgba(43,33,24,.78) 65%)",
          }}
        />

        {card.signature && (
          <span
            className="menu-badge chef"
            style={{ position: "absolute", top: 18, right: 18, zIndex: 2, background: "rgba(255,255,255,.92)" }}
          >
            👨‍🍳 İmza Lezzet
          </span>
        )}

        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: pad,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: titleSize,
              lineHeight: 1.15,
              color: "#fff",
              textShadow: "0 2px 12px rgba(0,0,0,.4)",
            }}
          >
            <span style={{ fontSize: titleSize + 2 }}>{card.icon}</span>
            <span>{card.name}</span>
          </div>

          <motion.p
            variants={detailVariants}
            style={
              {
                marginTop: 10,
                fontSize: isSmall ? 13 : 14.5,
                lineHeight: 1.5,
                color: "rgba(255,255,255,.88)",
                maxWidth: isLarge ? 440 : 320,
                display: "-webkit-box",
                WebkitLineClamp: isSmall ? 2 : 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              } as React.CSSProperties
            }
          >
            {card.teaser}
          </motion.p>

          <motion.div variants={detailVariants} style={{ marginTop: 14 }}>
            <Link
              href={`/menu#${card.slug}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                color: "#fff",
                fontWeight: 700,
                fontSize: 14,
                textDecoration: "none",
                borderBottom: "1.5px solid rgba(255,255,255,.6)",
                paddingBottom: 2,
              }}
            >
              İncele →
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function SignatureMenu() {
  return (
    <section
      className="section-pad"
      style={{
        background: "var(--text)",
        padding: "100px 40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dekoratif fon parıltıları */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -140,
          left: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "var(--primary)",
          opacity: 0.16,
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: -160,
          right: -120,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "var(--gold)",
          opacity: 0.12,
          filter: "blur(130px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 52px" }}
        >
          <span
            style={{
              fontFamily: "var(--font-script)",
              fontSize: 30,
              color: "var(--gold)",
              display: "block",
              marginBottom: 6,
            }}
          >
            Buon Appetito!
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 42px)",
              color: "#fff",
              margin: 0,
            }}
          >
            İmza Lezzetlerimiz 🍝
          </h2>
          <p style={{ marginTop: 14, fontSize: 16, color: "rgba(255,255,255,.68)", lineHeight: 1.7 }}>
            Parmesan tekerinde son dokunuşla hazırlanan makarnalardan el yapımı tiramisuya —
            mutfağımızın en sevilen 6 kategorisini keşfedin.
          </p>
        </motion.div>

        <motion.div
          className="bento-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridAutoRows: 230,
            gridAutoFlow: "dense",
            gap: 20,
          }}
        >
          {CARDS.map((card) => (
            <BentoCard key={card.id} card={card} />
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          style={{
            marginTop: 56,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            padding: "26px 32px",
            borderRadius: 20,
            background: "rgba(255,255,255,.06)",
            border: "1px solid rgba(255,255,255,.12)",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 15,
              fontWeight: 600,
              color: "rgba(255,255,255,.85)",
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            <span>🍝 {roundedItemCount}+ Lezzet</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>⭐ {RESTAURANT.rating}</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>🍝 El Yapımı</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>💬 WhatsApp</span>
          </p>
          <AnimatedCTAButton href="/menu" label="📖 Tüm Menüyü Gör" />
        </motion.div>
      </div>
    </section>
  );
}
