import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
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
  openGraph: {
    title: 'Яков Пилипюк — Мультидисциплинарный дизайнер',
    description: '8 лет превращаю бизнес-задачи в точные визуальные решения.',
    url: 'https://yapil.art',
    siteName: 'YAPIL',
    type: 'website',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        {/* Anti-FOUC: set theme class before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    var t = localStorage.getItem('theme');
    if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  } catch(e) {}
})();
            `,
          }}
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
