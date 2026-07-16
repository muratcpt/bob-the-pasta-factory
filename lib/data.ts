export const RESTAURANT = {
  name: "BOB The Pasta Factory",
  shortName: "BOB",
  tagline: "The most enjoyable pasta in the city!",
  taglineTr: "Şehrin en keyifli makarna deneyimi",
  description:
    "Çanakkale Merkez'de İtalyan mutfağı sunan, parmesan tekerinde hazırlanan el yapımı makarnalarıyla tanınan bir pasta factory.",
  phone: "0530 171 13 39",
  phoneRaw: "+905301711339",
  whatsapp: "https://wa.me/905301711339",
  address:
    "Kemalpaşa Mahallesi, Eski Mahkeme Sokak, Sekure Apartmanı No:21/2, 17100 Çanakkale Merkez/Çanakkale",
  addressShort: "Kemalpaşa Mahallesi, Eski Mahkeme Sokak No:21/2, Çanakkale",
  instagram: "https://www.instagram.com/bobthepastafactory/",
  instagramHandle: "@bobthepastafactory",
  instagramFollowers: "12B+",
  googleMaps:
    "https://maps.google.com/maps?q=Bob+the+Pasta+Factory+Kemalpa%C5%9Fa+Mahallesi+%C3%87anakkale&z=17&output=embed",
  googleMapsDirections:
    "https://www.google.com/maps/search/?api=1&query=Bob+the+Pasta+Factory+Çanakkale",
  rating: 4.3,
  reviewCount: 304,
  priceRange: "₺200–400",
  hours: {
    weekdays: "12:00 – 23:00",
    saturday: "12:00 – 23:00",
    sunday: "14:00 – 23:00",
  },
};

export interface MenuItem {
  name: string;
  description?: string;
  price: number;
  note?: string;
  badge?: "popular" | "chef" | "spicy";
}

export interface MenuSubcategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface MenuCategory {
  id: string;
  slug: string;
  name: string;
  icon: string;
  description?: string;
  items?: MenuItem[];
  subcategories?: MenuSubcategory[];
}

export const MENU: MenuCategory[] = [
  {
    id: "fix-menuler",
    slug: "fix-menuler",
    name: "Fix Menüler",
    icon: "🍽️",
    description: "Her fix menüye Tiramisu, İçecek ve Türk Kahvesi ikramımızdır.",
    items: [
      {
        name: "Ravioli Menü",
        description:
          "Ispanak ve Mantar ya da 4 Peynirli ya da Patlıcan ve Mozzarella Dolgulu Ravioli, Tiramisu, İçecek, Türk Kahvesi İkram",
        price: 650,
        badge: "popular",
      },
      {
        name: "Lazanya Menü",
        description:
          "İtalyan işi el yapımı 5 katlı Lazanya, Tiramisu, İçecek, Türk Kahvesi İkram",
        price: 780,
        badge: "popular",
      },
      {
        name: "Fettucine Makarna Menü",
        description:
          "Mantarlı Tavuk ya da Körili Tavuk ya da Fesleğenli Fettucine Makarna, Tiramisu, İçecek, Türk Kahvesi İkram",
        price: 600,
      },
      {
        name: "Focaccia Sandviç Menü",
        description:
          "Dilediğiniz Focaccia Sandviç, Tiramisu, İçecek, Türk Kahvesi İkram",
        price: 580,
      },
    ],
  },
  {
    id: "focaccia-sandvicler",
    slug: "focaccia-sandvicler",
    name: "Focaccia Sandviçler",
    icon: "🥪",
    description: "200 gr el yapımı focaccia ekmeği üzerine hazırlanır.",
    items: [
      {
        name: "Focaccia No:1",
        description:
          "200 gr focaccia sandviç, füme dana, el yapımı pesto sos, krem peynir, roka",
        price: 290,
      },
      {
        name: "Focaccia No:2",
        description:
          "200 gr focaccia sandviç, eritilmiş cheddar, rende parmesan, krem peynir, taze kaşar",
        price: 290,
      },
      {
        name: "Focaccia No:3",
        description:
          "200 gr focaccia sandviç, el yapımı pesto, kuru domates, krem peynir, baby mozzarella, roka",
        price: 290,
      },
      {
        name: "Focaccia No:4",
        description:
          "200 gr focaccia sandviç, ton balık, el yapımı mayonez, krem peynir, roka",
        price: 245,
      },
      {
        name: "Focaccia No:5",
        description:
          "200 gr focaccia sandviç, hindi salam, krem peynir, bob özel sos, roka",
        price: 245,
      },
    ],
  },
  {
    id: "parmesan-tekerinde-makarnalar",
    slug: "parmesan-tekerinde-makarnalar",
    name: "Parmesan Tekerinde Makarnalar",
    icon: "🧀",
    description:
      "El yapımı fettucine makarnalarımız, dev bir parmesan tekerinin içinde son dokunuşla hazırlanır.",
    subcategories: [
      {
        id: "special-makarnalar",
        name: "Special Makarnalar",
        items: [
          {
            name: "Tiftik Etli",
            description:
              "6 saat düşük ısıda pişirilerek liflerine ayrılmış dana kaburgalı",
            price: 750,
            badge: "chef",
          },
          {
            name: "Deniz Mahsüllü",
            description:
              "Jumbo Karides, Midye, Yengeç Surumi, Biberiyeli tereyağında toz Biber ile hazırlanır.",
            price: 750,
            note: "Alerjiler: kabuklu deniz ürünü içerir",
            badge: "chef",
          },
          {
            name: "Beğendi Köz Patlıcan – Füme Et",
            description: "Beşamel ile Közlenmiş Patlıcan Uyumu",
            price: 415,
          },
          {
            name: "BoB & Cheese",
            description:
              "Eritilmiş Cheddar, Krema ve üst kısmına Peynir rendesi ile fırınlanmış sunulur.",
            price: 385,
          },
          {
            name: "3 Peynirli",
            description: "Parmesan, Mozzarella, Cheddar ve Krema ile Servis Edilir.",
            price: 365,
          },
          {
            name: "Kavurma – Cheddar",
            description:
              "100gr Dana Kavurma, Eritilmiş Cheddar ve Krema ile Servis Edilir.",
            price: 750,
          },
        ],
      },
      {
        id: "tavuklu-makarnalar",
        name: "Tavuklu Makarnalar",
        items: [
          {
            name: "Teriyaki Tavuk – Renkli Biber – Mantar",
            description:
              "Soya sos severler için doğru tercih. 100gr Tavuk ve Krema ile Servis Edilir.",
            price: 415,
          },
          {
            name: "Mantarlı Tavuk",
            description: "100gr Tavuk, Kültür Mantar ve Krema ile Servis Edilir.",
            price: 375,
          },
          {
            name: "Körili Tavuk – Renkli Biber – Mantar",
            description: "100gr Tavuk ve Krema ile Servis Edilir.",
            price: 415,
          },
          {
            name: "Tavuk – Napoliten – Kuru Domates",
            description:
              "100gr Tavuk, Özel Domates Sos ve Krema ile Servis Edilir.",
            price: 385,
            badge: "popular",
          },
          {
            name: "Barbekü Tavuk – Mısır",
            description: "100gr Tavuk ve Krema ile Servis Edilir.",
            price: 405,
          },
        ],
      },
      {
        id: "mantarli-makarnalar",
        name: "Mantarlı Makarnalar",
        items: [
          {
            name: "Mantar Rüyası – Cheddar",
            description:
              "İstridye, Kültür ve Kestane Mantarları, Eritilmiş Cheddar ve Krema ile Servis Edilir.",
            price: 385,
          },
          {
            name: "Bolonez – Mantar",
            description: "Özel Domatesli Kıymalı Sos ve Krema ile Servis Edilir.",
            price: 630,
          },
          {
            name: "Ispanak – Mantar – Brokoli",
            description: "Özel Ispanak Sos ve Krema ile Servis Edilir.",
            price: 325,
          },
          {
            name: "Mantar – Napoliten",
            description: "Özel Domates Sos ve Krema ile Servis Edilir.",
            price: 300,
          },
        ],
      },
      {
        id: "pestolu-makarnalar",
        name: "Pestolu (Fesleğenli) Makarnalar",
        items: [
          {
            name: "Pesto",
            description:
              "El Yapımı İtalyan İşi Fesleğen Sos ve Krema ile Servis Edilir.",
            price: 375,
          },
          {
            name: "Pesto – Kuru Domates – Mozzarella",
            description:
              "El Yapımı İtalyan İşi Fesleğen Sos ve Krema ile Servis Edilir.",
            price: 385,
          },
          {
            name: "Pesto – Mantar – Füme Et",
            description:
              "El Yapımı İtalyan İşi Fesleğen Sos, Füme Dana ve Krema ile Servis Edilir.",
            price: 415,
          },
          {
            name: "Pesto – Deniz Mahsüllü",
            description:
              "El Yapımı İtalyan İşi Fesleğen Sos, Jumbo Karides, Midye, Yengeç Surumi ve Krema ile Servis Edilir.",
            price: 800,
            badge: "chef",
          },
        ],
      },
      {
        id: "domatesli-makarnalar",
        name: "Domatesli Makarnalar",
        items: [
          {
            name: "Napoliten – Kuru Domates",
            description: "Özel Domates Sos ve Krema ile Servis Edilir.",
            price: 300,
          },
          {
            name: "Arabiata",
            description: "Özel Acılı Domates Sos ve Krema ile Servis Edilir.",
            price: 315,
            badge: "spicy",
          },
          {
            name: "Napoliten – Pesto – Cheddar",
            description:
              "Özel Domates Sos, el Yapımı İtalyan İşi Fesleğen Sos, Eritilmiş Cheddar ve Krema ile Servis Edilir.",
            price: 415,
            badge: "popular",
          },
          {
            name: "Napoliten – Ton Balık – Mısır",
            description: "Özel Domates Sos ve Krema ile Servis Edilir.",
            price: 415,
          },
        ],
      },
    ],
  },
  {
    id: "lazanya",
    slug: "lazanya",
    name: "Lazanya",
    icon: "🍝",
    items: [
      {
        name: "Lazanya",
        description:
          "5 katlı, katlar arası Beşamel, Parmesan, Mozzarella ve kıyma sos. İtalyan işi Lazanya.",
        price: 500,
        badge: "popular",
      },
    ],
  },
  {
    id: "ravioli",
    slug: "ravioli",
    name: "Ravioli",
    icon: "🥟",
    items: [
      {
        name: "Ispanak – Mantar Dolgulu",
        description: "Özel Domates Sos ile servis edilir.",
        price: 325,
      },
      {
        name: "4 Peynir Dolgulu",
        description:
          "Parmesan, Mozzarella, Krem ve Ricotta peynirli dolgu ve Krema ile servis edilir.",
        price: 400,
      },
      {
        name: "Patlıcan & Mozzarella Dolgulu",
        description: "Kremalı Mantarlı sos ve Trüf Yağı ile servis edilir.",
        price: 350,
        badge: "popular",
      },
    ],
  },
  {
    id: "tiramisu",
    slug: "tiramisu",
    name: "Tiramisu",
    icon: "🍰",
    description: "Dilediğiniz kahve ikramımızdır.",
    items: [
      { name: "Antep Fıstıklı Tiramisu", price: 300 },
      { name: "Çilek & Frambuazlı Tiramisu", price: 300 },
    ],
  },
  {
    id: "kahveler",
    slug: "kahveler",
    name: "Kahveler",
    icon: "☕",
    items: [
      { name: "Espresso", price: 150 },
      { name: "Americano", price: 160 },
      { name: "Macchiato", price: 155 },
      { name: "Latte", price: 165 },
      { name: "Salted Caramel Latte", description: "Tuzlu karamelli", price: 230 },
      { name: "Pecan Praline Latte", description: "Bademli", price: 230 },
      { name: "Cappuccino", price: 170 },
      { name: "Mocha", price: 180 },
      { name: "Türk Kahvesi", price: 120 },
    ],
  },
  {
    id: "icecekler",
    slug: "icecekler",
    name: "İçecekler",
    icon: "🥤",
    items: [
      { name: "Su", price: 30 },
      { name: "Soda", price: 30 },
      { name: "Şişe Kola", price: 100 },
      { name: "Şişe Sprite", price: 100 },
      { name: "Şişe Fanta", price: 100 },
      { name: "Fuse Tea", price: 100 },
      { name: "Ayran", price: 70 },
      { name: "El Yapımı Limonata", price: 90 },
    ],
  },
];

export interface Testimonial {
  name: string;
  text: string;
  rating: number;
  source: "Google" | "Yandex";
  timeAgo: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Aslıhan Akcan",
    text: "Bugün ilk kez uğradım ve gerçekten çok beğendim. Makarna porsiyonları hem doyurucu hem de lezzet dengesi harika.",
    rating: 5,
    source: "Google",
    timeAgo: "1 ay önce",
  },
  {
    name: "Orhan Şen",
    text: "Makarnaları gerçekten çok lezzetliydi, porsiyonlar doyurucu ve çalışanlar çok ilgiliydi. Mekânın ortamı da sıcak ve keyifliydi. Özellikle sosların tadı harikaydı, tekrar gelmek isteyeceğiniz bir yer. Kesinlikle tavsiye ederim 🍝✨",
    rating: 5,
    source: "Google",
    timeAgo: "1 ay önce",
  },
  {
    name: "Yandex Kullanıcısı",
    text: "Güzel yer, güler yüzlü personel. İçeride ve dışarıda masalar var. Bir arkadaş grubuyla farklı türde makarnalar sipariş ettiler, herkes hoşuna gitti. Porsiyonlar yeterince büyüktü.",
    rating: 5,
    source: "Yandex",
    timeAgo: "5 ay önce",
  },
];

export const GALLERY_IMAGES = [
  { src: "/images/hero-bg.jpg", alt: "Parmesan tekerinde hazırlanan el yapımı fettucine", tag: "Parmesan Tekeri" },
  { src: "/images/gallery-1.jpg", alt: "El yapımı fettucine makarna", tag: "Makarna" },
  { src: "/images/gallery-2.jpg", alt: "Porselen tabakta şık sunum", tag: "Lazanya" },
  { src: "/images/gallery-3.jpg", alt: "BOB The Pasta Factory lezzet sunumu", tag: "Makarna" },
  { src: "/images/gallery-4.jpg", alt: "El yapımı makarna workshop", tag: "Workshop" },
  { src: "/images/gallery-5.jpg", alt: "Deniz mahsüllü el yapımı makarna", tag: "Deniz Mahsülü" },
  { src: "/images/gallery-6.jpg", alt: "BOB The Pasta Factory'den bir kare", tag: "Makarna" },
  { src: "/images/gallery-7.jpg", alt: "El yapımı ravioli", tag: "Ravioli" },
  { src: "/images/gallery-8.jpg", alt: "Patlıcan ve mozzarella dolgulu ravioli", tag: "Ravioli" },
  { src: "/images/gallery-9.jpg", alt: "Ispanak mantar dolgulu ravioli", tag: "Ravioli" },
  { src: "/images/gallery-10.jpg", alt: "Pesto ve kuru domatesli el yapımı makarna", tag: "Makarna" },
];

export const VALUES = [
  {
    icon: "🍝",
    title: "Gerçek İtalyan Usulü",
    desc: "Her tarif, geleneksel İtalyan pişirme teknikleriyle hazırlanır.",
  },
  {
    icon: "🍳",
    title: "Günlük Taze Üretim",
    desc: "Makarnalarımız her gün, bol yumurta sarısıyla el yapımı olarak hazırlanır.",
  },
  {
    icon: "🧀",
    title: "Parmesan Tekeri Sunumu",
    desc: "İmza lezzetlerimiz, dev bir parmesan tekerinin içinde son dokunuşla servis edilir.",
  },
  {
    icon: "❤️",
    title: "Emek ve Tutku",
    desc: "Her lokmada el emeği, her tabakta özenli bir sunum vardır.",
  },
];
