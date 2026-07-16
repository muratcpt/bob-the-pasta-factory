import Link from "next/link";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import AnimatedCTAButton from "@/components/ui/AnimatedCTAButton";
import { RESTAURANT } from "@/lib/data";

export default function GaleriPage() {
  return (
    <>
      <section
        style={{
          paddingTop: 150,
          paddingBottom: 64,
          textAlign: "center",
          background: "linear-gradient(180deg, var(--bg-alt), var(--bg))",
        }}
        className="section-pad"
      >
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px" }}>
          <div
            style={{
              fontFamily: "var(--font-script)",
              fontSize: 30,
              color: "var(--primary)",
              marginBottom: 6,
            }}
          >
            Lezzet Anları
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(34px, 5vw, 54px)",
              color: "var(--text)",
              marginBottom: 16,
            }}
          >
            Galeri
          </h1>
          <p style={{ fontSize: 16.5, color: "var(--text-muted)", lineHeight: 1.7 }}>
            El yapımı makarnalarımızdan parmesan tekerinde son dokunuşa, atölyemizden imza
            lezzetlerimize — BOB The Pasta Factory&apos;den kareler.
          </p>
        </div>
      </section>

      <section style={{ padding: "0 40px 96px" }} className="section-pad">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <GalleryGrid />
        </div>
      </section>

      <section
        style={{
          padding: "72px 40px",
          textAlign: "center",
          background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
          color: "#fff",
        }}
        className="section-pad"
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(26px, 4vw, 40px)",
            fontWeight: 800,
            marginBottom: 14,
          }}
        >
          Daha Fazlası İçin Instagram&apos;ı Takip Edin
        </h2>
        <p style={{ fontSize: 15.5, opacity: 0.9, marginBottom: 30 }}>
          {RESTAURANT.instagramHandle} · {RESTAURANT.instagramFollowers} takipçi
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <AnimatedCTAButton size="lg" />
          <a
            href={RESTAURANT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            📸 Instagram&apos;da Takip Et
          </a>
          <Link href="/menu" className="btn-outline">
            📖 Menüyü Gör
          </Link>
        </div>
      </section>
    </>
  );
}
