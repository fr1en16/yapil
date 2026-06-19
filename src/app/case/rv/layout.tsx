import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Рыкунов и Кудряшов — Лендинг для продюсеров | Яков Пилипюк',
  description:
    'Разработка премиального лендинга для продюсеров Академии Запусков RV (Роман Рыкунов и Владислав Кудряшов). Визуальное позиционирование и дизайн.',
  openGraph: {
    title: 'Рыкунов и Кудряшов — Лендинг для продюсеров | Яков Пилипюк',
    description:
      'Разработка премиального лендинга для продюсеров Академии Запусков RV (Роман Рыкунов и Владислав Кудряшов). Визуальное позиционирование и дизайн.',
    url: 'https://yapil.art/case/rv',
    images: [
      {
        url: 'https://yapil.art/me.webp',
        width: 800,
        height: 800,
        alt: 'Яков Пилипюк — Дизайнер',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Рыкунов и Кудряшов — Лендинг для продюсеров | Яков Пилипюк',
    description:
      'Разработка премиального лендинга для продюсеров Академии Запусков RV (Роман Рыкунов и Владислав Кудряшов). Визуальное позиционирование и дизайн.',
    images: ['https://yapil.art/me.webp'],
  },
};

export default function RvLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    'name': 'Рыкунов и Кудряшов — Лендинг для продюсеров',
    'description':
      'Разработка премиального лендинга для продюсеров Академии Запусков RV (Роман Рыкунов и Владислав Кудряшов).',
    'image': 'https://yapil.art/me.webp',
    'author': {
      '@type': 'Person',
      'name': 'Яков Пилипюк',
      'url': 'https://yapil.art',
    },
    'creator': {
      '@type': 'Person',
      'name': 'Яков Пилипюк',
    },
    'url': 'https://yapil.art/case/rv',
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
