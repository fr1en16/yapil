import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Boya — Брендинг и сайт лакокрасочного бренда | Яков Пилипюк',
  description:
    'Разработка бренда и корпоративного сайта лакокрасочных материалов Boya. Создание современной дизайн-системы, веб-дизайн и верстка.',
  openGraph: {
    title: 'Boya — Брендинг и сайт лакокрасочного бренда | Яков Пилипюк',
    description:
      'Разработка бренда и корпоративного сайта лакокрасочных материалов Boya. Создание современной дизайн-системы, веб-дизайн и верстка.',
    url: 'https://yapil.art/case/boya',
    images: [
      {
        url: 'https://yapil.art/case/Boya.webp',
        width: 1200,
        height: 630,
        alt: 'Boya Case Study Cover',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boya — Брендинг и сайт лакокрасочного бренда | Яков Пилипюк',
    description:
      'Разработка бренда и корпоративного сайта лакокрасочных материалов Boya. Создание современной дизайн-системы, веб-дизайн и верстка.',
    images: ['https://yapil.art/case/Boya.webp'],
  },
};

export default function BoyaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    'name': 'Boya — Брендинг и сайт лакокрасочного бренда',
    'description':
      'Разработка бренда и корпоративного сайта лакокрасочных материалов Boya: дизайн-система, сайт и полиграфия.',
    'image': 'https://yapil.art/case/Boya.webp',
    'author': {
      '@type': 'Person',
      'name': 'Яков Пилипюк',
      'url': 'https://yapil.art',
    },
    'creator': {
      '@type': 'Person',
      'name': 'Яков Пилипюк',
    },
    'url': 'https://yapil.art/case/boya',
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
