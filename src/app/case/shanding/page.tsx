"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";
import Clock from "@/components/Clock";
import { HighlightHover } from "@/components/HighlightHover";
import { formatTypography } from "@/lib/utils";
import { Volume2, VolumeX } from "lucide-react";

export default function ShandingCase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = () => {
    if (videoRef.current) {
      const newMutedState = !videoRef.current.muted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  return (
    <>
      <ThemeToggle />

      <main
        style={{ position: "relative", zIndex: 2 }}
        aria-label="Кейс — Shanding"
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
                Shanding
              </h1>
              <HighlightHover
                as="a"
                href="https://shanding.kz/"
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
                shanding.kz
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
              {formatTypography("логистическая компания")}
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
              src="/case/Shanding.webp"
              alt="Shanding — обложка кейса"
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
            <p className="case-description">
              {formatTypography(
                "Лендинг — это пример того, как превратить сложную B2B-логистику в чистый и эффективный инструмент продаж. Мы полностью отказались от стоковых фото и бесконечного скролла: всю суть направлений (авиа, авто, ж/д) упаковали в быстрые интерактивные поп-апы, а специфику перевозок объяснили через лаконичные авторские иллюстрации. Чтобы на подсознании поднять уровень доверия крупных клиентов, за каждым ключевым блоком добавили фоновые подписи на китайском языке — это напрямую демонстрирует, что компания говорит на одном языке со своими партнерами и поставщиками. В итоге получился строгий индустриальный лендинг, где фирменная графика запоминается, фоновый китайский убеждает, а продуманный интерфейс экономит время пользователя и стабильно приносит бизнесу новые лиды.",
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
                src="/case/Shanding/Shanding.webm"
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
        </div>
      </main>
    </>
  );
}
