import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shanding — Лендинг логистической компании | Яков Пилипюк',
  description:
    'Разработка адаптивного лендинга и сопутствующих рекламных материалов (полиграфии) для логистической компании Shanding.',
  openGraph: {
    title: 'Shanding — Лендинг логистической компании | Яков Пилипюк',
    description:
      'Разработка адаптивного лендинга и сопутствующих рекламных материалов (полиграфии) для логистической компании Shanding.',
    url: 'https://yapil.art/case/shanding',
    images: [
      {
        url: 'https://yapil.art/case/Shanding.webp',
        width: 1200,
        height: 630,
        alt: 'Shanding Case Study Cover',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shanding — Лендинг логистической компании | Яков Пилипюк',
    description:
      'Разработка адаптивного лендинга и сопутствующих рекламных материалов (полиграфии) для логистической компании Shanding.',
    images: ['https://yapil.art/case/Shanding.webp'],
  },
};

export default function ShandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    'name': 'Shanding — Лендинг логистической компании',
    'description':
      'Разработка адаптивного лендинга и рекламных материалов (полиграфии) для логистической компании Shanding.',
    'image': 'https://yapil.art/case/Shanding.webp',
    'author': {
      '@type': 'Person',
      'name': 'Яков Пилипюк',
      'url': 'https://yapil.art',
    },
    'creator': {
      '@type': 'Person',
      'name': 'Яков Пилипюк',
    },
    'url': 'https://yapil.art/case/shanding',
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
