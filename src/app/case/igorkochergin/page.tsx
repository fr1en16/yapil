"use client";

import ThemeToggle from "@/components/ThemeToggle";
import Clock from "@/components/Clock";
import Image from "next/image";
import Link from "next/link";
import { HighlightHover } from "@/components/HighlightHover";
import { formatTypography } from "@/lib/utils";

export default function IgorKocherginCase() {
  return (
    <>
      <ThemeToggle />

      <main
        style={{ position: "relative", zIndex: 2 }}
        aria-label="Кейс — Игорь Кочергин"
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
              {formatTypography("Игорь Кочергин")}
            </h1>
            <p
              style={{
                fontSize: "14px",
                color: "var(--fg-muted)",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              {formatTypography("трейдер")}
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
              src="/case/Игорь Кочергин.webp"
              alt="Игорь Кочергин — обложка кейса"
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
              {formatTypography("Разработка премиального лендинга для программы менторства Игоря Кочергина ломает стереотипы крипто-ниши с ее хаотичным киберпанком, заменяя их монументальной эстетикой цифрового золота и строгой бизнес-логикой. Главная визуальная метафора сайта — маяк в штормящем океане рынка, свет которого выхватывает из темноты ключевые смыслы, лицо автора и уникальную 3D-графику (руку помощи, ключ, монеты), детально собранную из сияющих золотых частиц. Весь огромный объем информации, включая модули обучения и тарифы, упакован в жесткую сетку из закругленных карточек-контейнеров с тонким свечением и выверенной микро-типографикой, а реальные графики и результаты органично интегрированы в общую дизайн-систему. Такой подход превратил сайт в технологичную витрину закрытого клуба, где глубокий черный цвет транслирует элитарность, благородное матовое золото — материальную ценность продукта, а продуманный интерфейс уверенно ведет пользователя по воронке к покупке, полностью обосновывая высокий чек.")}
            </p>
          </section>

          <hr className="divider" />

          {/* Photo grid: 1.webp then 2.webp side by side */}
          <section className="section">
            <span className="section-label" style={{ marginBottom: "24px", lineHeight: 1.1 }}>
              {formatTypography("Макеты лендинга")}
            </span>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
                width: "100%",
              }}
            >
              <div style={{ width: "100%", position: "relative" }}>
                <Image
                  src="/case/igorkochergin/1.webp"
                  alt="Игорь Кочергин — лендинг, слайд 1"
                  width={0}
                  height={0}
                  sizes="50vw"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                  priority
                />
              </div>
              <div style={{ width: "100%", position: "relative" }}>
                <Image
                  src="/case/igorkochergin/2.webp"
                  alt="Игорь Кочергин — лендинг, слайд 2"
                  width={0}
                  height={0}
                  sizes="50vw"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                  priority
                />
              </div>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
