"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Star, MessageCircle, ChefHat } from "lucide-react";
import { RESTAURANT } from "@/lib/data";
import InstagramIcon from "@/components/ui/InstagramIcon";

interface CounterProps {
  to: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

function Counter({ to, decimals = 0, suffix = "", prefix = "" }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const step = to / 40;
    const timer = setInterval(() => {
      current += step;
      if (current >= to) {
        setValue(to);
        clearInterval(timer);
      } else {
        setValue(current);
      }
    }, 45);
    return () => clearInterval(timer);
  }, [inView, to]);

  const display = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString("tr-TR");

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

interface StatItem {
  icon: React.ReactNode;
  value: React.ReactNode;
  label: string;
}

export default function StatsBar() {
  const stats: StatItem[] = [
    {
      icon: <Star size={24} color="var(--primary)" fill="var(--primary)" />,
      value: <Counter to={RESTAURANT.rating} decimals={1} suffix="★" />,
      label: "Google Puanı",
    },
    {
      icon: <MessageCircle size={24} color="var(--primary)" />,
      value: <Counter to={RESTAURANT.reviewCount} suffix="+" />,
      label: "Mutlu Yorum",
    },
    {
      icon: <InstagramIcon size={24} color="var(--primary)" />,
      value: RESTAURANT.instagramFollowers,
      label: "Instagram Takipçi",
    },
    {
      icon: <ChefHat size={24} color="var(--primary)" />,
      value: "Her Gün Taze",
      label: "Üretim 🍝",
    },
  ];

  return (
    <section
      className="section-pad"
      style={{
        background: "var(--card)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        boxShadow: "0 2px 24px var(--shadow)",
        padding: "40px 40px",
        position: "relative",
        zIndex: 5,
      }}
    >
      <div
        className="stats-grid"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 24,
        }}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              justifyContent: "center",
              textAlign: "left",
            }}
          >
            <motion.div
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
              style={{
                width: 52,
                height: 52,
                flexShrink: 0,
                borderRadius: 16,
                background: "var(--bg-alt)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {stat.icon}
            </motion.div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: 24,
                  lineHeight: 1.15,
                  color: "var(--text)",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  letterSpacing: ".01em",
                }}
              >
                {stat.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
