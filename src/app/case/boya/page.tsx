"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";
import Clock from "@/components/Clock";
import { HighlightHover } from "@/components/HighlightHover";
import { formatTypography } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

function PdfReader({ url }: { url: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pdf, setPdf] = useState<any>(null);
  const [pageNum, setPageNum] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    let active = true;
    const loadPdf = async () => {
      try {
        if (!(window as any).pdfjsLib) {
          const script = document.createElement("script");
          script.src =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
          script.async = true;
          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }

        const pdfjsLib = (window as any).pdfjsLib;
        if (!pdfjsLib) throw new Error("pdfjsLib is not defined");
        pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

        const loadedPdf = await pdfjsLib.getDocument(url).promise;
        if (active) {
          setPdf(loadedPdf);
          setNumPages(loadedPdf.numPages);
          setLoading(false);
        }
      } catch (err: any) {
        console.error(err);
        if (active) {
          setError(
            "Не удалось загрузить PDF-файл. Пожалуйста, обновите страницу.",
          );
          setLoading(false);
        }
      }
    };

    loadPdf();

    return () => {
      active = false;
    };
  }, [url]);

  const renderPage = async (pageNumber: number) => {
    if (!pdf || !canvasRef.current) return;
    try {
      const page = await pdf.getPage(pageNumber);
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (!context) return;

      const containerWidth = containerRef.current?.clientWidth || 800;
      const viewport = page.getViewport({ scale: 1.0 });
      const scale = containerWidth / viewport.width;
      const scaledViewport = page.getViewport({ scale });

      const dpr = window.devicePixelRatio || 1;
      canvas.width = scaledViewport.width * dpr;
      canvas.height = scaledViewport.height * dpr;

      canvas.style.width = `${scaledViewport.width}px`;
      canvas.style.height = `${scaledViewport.height}px`;

      context.resetTransform();
      context.scale(dpr, dpr);

      const renderContext = {
        canvasContext: context,
        viewport: scaledViewport,
      };

      await page.render(renderContext).promise;
    } catch (err) {
      console.error("Error rendering page:", err);
    }
  };

  useEffect(() => {
    if (!pdf) return;

    renderPage(pageNum);

    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        renderPage(pageNum);
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [pdf, pageNum]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrev();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [pdf, pageNum, numPages]);

  const goToPrev = () => {
    setPageNum((prev) => Math.max(prev - 1, 1));
  };

  const goToNext = () => {
    setPageNum((prev) => Math.min(prev + 1, numPages || 1));
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "350px",
          border: "1px solid var(--border)",
          borderRadius: "4px",
          background: "var(--surface)",
          color: "var(--fg-muted)",
        }}
      >
        <Loader2
          className="animate-spin"
          size={32}
          style={{ marginBottom: "12px" }}
        />
        <span
          style={{
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          {formatTypography("Загрузка брендбука...")}
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "350px",
          border: "1px solid var(--border)",
          borderRadius: "4px",
          background: "var(--surface)",
          color: "var(--accent)",
          fontSize: "13px",
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
          borderRadius: "4px",
          overflow: "hidden",
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <canvas ref={canvasRef} style={{ display: "block" }} />

        {pageNum > 1 && (
          <button
            onClick={goToPrev}
            style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(4px)",
              border: "none",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.2s ease, background 0.2s ease",
              zIndex: 10,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(0,0,0,0.7)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(0,0,0,0.5)")
            }
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {pageNum < numPages && (
          <button
            onClick={goToNext}
            style={{
              position: "absolute",
              right: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(4px)",
              border: "none",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.2s ease, background 0.2s ease",
              zIndex: 10,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(0,0,0,0.7)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(0,0,0,0.5)")
            }
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginTop: "16px",
          padding: "0 4px",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            fontFamily: "monospace",
            color: "var(--fg)",
          }}
        >
          {pageNum} / {numPages}
        </span>
      </div>
    </div>
  );
}

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
            <PdfReader url="/case/Boya/brandbook.pdf" />
          </section>
        </div>
      </main>
    </>
  );
}
