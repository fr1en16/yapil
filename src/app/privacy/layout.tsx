import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности — ИП PEAK | Яков Пилипюк',
  description:
    'Политика конфиденциальности и правила обработки персональных данных пользователей сайта yapil.art (ИП PEAK).',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'Политика конфиденциальности — ИП PEAK | Яков Пилипюк',
    description:
      'Политика конфиденциальности и правила обработки персональных данных пользователей сайта yapil.art (ИП PEAK).',
    url: 'https://yapil.art/privacy',
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    'name': 'Политика конфиденциальности — ИП PEAK',
    'description':
      'Политика конфиденциальности и правила обработки персональных данных для сайта yapil.art.',
    'publisher': {
      '@type': 'Person',
      'name': 'Яков Пилипюк',
      'url': 'https://yapil.art',
    },
    'url': 'https://yapil.art/privacy',
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
