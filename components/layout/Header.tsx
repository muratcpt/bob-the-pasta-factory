"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { RESTAURANT } from "@/lib/data";
import PhoneWidget from "@/components/ui/PhoneWidget";
import AnimatedCTAButton from "@/components/ui/AnimatedCTAButton";

const NAV_LINKS = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/menu", label: "Menü" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/galeri", label: "Galeri" },
  { href: "/iletisim", label: "İletişim" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isHomePage = pathname === "/";
  // Hero is a light cream background (no dark photo), so the header always
  // uses dark text — only the background/blur/shadow fade in on scroll.
  const isTransparent = isHomePage && !scrolled;

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 90,
        transition: "all .35s",
        background: isTransparent ? "transparent" : "rgba(251,245,234,.96)",
        backdropFilter: isTransparent ? "none" : "blur(18px)",
        borderBottom: isTransparent ? "1px solid transparent" : "1px solid var(--border)",
        boxShadow: isTransparent ? "none" : "0 4px 24px rgba(120,70,40,.08)",
      }}
    >
      <div
        className="section-pad"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "16px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: "50%",
              overflow: "hidden",
              flexShrink: 0,
              border: "2px solid var(--gold)",
              boxShadow: "0 2px 10px rgba(0,0,0,.2)",
            }}
          >
            <Image src="/images/logo.jpg" alt="BOB The Pasta Factory logo" width={46} height={46} style={{ objectFit: "cover" }} priority />
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: 19,
                lineHeight: 1.1,
                color: "var(--text)",
              }}
            >
              BOB
            </div>
            <div
              style={{
                fontSize: 10.5,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "var(--text-muted)",
              }}
            >
              The Pasta Factory
            </div>
          </div>
        </Link>

        <nav
          className="header-desktop-nav"
          style={{ display: "flex", alignItems: "center", gap: 34 }}
        >
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: 14.5,
                  fontWeight: 600,
                  textDecoration: "none",
                  color: active ? "var(--primary-dark)" : "var(--text)",
                  position: "relative",
                  paddingBottom: 4,
                  borderBottom: active ? "2px solid var(--primary)" : "2px solid transparent",
                  transition: "opacity .2s",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="header-desktop-cta" style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <PhoneWidget variant="light" size="sm" />
          <AnimatedCTAButton size="sm" label="🍝 Rezervasyon" />
        </div>

        <button
          className="header-hamburger"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menüyü aç/kapat"
          style={{
            display: "none",
            width: 42,
            height: 42,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            background: "var(--bg-alt)",
            backdropFilter: "blur(6px)",
            border: "1.5px solid var(--border)",
            cursor: "pointer",
          }}
        >
          {mobileOpen ? <X size={22} color="var(--text)" /> : <Menu size={22} color="var(--text)" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ overflow: "hidden", background: "var(--bg)", borderTop: "1px solid var(--border)" }}
          >
            <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 4 }}>
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    style={{
                      display: "block",
                      padding: "12px 4px",
                      fontSize: 16,
                      fontWeight: 600,
                      color: pathname === link.href ? "var(--primary-dark)" : "var(--text)",
                      textDecoration: "none",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                <PhoneWidget variant="light" size="sm" />
                <AnimatedCTAButton size="md" style={{ width: "100%" }} />
              </div>
              <div style={{ marginTop: 10, fontSize: 12.5, color: "var(--text-muted)" }}>
                {RESTAURANT.hours.weekdays} · {RESTAURANT.addressShort}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
