import type { Metadata } from "next";

const title = "Я тут — Айдентика зоны отдыха в Алматы | Яков Пилипюк";
const description =
  "Разработка визуального знака для зоны отдыха «Я тут» в Алматы: домик, деревья и солнце в узнаваемой арочной композиции.";
const image = "https://yapil.art/case/%D0%AF%20%D1%82%D1%83%D1%82.webp";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://yapil.art/case/yatut",
    type: "article",
    images: [
      {
        url: image,
        width: 1920,
        height: 1080,
        alt: "Я тут — айдентика зоны отдыха в Алматы",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
  },
};

export default function YatutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "Я тут — Айдентика зоны отдыха в Алматы",
    description,
    image,
    author: {
      "@type": "Person",
      name: "Яков Пилипюк",
      url: "https://yapil.art",
    },
    creator: {
      "@type": "Person",
      name: "Яков Пилипюк",
    },
    url: "https://yapil.art/case/yatut",
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
