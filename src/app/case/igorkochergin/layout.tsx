import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Игорь Кочергин — Премиальный лендинг программы менторства | Яков Пилипюк',
  description:
    'Кейс разработки премиального лендинга для программы менторства Игоря Кочергина. Эстетика цифрового золота, жесткая сетка интерфейса и уникальная 3D-графика.',
  alternates: { canonical: '/case/igorkochergin' },
  openGraph: {
    title: 'Игорь Кочергин — Премиальный лендинг программы менторства | Яков Пилипюк',
    description:
      'Кейс разработки премиального лендинга для программы менторства Игоря Кочергина. Эстетика цифрового золота, жесткая сетка интерфейса и уникальная 3D-графика.',
    url: 'https://yapil.art/case/igorkochergin',
    images: [
      {
        url: 'https://yapil.art/case/%D0%98%D0%B3%D0%BE%D1%80%D1%8C%20%D0%9A%D0%BE%D1%87%D0%B5%D1%80%D0%B3%D0%B8%D0%BD.webp',
        width: 1200,
        height: 630,
        alt: 'Игорь Кочергин Case Study Cover',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Игорь Кочергин — Премиальный лендинг программы менторства | Яков Пилипюк',
    description:
      'Кейс разработки премиального лендинга для программы менторства Игоря Кочергина. Эстетика цифрового золота, жесткая сетка интерфейса и уникальная 3D-графика.',
    images: ['https://yapil.art/case/%D0%98%D0%B3%D0%BE%D1%80%D1%8C%20%D0%9A%D0%BE%D1%87%D0%B5%D1%80%D0%B3%D0%B8%D0%BD.webp'],
  },
};

export default function IgorKocherginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    'name': 'Игорь Кочергин — Премиальный лендинг программы менторства',
    'description':
      'Разработка премиального лендинга для программы менторства Игоря Кочергина: монументальная эстетика цифрового золота, 3D-графика и строгая бизнес-логика.',
    'image': 'https://yapil.art/case/%D0%98%D0%B3%D0%BE%D1%80%D1%8C%20%D0%9A%D0%BE%D1%87%D0%B5%D1%80%D0%B3%D0%B8%D0%BD.webp',
    'author': {
      '@type': 'Person',
      'name': 'Яков Пилипюк',
      'url': 'https://yapil.art',
    },
    'creator': {
      '@type': 'Person',
      'name': 'Яков Пилипюк',
    },
    'url': 'https://yapil.art/case/igorkochergin',
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
