import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bebble — Дизайн сайта детской косметики | Яков Пилипюк',
  description:
    'Разработка сайта для бренда детской косметики Bebble. Мягкий B2C-интерфейс в пастельных тонах, удобная витрина и поиск точек продаж по Казахстану.',
  alternates: { canonical: '/case/bebble' },
  openGraph: {
    title: 'Bebble — Дизайн сайта детской косметики | Яков Пилипюк',
    description:
      'Разработка сайта для бренда детской косметики Bebble. Мягкий B2C-интерфейс в пастельных тонах, удобная витрина и поиск точек продаж по Казахстану.',
    url: 'https://yapil.art/case/bebble',
    images: [
      {
        url: 'https://yapil.art/case/Bebble.webp',
        width: 1200,
        height: 630,
        alt: 'Bebble Case Study Cover',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bebble — Дизайн сайта детской косметики | Яков Пилипюк',
    description:
      'Разработка сайта для бренда детской косметики Bebble. Мягкий B2C-интерфейс в пастельных тонах, удобная витрина и поиск точек продаж по Казахстану.',
    images: ['https://yapil.art/case/Bebble.webp'],
  },
};

export default function BebbleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    'name': 'Bebble — Дизайн сайта детской косметики',
    'description':
      'Сайт для бренда детской косметики Bebble: мягкий B2C-интерфейс, удобная витрина и поиск магазинов.',
    'image': 'https://yapil.art/case/Bebble.webp',
    'author': {
      '@type': 'Person',
      'name': 'Яков Пилипюк',
      'url': 'https://yapil.art',
    },
    'creator': {
      '@type': 'Person',
      'name': 'Яков Пилипюк',
    },
    'url': 'https://yapil.art/case/bebble',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
