"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { GALLERY_IMAGES } from "@/lib/data";
import { fadeUp, staggerContainerFast } from "@/lib/animations";

export default function GalleryGrid() {
  const tags = useMemo(() => {
    const unique = Array.from(new Set(GALLERY_IMAGES.map((img) => img.tag)));
    return ["Tümü", ...unique];
  }, []);
  const [active, setActive] = useState("Tümü");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (active === "Tümü" ? GALLERY_IMAGES : GALLERY_IMAGES.filter((img) => img.tag === active)),
    [active]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, filtered.length]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          justifyContent: "center",
          marginBottom: 44,
        }}
      >
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActive(tag)}
            className={`btn-pill${active === tag ? " active" : ""}`}
            style={{ border: "1.5px solid var(--border)" }}
          >
            {tag}
          </button>
        ))}
      </div>

      <motion.div
        key={active}
        variants={staggerContainerFast}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="gallery-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 18,
        }}
      >
        {filtered.map((img, i) => (
          <GalleryCard key={img.src} image={img} onClick={() => setLightboxIndex(i)} />
        ))}
      </motion.div>

      <AnimatePresence>
        {lightboxIndex !== null && filtered[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(20,14,10,.92)",
              zIndex: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
            }}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              aria-label="Kapat"
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(255,255,255,.12)",
                border: "1px solid rgba(255,255,255,.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#fff",
              }}
            >
              <X size={22} />
            </button>
            <div
              style={{
                position: "absolute",
                top: 24,
                left: 24,
                color: "rgba(255,255,255,.7)",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {lightboxIndex + 1} / {filtered.length}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
              }}
              aria-label="Önceki"
              style={{
                position: "absolute",
                left: 20,
                top: "50%",
                transform: "translateY(-50%)",
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "rgba(255,255,255,.12)",
                border: "1px solid rgba(255,255,255,.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#fff",
              }}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));
              }}
              aria-label="Sonraki"
              style={{
                position: "absolute",
                right: 20,
                top: "50%",
                transform: "translateY(-50%)",
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "rgba(255,255,255,.12)",
                border: "1px solid rgba(255,255,255,.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#fff",
              }}
            >
              <ChevronRight size={24} />
            </button>
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                width: "min(90vw, 480px)",
                aspectRatio: "4/5",
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 24px 80px rgba(0,0,0,.5)",
              }}
            >
              <Image
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].alt}
                fill
                sizes="90vw"
                style={{ objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "40px 20px 18px",
                  background: "linear-gradient(to top, rgba(0,0,0,.75), transparent)",
                  color: "#fff",
                  fontSize: 14,
                }}
              >
                {filtered[lightboxIndex].alt}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GalleryCard({
  image,
  onClick,
}: {
  image: { src: string; alt: string; tag: string };
  onClick: () => void;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <motion.button
      variants={fadeUp}
      onClick={onClick}
      whileHover={{ y: -4 }}
      style={{
        position: "relative",
        aspectRatio: "1/1",
        borderRadius: 18,
        overflow: "hidden",
        border: "1px solid var(--border)",
        cursor: "pointer",
        padding: 0,
        background: "var(--bg-alt)",
      }}
    >
      {!failed ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 767px) 50vw, 33vw"
          style={{ objectFit: "cover", transition: "transform .4s ease" }}
          onError={() => setFailed(true)}
          className="gallery-card-img"
        />
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 40,
            background: "linear-gradient(135deg, var(--bg-alt), var(--border))",
          }}
        >
          🍝
        </div>
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(20,14,10,.75), transparent 55%)",
          opacity: 0,
          transition: "opacity .25s",
        }}
        className="gallery-card-overlay"
      />
      <div
        style={{
          position: "absolute",
          left: 12,
          bottom: 12,
          color: "#fff",
          fontSize: 12.5,
          fontWeight: 700,
          opacity: 0,
          transition: "opacity .25s",
          textShadow: "0 1px 6px rgba(0,0,0,.5)",
        }}
        className="gallery-card-label"
      >
        {image.tag}
      </div>
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          width: 30,
          height: 30,
          borderRadius: "50%",
          background: "rgba(255,255,255,.85)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Search size={14} color="var(--text)" />
      </div>
      <style jsx>{`
        button:hover :global(.gallery-card-img) {
          transform: scale(1.08);
        }
        button:hover :global(.gallery-card-overlay),
        button:hover :global(.gallery-card-label) {
          opacity: 1;
        }
      `}</style>
    </motion.button>
  );
}
