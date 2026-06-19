import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compass — Брендинг и сайт консалтинговой компании | Яков Пилипюк',
  description:
    'Разработка бренда и корпоративного сайта узбекистанской консалтинговой компании Compass. Чистый B2B-интерфейс, строгая геометрия и выверенная дизайн-система.',
  openGraph: {
    title: 'Compass — Брендинг и сайт консалтинговой компании | Яков Пилипюк',
    description:
      'Разработка бренда и корпоративного сайта узбекистанской консалтинговой компании Compass. Чистый B2B-интерфейс, строгая геометрия и выверенная дизайн-система.',
    url: 'https://yapil.art/case/compass',
    images: [
      {
        url: 'https://yapil.art/case/Compass.webp',
        width: 1200,
        height: 630,
        alt: 'Compass Case Study Cover',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compass — Брендинг и сайт консалтинговой компании | Яков Пилипюк',
    description:
      'Разработка бренда и корпоративного сайта узбекистанской консалтинговой компании Compass. Чистый B2B-интерфейс, строгая геометрия и выверенная дизайн-система.',
    images: ['https://yapil.art/case/Compass.webp'],
  },
};

export default function CompassLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    'name': 'Compass — Брендинг и сайт консалтинговой компании',
    'description':
      'Разработка бренда и корпоративного сайта для консалтинговой компании Compass: геометрия стабильности, чистый B2B-интерфейс и вектор роста.',
    'image': 'https://yapil.art/case/Compass.webp',
    'author': {
      '@type': 'Person',
      'name': 'Яков Пилипюк',
      'url': 'https://yapil.art',
    },
    'creator': {
      '@type': 'Person',
      'name': 'Яков Пилипюк',
    },
    'url': 'https://yapil.art/case/compass',
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
