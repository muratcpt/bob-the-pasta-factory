"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { GALLERY_IMAGES, RESTAURANT } from "@/lib/data";
import { fadeUp, staggerContainerFast } from "@/lib/animations";

const PREVIEW_IMAGES = GALLERY_IMAGES.slice(0, 6);

export default function GalleryPreview() {
  return (
    <section className="section-pad" style={{ padding: "100px 40px", background: "var(--bg)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainerFast}
          style={{ textAlign: "center", marginBottom: 52 }}
        >
          <motion.span
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-script)",
              fontSize: 30,
              color: "var(--primary)",
              display: "block",
              marginBottom: 6,
            }}
          >
            Objektiften BOB
          </motion.span>
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(30px, 4vw, 44px)",
              fontWeight: 800,
              color: "var(--text)",
              margin: 0,
            }}
          >
            Lezzetin İçinden Kareler 📸
          </motion.h2>
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 16,
              color: "var(--text-muted)",
              maxWidth: 560,
              margin: "14px auto 0",
              lineHeight: 1.7,
            }}
          >
            Parmesan tekerinden atölyeye, tabaktan sofraya — BOB mutfağının içinden gerçek anlar.
          </motion.p>
        </motion.div>

        <motion.div
          className="gallery-preview-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainerFast}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridAutoRows: "260px",
            gap: 16,
          }}
        >
          {PREVIEW_IMAGES.map((image, i) => (
            <motion.div
              key={image.src}
              variants={fadeUp}
              style={{
                position: "relative",
                gridRow: i === 0 || i === 3 ? "span 2" : undefined,
                borderRadius: 20,
                overflow: "hidden",
                border: "1px solid var(--border)",
                boxShadow: "0 10px 30px var(--shadow)",
              }}
            >
              <Link
                href="/galeri"
                style={{ display: "block", width: "100%", height: "100%", position: "relative" }}
              >
                <GalleryCard image={image} />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            marginTop: 48,
          }}
        >
          <Link href="/galeri" className="btn-outline">
            📷 Galeriyi Gör
          </Link>
          <a
            href={RESTAURANT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{
              background: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
              boxShadow: "0 4px 20px rgba(220,39,67,.4)",
            }}
          >
            📸 Instagram&apos;da Takip Et
          </a>
        </div>
      </div>
    </section>
  );
}

function GalleryCard({ image }: { image: (typeof GALLERY_IMAGES)[number] }) {
  return (
    <motion.div
      whileHover="hover"
      initial="rest"
      animate="rest"
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      <motion.div
        variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        style={{ position: "relative", width: "100%", height: "100%" }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 767px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
        />
      </motion.div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(43,33,24,0) 40%, rgba(43,33,24,.85) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          width: 34,
          height: 34,
          borderRadius: "50%",
          background: "rgba(255,255,255,.9)",
          backdropFilter: "blur(6px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 15,
          boxShadow: "0 2px 10px rgba(0,0,0,.2)",
        }}
      >
        🔍
      </div>

      <div
        style={{
          position: "absolute",
          left: 16,
          right: 16,
          bottom: 16,
          color: "#fff",
        }}
      >
        <span
          style={{
            display: "inline-block",
            padding: "4px 12px",
            borderRadius: 100,
            background: "rgba(255,255,255,.16)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,.3)",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: ".02em",
            marginBottom: 8,
          }}
        >
          {image.tag}
        </span>
        <motion.div
          variants={{ rest: { opacity: 0, y: 8 }, hover: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={{ fontSize: 14, fontWeight: 700 }}
        >
          Galeriye Git →
        </motion.div>
      </div>
    </motion.div>
  );
}
