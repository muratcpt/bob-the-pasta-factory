"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock } from "lucide-react";
import { RESTAURANT, MENU } from "@/lib/data";
import AnimatedCTAButton from "@/components/ui/AnimatedCTAButton";
import InstagramIcon from "@/components/ui/InstagramIcon";

const PAGES = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/menu", label: "Menü" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/galeri", label: "Galeri" },
  { href: "/iletisim", label: "İletişim" },
];

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        color: hover ? "#fff" : "rgba(255,255,255,.62)",
        textDecoration: "none",
        fontSize: 14.5,
        transition: "color .2s",
      }}
    >
      {children}
    </Link>
  );
}

export default function Footer() {
  const year = 2026;
  return (
    <footer style={{ background: "var(--text)", color: "#fff", paddingTop: 72 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }} className="section-pad">
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr",
            gap: 40,
            paddingBottom: 48,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", overflow: "hidden", border: "2px solid var(--gold)" }}>
                <Image src="/images/logo.jpg" alt="BOB The Pasta Factory" width={48} height={48} style={{ objectFit: "cover" }} />
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20 }}>
                BOB <span style={{ fontWeight: 400, fontSize: 13, opacity: 0.7, display: "block", letterSpacing: ".1em" }}>THE PASTA FACTORY</span>
              </div>
            </div>
            <p style={{ fontSize: 14.5, color: "rgba(255,255,255,.65)", lineHeight: 1.7, maxWidth: 340 }}>
              {RESTAURANT.description}
            </p>
            <a
              href={RESTAURANT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginTop: 18,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 18px",
                borderRadius: 100,
                background: "rgba(255,255,255,.08)",
                border: "1px solid rgba(255,255,255,.16)",
                color: "#fff",
                textDecoration: "none",
                fontSize: 13.5,
                fontWeight: 600,
              }}
            >
              <InstagramIcon size={16} /> {RESTAURANT.instagramHandle}
            </a>
          </div>

          <div>
            <h4 style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--gold)", marginBottom: 18, fontWeight: 700 }}>
              Sayfalar
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {PAGES.map((p) => (
                <FooterLink key={p.href} href={p.href}>
                  {p.label}
                </FooterLink>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--gold)", marginBottom: 18, fontWeight: 700 }}>
              Menü
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {MENU.slice(0, 6).map((cat) => (
                <FooterLink key={cat.id} href={`/menu#${cat.slug}`}>
                  {cat.icon} {cat.name}
                </FooterLink>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--gold)", marginBottom: 18, fontWeight: 700 }}>
              İletişim
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
              <div style={{ display: "flex", gap: 10, fontSize: 14, color: "rgba(255,255,255,.72)" }}>
                <MapPin size={18} style={{ flexShrink: 0, marginTop: 2, color: "var(--gold)" }} />
                <span>{RESTAURANT.addressShort}</span>
              </div>
              <a href={`tel:${RESTAURANT.phoneRaw}`} style={{ display: "flex", gap: 10, fontSize: 14, color: "rgba(255,255,255,.72)", textDecoration: "none" }}>
                <Phone size={18} style={{ flexShrink: 0, color: "var(--gold)" }} />
                <span>{RESTAURANT.phone}</span>
              </a>
              <div style={{ display: "flex", gap: 10, fontSize: 14, color: "rgba(255,255,255,.72)" }}>
                <Clock size={18} style={{ flexShrink: 0, marginTop: 2, color: "var(--gold)" }} />
                <span>
                  Hafta içi &amp; Cmt: {RESTAURANT.hours.weekdays}
                  <br />
                  Pazar: {RESTAURANT.hours.sunday}
                </span>
              </div>
            </div>
            <AnimatedCTAButton size="sm" style={{ width: "100%" }} />
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,.12)",
            padding: "22px 0",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            fontSize: 13,
            color: "rgba(255,255,255,.5)",
          }}
        >
          <span>© {year} BOB The Pasta Factory. Tüm hakları saklıdır.</span>
          <a href={`tel:${RESTAURANT.phoneRaw}`} style={{ color: "rgba(255,255,255,.5)", textDecoration: "none" }}>
            {RESTAURANT.phone}
          </a>
        </div>
      </div>
    </footer>
  );
}
