"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";
import Clock from "@/components/Clock";
import { ImageZoom } from "@/components/ui/image-zoom";
import { HighlightHover } from "@/components/HighlightHover";
import { formatTypography } from "@/lib/utils";

import { Volume2, VolumeX } from "lucide-react";

export default function CompassCase() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = (e: React.MouseEvent) => {
    e.preventDefault();
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  return (
    <>
      <ThemeToggle />

      <main
        style={{ position: "relative", zIndex: 2 }}
        aria-label="Кейс — Рыкунов Кудряшов"
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
                {formatTypography("Рыкунов и Кудряшов")}
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
              {formatTypography("продюсеры")}
            </p>
          </section>

          <div
            style={{
              width: "100%",
              position: "relative",
              marginBottom: "40px",
            }}
          >
            <video
              src="/case/Рыкунов и Кудряшов.webm"
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                borderRadius: "2px",
              }}
            />
          </div>

          <hr className="divider" />

          <section className="section">
            <p className="case-description">
              {formatTypography(
                "Разработка лендинга для премиальной программы менторства Романа Рыкунова и Влада Кудряшова ломает привычные стереотипы инфобизнеса, превращая хаотичную «крипто-эстетику» в строгую и монументальную дизайн-систему. Визуальный образ сайта построен на глубоком черном цвете и благородном матовом золоте: главная метафора маяка в штормящем океане рынка выхватывает светом ключевые смыслы, лица авторов и эксклюзивную 3D-графику, детально прорисованную из сияющих пикселей. Огромный массив сложной информации — от разбора ошибок до интерактивного описания двенадцати модулей обучения и тарифных планов — четко структурирован с помощью аккуратной контейнерной сетки и выверенной микро-типографики, а реальные результаты и кейсы учеников органично интегрированы в общую стилистику интерфейса. Такой подход позволил упаковать образовательный продукт как технологичный закрытый клуб, где каждая деталь подчеркивает элитарность бренда, удерживает фокус внимания пользователя на протяжении всего скролла и полностью обосновывает высокий чек.",
              )}
            </p>
          </section>

          <hr className="divider" />

          <section className="section">
            <div
              onClick={toggleSound}
              style={{
                position: "relative",
                width: "100%",
                cursor: "pointer",
                borderRadius: "4px",
                overflow: "hidden",
                boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
              }}
              className="group/video"
            >
              <video
                ref={videoRef}
                src="/case/RV/RV.webm"
                autoPlay
                muted
                loop
                playsInline
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  bottom: "16px",
                  right: "16px",
                  background: "rgba(0, 0, 0, 0.6)",
                  backdropFilter: "blur(8px)",
                  color: "#fff",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "opacity 0.2s, transform 0.2s, background 0.2s",
                }}
                className="group-hover/video:bg-black/80"
              >
                {isMuted ? (
                  <VolumeX size={16} />
                ) : (
                  <Volume2 size={16} style={{ color: "#4ade80" }} />
                )}
              </div>
            </div>
          </section>

          <hr className="divider" />

          <section className="section">
            <span className="section-label" style={{ marginBottom: "24px", lineHeight: 1.1 }}>
              {formatTypography("Макеты сайта")}
            </span>
            <div className="media-grid-wrapper">
              <div className="media-masonry-grid">
                {/* Column 1 */}
                <div className="media-masonry-column">
                  {[1, 3, 5, 7].map((num) => (
                    <div key={num} className="media-masonry-item">
                      <ImageZoom>
                        <Image
                          src={`/case/RV/${num}.webp`}
                          alt={`Рыкунов и Кудряшов — макет ${num}`}
                          width={0}
                          height={0}
                          sizes="(max-width: 768px) 100vw, 50vw"
                          style={{
                            width: "100%",
                            height: "auto",
                            display: "block",
                            borderRadius: "2px",
                          }}
                        />
                      </ImageZoom>
                    </div>
                  ))}
                </div>

                {/* Column 2 */}
                <div className="media-masonry-column">
                  {[2, 4, 6].map((num) => (
                    <div key={num} className="media-masonry-item">
                      <ImageZoom>
                        <Image
                          src={`/case/RV/${num}.webp`}
                          alt={`Рыкунов и Кудряшов — макет ${num}`}
                          width={0}
                          height={0}
                          sizes="(max-width: 768px) 100vw, 50vw"
                          style={{
                            width: "100%",
                            height: "auto",
                            display: "block",
                            borderRadius: "2px",
                          }}
                        />
                      </ImageZoom>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
