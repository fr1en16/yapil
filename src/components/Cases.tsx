"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { formatTypography } from "@/lib/utils";

interface CaseItem {
  title: string;
  desc: string;
  image: string;
  href?: string;
  service: string;
  year: string;
}

const cases: CaseItem[] = [
  {
    title: "Игорь Кочергин",
    desc: "трейдер",
    image: "/case/Игорь Кочергин.webp",
    href: "/case/igorkochergin",
    service: "лендинг",
    year: "2025",
  },
  {
    title: "Boya",
    desc: "лакокрасочные материалы",
    image: "/case/Boya.webp",
    href: "/case/boya",
    service: "сайт, брендинг",
    year: "2022-2024",
  },
  {
    title: "Compass",
    desc: "консалтинговая компания #1 в Узбекистане",
    image: "/case/Compass.webp",
    href: "/case/compass",
    service: "сайт, брендинг",
    year: "2022-2023",
  },
  {
    title: "Compass Management",
    desc: "консалтинговая компания",
    image: "/case/Compass Management.webp",
    service: "сайт, брендинг",
    year: "2025-2026",
  },
  {
    title: "Shanding",
    desc: "логистическая компания",
    image: "/case/Shanding.webp",
    href: "/case/shanding",
    service: "лендинг, полиграфия",
    year: "2024",
  },
  {
    title: "Я тут",
    desc: "зона отдыха в Алматы",
    image: "/case/Я тут.webp",
    href: "/case/yatut",
    service: "логотип, поддержка",
    year: "2024",
  },
  {
    title: "Рыкунов и Кудряшов",
    desc: "продюсеры",
    image: "/case/Рыкунов и Кудряшов.webm",
    href: "/case/rv",
    service: "лендинг",
    year: "2023",
  },
  {
    title: "Томас Кралов",
    desc: "трейдер #1 в мире",
    image: "/case/Томас Красов.webp",
    service: "лендинг",
    year: "2025",
  },
  {
    title: "Дарья Донскова // UGC CREATOR",
    desc: "блогер",
    image: "/case/UGC CREATOR.webp",
    service: "лендинг",
    year: "2023",
  },
  {
    title: "Байзакова",
    desc: "блогер",
    image: "/case/Байзакова.webp",
    service: "лендинг",
    year: "2022",
  },
  {
    title: "Dodo Pizza // Hightower",
    desc: "ням-ням",
    image: "/case/Dodo Pizza.webp",
    service: "лендинг",
    year: "2023",
  },
  {
    title: "УАЗ",
    desc: "буханки на колесах и не только",
    image: "/case/Уаз.webp",
    service: "сайт",
    year: "2025",
  },
  {
    title: "Gippo",
    desc: "первый стрит-фуд в Казахстане",
    image: "/case/Gippo.webp",
    service: "поддержка, полиграфия",
    year: "2024-2026",
  },
  {
    title: "ONmacabim",
    desc: "профессиональная уходовая израильская косметика",
    image: "/case/ONmacabim.webp",
    service: "поддержка, полиграфия",
    year: "2025",
  },
  {
    title: "Takara Sushi Bar",
    desc: "суши бар",
    image: "/case/Takara Sushi Bar.webp",
    service: "поддержка, полиграфия",
    year: "2024-2025",
  },
  {
    title: "Puma Kazakhstan",
    desc: "в представлении не нуждается",
    image: "/case/Puma.webp",
    service: "поддержка",
    year: "2025",
  },
  {
    title: "BrewBox",
    desc: "mvp пивного проекта",
    image: "/case/BrewBox.webp",
    service: "упаковка инсты, упаковка",
    year: "2023",
  },
  {
    title: "Kenfasad",
    desc: "фасады",
    image: "/case/Kenfasad.webp",
    service: "брендинг, сайт, полиграфия",
    year: "2022-2024",
  },
  {
    title: "ТаксиКолеса",
    desc: "#1 партнер yandex.go в Казахстане",
    image: "/case/ТаксиКолеса.webp",
    service: "лендинги",
    year: "2023",
  },
  {
    title: "Business Cars",
    desc: "аренда и продажа премиальных китайских авто",
    image: "/case/Business cars.webp",
    service: "сайты",
    year: "2024-2025",
  },
  {
    title: "Bebble",
    desc: "болгарский бренд детской косметики",
    image: "/case/Bebble.webp",
    href: "/case/bebble",
    service: "сайт",
    year: "2022",
  },
  {
    title: "Rim Invest",
    desc: "финансовое сообщество",
    image: "/case/Rim Invest.webp",
    service: "лендинг",
    year: "2024",
  },
  {
    title: "Kirpi",
    desc: "модный бренд",
    image: "/case/kirpi.webp",
    service: "интернет магазин",
    year: "2022",
  },
];

// Sort cases: active projects (with href) first, preserving relative order
const sortedCases = [...cases].sort((a, b) => {
  const aActive = a.href ? 1 : 0;
  const bActive = b.href ? 1 : 0;
  return bActive - aActive;
});

export default function Cases() {
  const [preview, setPreview] = useState<{ image: string } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const [visible, setVisible] = useState(false);

  const imgRef = useRef<HTMLImageElement | HTMLVideoElement | null>(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  const CARD_W = 320;
  const CARD_H = 180;
  const GAP = 20;

  useEffect(() => {
    if (!visible) return;

    let active = true;
    const tick = () => {
      if (!active) return;

      currentPos.current.x +=
        (targetPos.current.x - currentPos.current.x) * 0.08;
      currentPos.current.y +=
        (targetPos.current.y - currentPos.current.y) * 0.08;

      if (imgRef.current) {
        imgRef.current.style.left = `${currentPos.current.x}px`;
        imgRef.current.style.top = `${currentPos.current.y}px`;
      }

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    return () => {
      active = false;
    };
  }, [visible]);

  const handleEnter = useCallback(
    (image: string, e: React.MouseEvent) => {
      setPreview({ image });

      let x = e.clientX - CARD_W / 2;
      let y = e.clientY - CARD_H - GAP;

      if (x + CARD_W > window.innerWidth - 12)
        x = window.innerWidth - CARD_W - 12;
      if (x < 12) x = 12;
      if (y < 12) y = e.clientY + GAP;

      targetPos.current = { x, y };

      if (!visible) {
        currentPos.current = { x, y };
        if (imgRef.current) {
          imgRef.current.style.left = `${x}px`;
          imgRef.current.style.top = `${y}px`;
        }
      }
      setVisible(true);
    },
    [visible],
  );

  const handleMove = useCallback((e: React.MouseEvent) => {
    let x = e.clientX - CARD_W / 2;
    let y = e.clientY - CARD_H - GAP;

    if (x + CARD_W > window.innerWidth - 12)
      x = window.innerWidth - CARD_W - 12;
    if (x < 12) x = 12;
    if (y < 12) y = e.clientY + GAP;

    targetPos.current = { x, y };
  }, []);

  const handleLeave = useCallback(() => {
    setVisible(false);
  }, []);

  const isVideo = preview && /\.(webm|mp4)$/i.test(preview.image);

  return (
    <>
      {mounted &&
        preview &&
        createPortal(
          isVideo ? (
            <video
              ref={imgRef as React.RefObject<HTMLVideoElement | null>}
              src={preview.image}
              autoPlay
              loop
              muted
              playsInline
              className="case-preview-img"
              style={{
                width: `${CARD_W}px`,
                height: `${CARD_H}px`,
                objectFit: "cover",
                opacity: visible ? 1 : 0,
                transform: visible
                  ? "translateY(0) scale(1) rotate(0deg)"
                  : "translateY(15px) scale(0.92) rotate(-2deg)",
              }}
            />
          ) : (
            <img
              ref={imgRef as React.RefObject<HTMLImageElement | null>}
              src={preview.image}
              alt=""
              aria-hidden="true"
              className="case-preview-img"
              style={{
                width: `${CARD_W}px`,
                height: `${CARD_H}px`,
                objectFit: "cover",
                opacity: visible ? 1 : 0,
                transform: visible
                  ? "translateY(0) scale(1) rotate(0deg)"
                  : "translateY(15px) scale(0.92) rotate(-2deg)",
              }}
            />
          ),
          document.body,
        )}

      <section className="section">
        <span className="section-label">
          {formatTypography("Кейсы и проекты")}
        </span>
        <ul className="case-list">
          {sortedCases.map((c, i) => {
            const inner = (
              <>
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                  }}
                >
                  <div className="case-bullet-wrapper">
                    <svg
                      className="case-bullet-svg"
                      viewBox="0 0 40 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line
                        className="case-dash"
                        x1="0"
                        y1="6"
                        x2="12"
                        y2="6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        className="case-arrow-path"
                        d="M 0 6 L 36 6 M 30 2 L 36 6 L 30 10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="case-info">
                    <span className="case-title">
                      {formatTypography(c.title)}
                    </span>
                    <span className="case-desc">
                      {formatTypography(c.desc)}
                    </span>
                  </div>
                </div>

                <div className="case-tags">
                  <span className="case-tag-service">
                    {formatTypography(c.service)}
                  </span>
                  <span className="case-tag-year">
                    {formatTypography(c.year)}
                  </span>
                </div>
              </>
            );
            return (
              <li
                key={i}
                className={`case-item ${!c.href ? "is-inactive" : ""}`}
                style={c.href ? { position: "relative" } : undefined}
                onMouseEnter={(e) => handleEnter(c.image, e)}
                onMouseMove={handleMove}
                onMouseLeave={handleLeave}
              >
                {c.href && (
                  <Link
                    href={c.href}
                    aria-label={c.title}
                    style={{
                      position: "absolute",
                      inset: 0,
                      zIndex: 1,
                    }}
                  />
                )}
                {inner}
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
