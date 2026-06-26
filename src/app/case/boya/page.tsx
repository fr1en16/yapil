"use client";

import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";
import Clock from "@/components/Clock";
import { HighlightHover } from "@/components/HighlightHover";
import LazyPdfReader from "@/components/LazyPdfReader";
import { formatTypography } from "@/lib/utils";

export default function BoyaCase() {
  return (
    <>
      <ThemeToggle />

      <main
        style={{ position: "relative", zIndex: 2 }}
        aria-label="Кейс — Boya"
      >
        <Clock />

        <div className="content-col">
          <div style={{ paddingTop: "48px", paddingBottom: "24px" }}>
            <HighlightHover
              as={Link}
              href="/"
              highlightColor="#FD4B32"
              style={{
                fontSize: "10.5px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--fg-muted)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                lineHeight: 1.1,
              }}
            >
              {formatTypography("← Все проекты")}
            </HighlightHover>
          </div>

          <hr className="divider" />

          <section className="section" style={{ paddingBottom: "24px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                flexWrap: "wrap",
                gap: "16px",
                marginBottom: "12px",
              }}
            >
              <h1
                style={{
                  fontSize: "48px",
                  fontWeight: 600,
                  letterSpacing: "-0.06em",
                  lineHeight: 1.1,
                  color: "var(--fg)",
                  margin: 0,
                }}
              >
                Boya
              </h1>
            </div>
            <p
              style={{
                fontSize: "14px",
                color: "var(--fg-muted)",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              {formatTypography("лакокрасочные материалы")}
            </p>
          </section>

          <div
            style={{
              width: "100%",
              position: "relative",
              marginBottom: "40px",
            }}
          >
            <Image
              src="/case/Boya.webp"
              alt="Boya — обложка кейса"
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                borderRadius: "2px",
              }}
              priority
            />
          </div>

          <hr className="divider" />

          <section className="section">
            <p className="case-description" style={{ marginBottom: "24px" }}>
              {formatTypography(
                "Запуск лакокрасочного бренда Boya стал примером того, как слаженная командная работа позволяет вывести новую торговую марку на рынок абсолютно с нуля. В этом проекте мы работали в тесном тандеме с Софьей Коломеец, разделив стратегические задачи: Софья полностью взяла на себя аналитику, копирайт и смысловое наполнение концепции «Цвета Великой Степи», в то время как я отвечал за всю визуальную составляющую — от первых набросков логотипа до дизайна упаковки, верстки каталогов и финального интерфейса сайта.",
              )}
            </p>
            <p className="case-description" style={{ marginBottom: "24px" }}>
              {formatTypography(
                "Нам удалось полностью сломать стереотипы о скучной и консервативной строительной нише за счет смелой и живой айдентики. Фирменный стиль построен на уникальной текучей типографике, где буква «О» в логотипе мягко трансформируется в каплю, а основная палитра транслирует премиальность и силу через глубокие степные оттенки — блестящий пурпурно-синий, сапфировый и шафрановый. Главным динамическим элементом стали объемные радужные ленты, которые символизируют бесконечное разнообразие красок и эффектно работают на любых носителях брендинга.",
              )}
            </p>
            <p className="case-description">
              {formatTypography(
                "Весь этот сочный визуальный язык я перенес на технологичный сайт, сверстанный на чистом вариативном шрифте Inter. Огромный массив сложной технической информации, составы красок и товарные каталоги были разложены по строгой, интуитивно понятной пользователю модульной сетке. В результате наш тандем создал сильный B2B/B2C-бренд с национальной душой, который не просто выделился на фоне конкурентов в Казахстане, но и стал удобным коммерческим инструментом, стабильно конвертирующим визиты в реальные продажи.",
              )}
            </p>
          </section>

          <hr className="divider" />

          <section className="section">
            <span
              className="section-label"
              style={{ marginBottom: "24px", lineHeight: 1.1 }}
            >
              {formatTypography("Брендбук проекта")}
            </span>
            <LazyPdfReader url="/case/Boya/brandbook.pdf" />
          </section>
        </div>
      </main>
    </>
  );
}
