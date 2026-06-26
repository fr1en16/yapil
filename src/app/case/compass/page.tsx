"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";
import Clock from "@/components/Clock";
import { ImageZoom } from "@/components/ui/image-zoom";
import { HighlightHover } from "@/components/HighlightHover";
import LazyPdfReader from "@/components/LazyPdfReader";
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
        aria-label="Кейс — Compass"
      >
        <Clock />

        <div className="content-col">
          {/* Back link */}
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

          {/* Case Title */}
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
                Compass
              </h1>
              <HighlightHover
                as="a"
                href="https://compass.uz/"
                target="_blank"
                rel="noopener noreferrer"
                highlightColor="#FD4B32"
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "var(--fg-muted)",
                  textDecoration: "none",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.1,
                }}
              >
                compass.uz
              </HighlightHover>
            </div>
            <p
              style={{
                fontSize: "14px",
                color: "var(--fg-muted)",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              {formatTypography("консалтинговая компания #1 в Узбекистане")}
            </p>
          </section>

          {/* Cover image */}
          <div
            style={{
              width: "100%",
              position: "relative",
              marginBottom: "40px",
            }}
          >
            <Image
              src="/case/Compass.webp"
              alt="Compass — обложка кейса"
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

          {/* Description text */}
          <section className="section">
            <p className="case-description">
              {formatTypography("Разработка бренда и сайта для узбекистанской консалтинговой компании Compass — это пример того, как превратить сухую бизнес-аналитику в жесткую, работающую дизайн-систему. Проект создавался в тандеме: Софья Коломеец отвечала за смыслы бренда и копирайт, а я за дизайн сайта, визуальный стиль и верстку всех носителей. Вместо скучных шаблонов здесь правит геометрия, привязанная к названию и логике бизнеса. Логотип объединяет букву «С» и квадрат стабильности, а стрелка под углом 45 градусов задает вектор роста и метафору компаса, указывающего бизнесу верный путь. Айдентика строится на уникальных деталях: графический элемент из 7 линий и зеленые семиугольники для иконок отсылают к количеству букв в слове «compass». В итоге получился чистый B2B-интерфейс, который с первого экрана транслирует надежность, закрывает страхи крупных клиентов и наглядно подтверждает главный слоган компании: «Наш опыт — ваше лидерство».")}
            </p>
          </section>

          <hr className="divider" />

          {/* Video Showreel Block */}
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
                src="/case/compass/Compass шоурил.webm"
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

              {/* Audio controller overlay */}
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

          {/* PDF Brandbook Presentation Block */}
          <section className="section">
            <span className="section-label" style={{ marginBottom: "24px", lineHeight: 1.1 }}>
              {formatTypography("Брендбук проекта")}
            </span>
            <LazyPdfReader url="/case/compass/BRANDBOOK COMPASS.pdf" />
          </section>
        </div>
      </main>
    </>
  );
}
