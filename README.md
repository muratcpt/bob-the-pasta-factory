# BOB The Pasta Factory

Çanakkale'de parmesan tekerinde el yapımı makarna, lazanya ve ravioli sunan BOB The Pasta Factory için Next.js 16 ile geliştirilmiş kurumsal web sitesi.

## Teknoloji

- Next.js 16 (App Router, TypeScript)
- Tailwind v4 + inline style / `globals.css` tabanlı tasarım sistemi
- Framer Motion, lucide-react

## Geliştirme

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) adresinden görüntüleyin.

## Yapı

- `lib/data.ts` — işletme bilgileri, tam menü, yorumlar, galeri verisi (tek gerçek kaynak)
- `app/` — sayfalar: Ana Sayfa, Menü, Hakkımızda, Galeri, İletişim
- `components/` — layout, ana sayfa bölümleri, menü ve galeri bileşenleri

## Deploy

```bash
npm run build
vercel --prod
```
