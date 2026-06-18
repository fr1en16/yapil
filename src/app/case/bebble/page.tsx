"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";
import Clock from "@/components/Clock";
import { ImageZoom } from "@/components/ui/image-zoom";
import { HighlightHover } from "@/components/HighlightHover";
import { formatTypography } from "@/lib/utils";

export default function BebbleCase() {
  return (
    <>
      <ThemeToggle />

      <main
        style={{ position: "relative", zIndex: 2 }}
        aria-label="Кейс — Bebble"
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
                Bebble
              </h1>
              <HighlightHover
                as="a"
                href="https://bebble.kz/"
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
                bebble.kz
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
              {formatTypography("Сайт для бренда детской косметики")}
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
              src="/case/Bebble.webp"
              alt="Bebble — обложка кейса"
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
              {formatTypography("Разработка сайта для бренда детской косметики Bebble — это пример того, как сделать онлайн-витрину мягкой и понятной для родителей. Вместо сложного каталога мы разбили косметику по понятным сценариям: для купания, прогулок или смены подгузников. Дизайн выполнен в фирменных пастельных тонах и с обилием белого пространства, чтобы с первого экрана передать ощущение чистоты, заботы и безопасности. При этом сайт отлично решает бизнес-задачу: мы настроили удобный поиск магазинов по городам Казахстана, чтобы пользователь мог в пару кликов найти, где купить продукт. Получился легкий и дружелюбный интерфейс, который вызывает доверие у мам и пап и помогает бренду растить продажи.")}
            </p>
          </section>

          <hr className="divider" />

          {/* Screenshots Section */}
          <section className="section">
            <span className="section-label" style={{ marginBottom: "24px", lineHeight: 1.1 }}>
              {formatTypography("Макеты сайта")}
            </span>
            <div className="media-grid-wrapper">
              <div className="media-masonry-grid">
                {/* Column 1 */}
                <div className="media-masonry-column">
                  {[1, 4].map((num) => (
                    <div key={num} className="media-masonry-item">
                      <ImageZoom>
                        <Image
                          src={`/case/bebble/${num}.webp`}
                          alt={`Bebble — макет ${num}`}
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
                  {[2, 3].map((num) => (
                    <div key={num} className="media-masonry-item">
                      <ImageZoom>
                        <Image
                          src={`/case/bebble/${num}.webp`}
                          alt={`Bebble — макет ${num}`}
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
