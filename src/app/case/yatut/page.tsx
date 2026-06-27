"use client";

import Image from "next/image";
import Link from "next/link";
import Clock from "@/components/Clock";
import { HighlightHover } from "@/components/HighlightHover";
import ThemeToggle from "@/components/ThemeToggle";
import { ImageZoom } from "@/components/ui/image-zoom";
import { formatTypography } from "@/lib/utils";

export default function YatutCase() {
  return (
    <>
      <ThemeToggle />

      <main
        style={{ position: "relative", zIndex: 2 }}
        aria-label="Кейс — Я тут"
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
            <h1
              style={{
                fontSize: "48px",
                fontWeight: 600,
                letterSpacing: "-0.06em",
                lineHeight: 1.1,
                color: "var(--fg)",
                marginBottom: "12px",
              }}
            >
              {formatTypography("Я тут")}
            </h1>
            <p
              style={{
                fontSize: "14px",
                color: "var(--fg-muted)",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              {formatTypography("зона отдыха в Алматы")}
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
              src="/case/Я тут.webp"
              alt="Я тут — обложка кейса"
              width={1920}
              height={1080}
              sizes="(max-width: 808px) calc(100vw - 48px), 50vw"
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
                "Визуальный знак объединяет в себе ключевые элементы загородного отдыха: уютный домик с круглой аркой входа, стилизованные зеленые деревья и теплое солнце, восходящее над ними. Вся композиция заключена в каноничную арочную форму, напоминающую окно в природу или купол палатки, а уверенный черный контур (stained-glass style) придает знаку графичность и современный индустриальный характер. Получился живой, гостеприимный и запоминающийся бренд-айкон, который идеально передает философию момента, полностью оправдывая свое название: ты отключаешься от суеты и понимаешь — «Я тут».",
              )}
            </p>
          </section>

          <hr className="divider" />

          <section className="section">
            <span
              className="section-label"
              style={{ marginBottom: "24px", lineHeight: 1.1 }}
            >
              {formatTypography("Визуальный знак")}
            </span>
            <ImageZoom>
              <Image
                src="/case/Я тут/yatut.webp"
                alt="Я тут — фирменный знак зоны отдыха"
                width={3000}
                height={2000}
                sizes="(max-width: 808px) calc(100vw - 48px), 50vw"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: "2px",
                }}
              />
            </ImageZoom>
          </section>
        </div>
      </main>
    </>
  );
}
