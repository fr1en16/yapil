import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://yapil.art'),
  title: 'Яков Пилипюк — Мультидисциплинарный дизайнер',
  description:
    'Уже 8 лет превращаю сложные бизнес-задачи в точные визуальные системы. Айдентика, сайты любой сложности, полиграфия. Полный цикл разработки.',
  keywords: [
    'дизайнер',
    'Яков Пилипюк',
    'yapil',
    'брендинг',
    'UX UI дизайн',
    'Казахстан',
    'логотип',
    'сайт',
    'thepeak',
  ],
  authors: [{ name: 'Яков Пилипюк', url: 'https://yapil.art' }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Яков Пилипюк — Мультидисциплинарный дизайнер',
    description: '8 лет превращаю бизнес-задачи в точные визуальные решения.',
    url: 'https://yapil.art',
    siteName: 'YAPIL',
    type: 'website',
    images: [
      {
        url: 'https://yapil.art/me.webp',
        width: 800,
        height: 800,
        alt: 'Яков Пилипюк — Мультидисциплинарный дизайнер',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Яков Пилипюк — Мультидисциплинарный дизайнер',
    description: '8 лет превращаю бизнес-задачи в точные визуальные решения.',
    images: ['https://yapil.art/me.webp'],
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

import SmoothScroll from '@/components/SmoothScroll';
import ThreeDPageTransition from '@/components/ThreeDPageTransition';
import { FallingPattern } from '@/components/ui/falling-pattern';
import Footer from '@/components/Footer';
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://yapil.art/#person',
        'name': 'Яков Пилипюк',
        'jobTitle': 'Мультидисциплинарный дизайнер',
        'url': 'https://yapil.art',
        'sameAs': [
          'https://t.me/yakov_pil',
        ],
        'description': 'Уже 8 лет превращаю сложные бизнес-задачи в точные визуальные системы. Айдентика, сайты любой сложности, полиграфия. Полный цикл разработки.',
        'image': 'https://yapil.art/me.webp',
      },
      {
        '@type': 'WebSite',
        '@id': 'https://yapil.art/#website',
        'url': 'https://yapil.art',
        'name': 'Яков Пилипюк — Мультидисциплинарный дизайнер',
        'publisher': {
          '@id': 'https://yapil.art/#person',
        },
      },
    ],
  };

  return (
    <html lang="ru" suppressHydrationWarning className={cn("font-sans", inter.variable)}>
      <head>
        {/* Anti-FOUC: set theme class before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    var t = localStorage.getItem('theme');
    if (!t) {
      var h = new Date().getHours();
      t = (h >= 18 || h < 6) ? 'dark' : 'light';
    }
    if (t === 'dark') {
      document.documentElement.classList.add('dark');
    }
  } catch(e) {}
})();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SmoothScroll />
        <FallingPattern
          className="fixed inset-0 w-full h-full -z-10"
          color="var(--pattern-color)"
          backgroundColor="var(--bg)"
        />
        <ThreeDPageTransition>
          {children}
          <div className="content-col">
            <hr className="divider" />
            <Footer />
          </div>
        </ThreeDPageTransition>
      </body>
    </html>
  );
}
