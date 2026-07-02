import type { Metadata } from "next";

const title = "WEB-направление — сайты и digital-дизайн | Яков Пилипюк";
const description =
  "Разработка сайтов и digital-продуктов: дизайн, верстка и запуск под ключ. Кейсы, услуги и принципы работы WEB-направления.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/web",
  },
  openGraph: {
    title,
    description,
    url: "/web",
    type: "website",
    images: [
      {
        url: "/case/%D0%98%D0%B3%D0%BE%D1%80%D1%8C%20%D0%9A%D0%BE%D1%87%D0%B5%D1%80%D0%B3%D0%B8%D0%BD.webp",
        alt: "WEB-направление Якова Пилипюка",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/case/%D0%98%D0%B3%D0%BE%D1%80%D1%8C%20%D0%9A%D0%BE%D1%87%D0%B5%D1%80%D0%B3%D0%B8%D0%BD.webp"],
  },
};

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return children;
}
