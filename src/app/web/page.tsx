"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import Clock from "@/components/Clock";
import { HighlightHover } from "@/components/HighlightHover";
import { formatTypography } from "@/lib/utils";

/* ─── DATA ─── */

const webCases = [
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
    year: "2022–2024",
  },
  {
    title: "Compass",
    desc: "консалтинговая компания #1 в Узбекистане",
    image: "/case/Compass.webp",
    href: "/case/compass",
    service: "сайт, брендинг",
    year: "2022–2023",
  },
  {
    title: "Shanding",
    desc: "логистическая компания",
    image: "/case/shanding.webp",
    href: "/case/shanding",
    service: "лендинг, полиграфия",
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
    title: "Bebble",
    desc: "болгарский бренд детской косметики",
    image: "/case/bebble.webp",
    href: "/case/bebble",
    service: "сайт",
    year: "2022",
  },
  {
    title: "Compass Management",
    desc: "консалтинговая компания",
    image: "/case/compass management.webp",
    service: "сайт, брендинг",
    year: "2025–2026",
  },
  {
    title: "Томас Кралов",
    desc: "трейдер #1 в мире",
    image: "/case/Томас Красов.webp",
    service: "лендинг",
    year: "2025",
  },
  {
    title: "УАЗ",
    desc: "буханки на колесах и не только",
    image: "/case/uaz.webp",
    service: "сайт",
    year: "2025",
  },
  {
    title: "Business Cars",
    desc: "аренда и продажа премиальных китайских авто",
    image: "/case/Business cars.webp",
    service: "сайты",
    year: "2024–2025",
  },
  {
    title: "ТаксиКолеса",
    desc: "#1 партнер Yandex.Go в Казахстане",
    image: "/case/taxi kolesa.webp",
    service: "лендинги",
    year: "2023",
  },
  {
    title: "Rim Invest",
    desc: "финансовое сообщество",
    image: "/case/Rim Invest.webp",
    service: "лендинг",
    year: "2024",
  },
  {
    title: "Dodo Pizza // Hightower",
    desc: "ням-ням",
    image: "/case/Dodo Pizza.webp",
    service: "лендинг",
    year: "2023",
  },
  {
    title: "Kenfasad",
    desc: "фасады",
    image: "/case/Kenfasad.webp",
    service: "брендинг, сайт, полиграфия",
    year: "2022–2024",
  },
  {
    title: "Байзакова",
    desc: "блогер",
    image: "/case/Байзакова.webp",
    service: "лендинг",
    year: "2022",
  },
];

const sortedCases = [...webCases].sort((a, b) => {
  const aA = a.href ? 1 : 0;
  const bA = b.href ? 1 : 0;
  return bA - aA;
});

const webServices = [
  { name: "Дизайн сайта", price: "от 150 000 ₸" },
  { name: "Сайт на Tilda", price: "от 200 000 ₸" },
  { name: "Лендинг", price: "от 100 000 ₸" },
  { name: "Интернет-магазин", price: "от 350 000 ₸" },
  { name: "Поддержка сайта", price: "от 60 000 ₸ / мес" },
  { name: "Доработки и правки", price: "от 30 000 ₸" },
];

const principles = [
  {
    tag: "с нами комфортно",
    title: "Про чёткие договорённости",
    body: "Всегда знаем и называем реальные сроки — если сказали «будет готово 25 марта», значит 25 марта вы получите ссылку или файлы. Отвечаем быстро: в рабочее время в течение 15–40 минут, даже в выходные чаще всего онлайн по срочным вопросам.",
  },
  {
    tag: "вы — в центре внимания",
    title: "Про процесс и фокус на вас",
    body: "Мы берём не более двух проектов в месяц, чтобы сделать с полным погружением и отдачей. Каждый проект ведём сами: от идеи и концепции до финальной правки. Проверяем, шлифуем, не сдаём «лишь бы сдать».",
  },
  {
    tag: "дизайн с умом",
    title: "Не просто красиво",
    body: "Мы за простые, но сильные решения без визуального шума — сочетание эстетики и здравого смысла, креатива и строгости. Каждый элемент несёт смысл.",
  },
];

const faqs = [
  {
    q: "Есть ли поддержка проекта после сдачи?",
    a: "Да, конечно! После завершения работы мы всегда остаёмся на связи и помогаем клиентам с поддержкой сайта или помощью с типографией при необходимости. Можно также договориться о месячном ведении проекта за фиксированную плату.",
  },
  {
    q: "Если проект нужен «вчера»?",
    a: "В случае когда проект «нужен был еще вчера…» — стоимость может увеличиться до 50%.",
  },
  {
    q: "Вы помогаете с контентом?",
    a: "Да, мы можем помочь с написанием текста, подбором изображений или других материалов. Также мы работаем с нейросетями, поэтому можем сгенерировать уникальный контент на любую тему.",
  },
  {
    q: "Делаете ли сайты на коде?",
    a: "Для создания сайтов без использования конструкторов мы привлекаем проверенных разработчиков.",
  },
  {
    q: "Что не входит в стоимость?",
    a: "Подписка на платформу Tilda, хостинг, покупка и продление домена, покупка подписок на любые другие сторонние сервисы, которые вы планируете подключать, покупка дополнительных платных шрифтов, иконок, иллюстраций, фотографий и другого контента, оплата работ сторонних специалистов.",
  },
];

const SERVICES_OPTIONS = [
  "Дизайн сайта",
  "Сайт на Tilda",
  "Лендинг",
  "Интернет-магазин",
  "Поддержка сайта",
  "Доработки и правки",
  "Другое",
];

/* ─── CASES COMPONENT ─── */

function WebCases() {
  const [preview, setPreview] = useState<{ image: string } | null>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  const imgRef = useRef<HTMLImageElement | HTMLVideoElement | null>(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  const CARD_W = 320;
  const CARD_H = 180;
  const GAP = 20;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    let active = true;
    const tick = () => {
      if (!active) return;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.08;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.08;
      if (imgRef.current) {
        imgRef.current.style.left = `${currentPos.current.x}px`;
        imgRef.current.style.top = `${currentPos.current.y}px`;
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    return () => { active = false; };
  }, [visible]);

  const handleEnter = useCallback(
    (image: string, e: React.MouseEvent) => {
      setPreview({ image });
      let x = e.clientX - CARD_W / 2;
      let y = e.clientY - CARD_H - GAP;
      if (x + CARD_W > window.innerWidth - 12) x = window.innerWidth - CARD_W - 12;
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
    if (x + CARD_W > window.innerWidth - 12) x = window.innerWidth - CARD_W - 12;
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
      {mounted && preview && createPortal(
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
        <span className="section-label">{formatTypography("Кейсы и проекты")}</span>
        <div
          style={{
            fontSize: "13px",
            color: "var(--fg-muted)",
            marginBottom: "24px",
            marginTop: "-8px",
            letterSpacing: "-0.01em",
            lineHeight: 1.1,
          }}
        >
          {formatTypography("От идеи до готового бренда: подборка наших кейсов")}
        </div>
        <ul className="case-list">
          {sortedCases.map((c, i) => {
            const inner = (
              <>
                <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <div className="case-bullet-wrapper">
                    <svg
                      className="case-bullet-svg"
                      viewBox="0 0 40 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line
                        className="case-dash"
                        x1="0" y1="6" x2="12" y2="6"
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
                    <span className="case-title">{formatTypography(c.title)}</span>
                    <span className="case-desc">{formatTypography(c.desc)}</span>
                  </div>
                </div>
                <div className="case-tags">
                  <span className="case-tag-service">{formatTypography(c.service)}</span>
                  <span className="case-tag-year">{formatTypography(c.year)}</span>
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
                    style={{ position: "absolute", inset: 0, zIndex: 1 }}
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

/* ─── FAQ COMPONENT ─── */

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section">
      <span className="section-label">{formatTypography("Что важно знать?")}</span>
      <ul style={{ listStyle: "none" }}>
        {faqs.map((item, i) => {
          const isOpen = open === i;
          return (
            <li
              key={i}
              style={{
                borderBottom: "1px solid var(--border-light)",
              }}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: "16px",
                  width: "100%",
                  padding: "14px 0",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  color: "var(--fg)",
                  fontSize: "15px",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                  fontFamily: "inherit",
                  transition: "color 0.18s ease",
                }}
                aria-expanded={isOpen}
              >
                <span>{formatTypography(item.q)}</span>
                <span
                  style={{
                    flexShrink: 0,
                    fontSize: "18px",
                    fontWeight: 300,
                    color: "var(--fg-muted)",
                    transition: "transform 0.25s ease",
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    lineHeight: 1,
                    display: "inline-block",
                  }}
                >
                  +
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <p
                      style={{
                        fontSize: "14px",
                        color: "var(--fg-muted)",
                        lineHeight: 1.68,
                        letterSpacing: "-0.01em",
                        paddingBottom: "16px",
                      }}
                    >
                      {formatTypography(item.a)}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ─── CONTACT FORM ─── */

function WebContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [task, setTask] = useState("");
  const [consent, setConsent] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errors, setErrors] = useState({ name: false, phone: false, service: false, consent: false });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val) { setPhone(""); return; }
    let digits = val.replace(/\D/g, "");
    if (digits.startsWith("7") || digits.startsWith("8")) digits = digits.substring(1);
    digits = digits.substring(0, 10);
    let formatted = "+7";
    if (digits.length > 0) formatted += " " + digits.substring(0, 3);
    if (digits.length > 3) formatted += " " + digits.substring(3, 6);
    if (digits.length > 6) formatted += " " + digits.substring(6, 10);
    setPhone(formatted);
    if (digits.length === 10) setErrors((p) => ({ ...p, phone: false }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    const nameValid = name.trim().length > 0;
    const phoneValid = phone.replace(/\D/g, "").length === 11;
    const serviceValid = service.length > 0;
    const consentValid = consent;
    const newErrors = { name: !nameValid, phone: !phoneValid, service: !serviceValid, consent: !consentValid };
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;
    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, service, task }),
      });
      if (response.ok) setSuccess(true);
    } catch { /* ignore */ }
    finally { setSubmitting(false); }
  };

  const fieldLine = (field: string, hasError: boolean) => ({
    position: "absolute" as const,
    bottom: 0,
    left: 0,
    right: 0,
    height: "1px",
    backgroundColor: hasError
      ? "var(--accent)"
      : focusedField === field
      ? "var(--fg)"
      : "var(--border-light)",
    transition: "background-color 0.2s ease",
  });

  return (
    <section className="section">
      <span className="section-label">{formatTypography("Обсудить проект")}</span>
      <div
        style={{
          fontSize: "13px",
          color: "var(--fg-muted)",
          marginBottom: "32px",
          marginTop: "-8px",
          letterSpacing: "-0.01em",
          lineHeight: 1.1,
        }}
      >
        {formatTypography("меньше слов, больше дела")}
      </div>

      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              padding: "40px 0",
              fontSize: "15px",
              color: "var(--fg)",
              lineHeight: 1.68,
            }}
          >
            <div
              style={{
                fontSize: "24px",
                fontWeight: 600,
                letterSpacing: "-0.04em",
                marginBottom: "8px",
              }}
            >
              {formatTypography("Заявка отправлена")}
            </div>
            <div style={{ color: "var(--fg-muted)", fontSize: "14px" }}>
              {formatTypography("В течение суток мы пришлём точную смету с этапами работы.")}
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            noValidate
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "32px",
              opacity: submitting ? 0.6 : 1,
              pointerEvents: submitting ? "none" : undefined,
              transition: "opacity 0.2s ease",
            }}
          >
            {/* Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px 32px" }}>
              {/* Name */}
              <div style={{ position: "relative", paddingBottom: "4px" }}>
                <span
                  style={{
                    display: "block",
                    fontSize: "10.5px",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: "var(--fg-muted)",
                    marginBottom: "12px",
                    lineHeight: 1.1,
                  }}
                >
                  {formatTypography("Имя *")}
                </span>
                <input
                  type="text"
                  placeholder="Введите ваше имя"
                  value={name}
                  onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((p) => ({ ...p, name: false })); }}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    outline: "none",
                    padding: "8px 0",
                    fontSize: "15px",
                    fontFamily: "inherit",
                    color: "var(--fg)",
                    letterSpacing: "-0.02em",
                  }}
                />
                <div style={fieldLine("name", errors.name)} />
              </div>

              {/* Phone */}
              <div style={{ position: "relative", paddingBottom: "4px" }}>
                <span
                  style={{
                    display: "block",
                    fontSize: "10.5px",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: "var(--fg-muted)",
                    marginBottom: "12px",
                    lineHeight: 1.1,
                  }}
                >
                  {formatTypography("Телефон *")}
                </span>
                <input
                  type="tel"
                  placeholder="+7 XXX XXX XXXX"
                  value={phone}
                  onChange={handlePhoneChange}
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    outline: "none",
                    padding: "8px 0",
                    fontSize: "15px",
                    fontFamily: "inherit",
                    color: "var(--fg)",
                    letterSpacing: "-0.02em",
                  }}
                />
                <div style={fieldLine("phone", errors.phone)} />
              </div>
            </div>

            {/* Service */}
            <div style={{ position: "relative", paddingBottom: "4px" }}>
              <span
                style={{
                  display: "block",
                  fontSize: "10.5px",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: "var(--fg-muted)",
                  marginBottom: "12px",
                  lineHeight: 1.1,
                }}
              >
                {formatTypography("Услуга *")}
              </span>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  paddingBottom: "12px",
                }}
              >
                {SERVICES_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => { setService(opt); if (errors.service) setErrors((p) => ({ ...p, service: false })); }}
                    style={{
                      padding: "6px 12px",
                      fontSize: "12px",
                      fontFamily: "inherit",
                      fontWeight: 500,
                      letterSpacing: "-0.01em",
                      background: service === opt ? "var(--fg)" : "transparent",
                      color: service === opt ? "var(--bg)" : "var(--fg-muted)",
                      border: `1px solid ${service === opt ? "var(--fg)" : "var(--border-light)"}`,
                      borderRadius: "2px",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                      lineHeight: 1.1,
                    }}
                  >
                    {formatTypography(opt)}
                  </button>
                ))}
              </div>
              {errors.service && (
                <div
                  style={{
                    fontSize: "11px",
                    color: "var(--accent)",
                    letterSpacing: "0.04em",
                    marginTop: "4px",
                    lineHeight: 1.1,
                  }}
                >
                  Выберите услугу
                </div>
              )}
            </div>

            {/* Task */}
            <div style={{ position: "relative", paddingBottom: "4px" }}>
              <span
                style={{
                  display: "block",
                  fontSize: "10.5px",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: "var(--fg-muted)",
                  marginBottom: "12px",
                  lineHeight: 1.1,
                }}
              >
                {formatTypography("Расскажите о задаче")}
              </span>
              <textarea
                placeholder="Опишите проект, сроки, бюджет — всё, что считаете важным"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                onFocus={() => setFocusedField("task")}
                onBlur={() => setFocusedField(null)}
                rows={3}
                style={{
                  width: "100%",
                  background: "none",
                  border: "none",
                  borderBottom: `1px solid ${focusedField === "task" ? "var(--fg)" : "var(--border-light)"}`,
                  outline: "none",
                  padding: "8px 0",
                  fontSize: "15px",
                  fontFamily: "inherit",
                  color: "var(--fg)",
                  letterSpacing: "-0.02em",
                  resize: "none",
                  lineHeight: 1.68,
                  transition: "border-color 0.2s ease",
                }}
              />
            </div>

            {/* Consent + submit */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "24px",
                flexWrap: "wrap",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  cursor: "pointer",
                  flex: 1,
                }}
              >
                <div
                  onClick={() => { setConsent(!consent); if (errors.consent) setErrors((p) => ({ ...p, consent: false })); }}
                  style={{
                    width: "14px",
                    height: "14px",
                    flexShrink: 0,
                    border: `1px solid ${errors.consent ? "var(--accent)" : "var(--border)"}`,
                    borderRadius: "2px",
                    marginTop: "2px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    background: consent ? "var(--fg)" : "transparent",
                    transition: "all 0.15s ease",
                  }}
                >
                  {consent && (
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3L3 5L7 1" stroke="var(--bg)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span
                  style={{
                    fontSize: "12px",
                    color: "var(--fg-muted)",
                    lineHeight: 1.5,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {formatTypography("Нажимая на кнопку, вы соглашаетесь с условиями системы обработки данных и ")}{" "}
                  <Link
                    href="/privacy"
                    style={{
                      color: "var(--fg-muted)",
                      textDecoration: "underline",
                      textUnderlineOffset: "3px",
                    }}
                  >
                    политикой конфиденциальности
                  </Link>
                </span>
              </label>

              <button
                type="submit"
                disabled={submitting}
                style={{
                  padding: "12px 28px",
                  fontSize: "12px",
                  fontFamily: "inherit",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  background: "var(--fg)",
                  color: "var(--bg)",
                  border: "none",
                  borderRadius: "2px",
                  cursor: submitting ? "default" : "pointer",
                  transition: "opacity 0.15s ease",
                  lineHeight: 1.1,
                  whiteSpace: "nowrap",
                }}
              >
                {submitting ? formatTypography("Отправляем…") : formatTypography("Отправить заявку")}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─── PAGE ─── */

export default function WebPage() {
  return (
    <>
      <ThemeToggle />

      <main style={{ position: "relative", zIndex: 2 }} aria-label="WEB направление — thepeak.kz">
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
              {formatTypography("← Главная")}
            </HighlightHover>
          </div>

          <hr className="divider" />

          {/* ── ОБЛОЖКА ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "60vh",
              paddingTop: "40px",
              paddingBottom: "40px",
              justifyContent: "space-between",
            }}
          >
            {/* Cover image */}
            <div
              style={{
                width: "100%",
                position: "relative",
                flex: 1,
                minHeight: 0,
                marginBottom: "32px",
              }}
            >
              <Image
                src="/case/Игорь Кочергин.webp"
                alt="WEB направление — обложка"
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: "2px",
                  maxHeight: "40vh",
                  objectFit: "cover",
                }}
                priority
              />
            </div>

            {/* Header */}
            <div>
              <div className="header-top">
                <h1 className="site-name">WEB</h1>
                <p className="site-subtitle">{formatTypography("направление thepeak.kz")}</p>
              </div>
              <div className="header-divider" />
              <p className="site-bio">
                {formatTypography(
                  "Создаём сайты, которые построят прочную взаимосвязь между бизнесом и клиентом.",
                )}
              </p>
            </div>
          </div>

          <hr className="divider" />

          {/* ── ЦИФРЫ ── */}
          <section className="section">
            <span className="section-label">{formatTypography("В цифрах")}</span>
            <ul style={{ listStyle: "none" }}>
              {[
                {
                  num: "01",
                  heading: "Клиенты нас рекомендуют",
                  body: "к нам идут по советам тех, кто уже к нам обращался — это главный показатель того, что нам доверяют",
                },
                {
                  num: "02",
                  heading: "8+ лет",
                  body: "развиваемся в своём деле",
                },
                {
                  num: "03",
                  heading: "Более 100 проектов",
                  body: "точно понимаем специфику как маленького бизнеса, так и больших структур — и знаем, как решать задачи любого масштаба",
                },
              ].map((stat) => (
                <li
                  key={stat.num}
                  style={{
                    display: "flex",
                    gap: "16px",
                    alignItems: "flex-start",
                    padding: "16px 0",
                    borderBottom: "1px solid var(--border-light)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10.5px",
                      color: "var(--fg-muted)",
                      fontWeight: 400,
                      letterSpacing: "0.04em",
                      flexShrink: 0,
                      width: "18px",
                      lineHeight: 1.68,
                      paddingTop: "1px",
                    }}
                  >
                    {stat.num}
                  </span>
                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: "14px",
                        letterSpacing: "-0.02em",
                        lineHeight: 1.2,
                        marginBottom: "4px",
                        textTransform: "uppercase",
                      }}
                    >
                      {formatTypography(stat.heading)}
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "var(--fg-muted)",
                        lineHeight: 1.5,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {formatTypography(stat.body)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <hr className="divider" />

          {/* ── КЕЙСЫ ── */}
          <WebCases />

          <hr className="divider" />

          {/* ── УСЛУГИ ── */}
          <section className="section">
            <span className="section-label">{formatTypography("Услуги WEB")}</span>
            <ol className="service-list">
              {webServices.map((s, i) => (
                <li key={i} className="service-item">
                  <span className="service-number">{String(i + 1).padStart(2, "0")}.</span>
                  <span className="service-name">{formatTypography(s.name)}</span>
                  <span className="service-price">{formatTypography(s.price)}</span>
                </li>
              ))}
            </ol>
          </section>

          <hr className="divider" />

          {/* ── ГЛАВА WEB НАПРАВЛЕНИЯ ── */}
          <section className="section">
            <span className="section-label">{formatTypography("Глава WEB направления")}</span>
            <div
              style={{
                display: "flex",
                gap: "20px",
                alignItems: "flex-start",
              }}
            >
              {/* Photo */}
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  flexShrink: 0,
                  borderRadius: "2px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Image
                  src="/me.webp"
                  alt="Яков Пилипюк"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                />
              </div>

              {/* Text */}
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "15px",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                    marginBottom: "4px",
                  }}
                >
                  {formatTypography("Яков Пилипюк")}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "var(--fg-muted)",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.1,
                    marginBottom: "12px",
                  }}
                >
                  {formatTypography("Дизайнер, 8+ лет в профессии")}
                </div>
                <p
                  style={{
                    fontSize: "14px",
                    color: "var(--fg)",
                    lineHeight: 1.68,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {formatTypography(
                    "Мы запускаем проект только тогда, когда уверены в результате на 100%. Работаем так, чтобы вы рекомендовали нас коллегам. Сарафанное радио — наш главный маркер качества.",
                  )}
                </p>
              </div>
            </div>
          </section>

          <hr className="divider" />

          {/* ── ПРИНЦИПЫ В РАБОТЕ ── */}
          <section className="section">
            <span className="section-label">{formatTypography("Принципы в работе")}</span>
            <div
              style={{
                fontSize: "13px",
                color: "var(--fg-muted)",
                marginBottom: "24px",
                marginTop: "-8px",
                letterSpacing: "-0.01em",
                lineHeight: 1.5,
              }}
            >
              {formatTypography(
                "Дорожим каждым клиентом — за годы работы мы отточили простые, но важные принципы, и вот почему нас советуют и хотят возвращаться вновь.",
              )}
            </div>
            <ul style={{ listStyle: "none" }}>
              {principles.map((p, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    gap: "16px",
                    alignItems: "flex-start",
                    padding: "16px 0",
                    borderBottom:
                      i < principles.length - 1 ? "1px solid var(--border-light)" : "none",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10.5px",
                      color: "var(--fg-muted)",
                      fontWeight: 400,
                      letterSpacing: "0.04em",
                      flexShrink: 0,
                      width: "18px",
                      lineHeight: 1.68,
                      paddingTop: "1px",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "8px",
                        marginBottom: "4px",
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: 500,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--accent)",
                          lineHeight: 1.1,
                        }}
                      >
                        [{formatTypography(p.tag)}]
                      </span>
                      <span
                        style={{
                          fontWeight: 600,
                          fontSize: "14px",
                          letterSpacing: "-0.02em",
                          lineHeight: 1.2,
                          textTransform: "uppercase",
                        }}
                      >
                        {formatTypography(p.title)}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "var(--fg-muted)",
                        lineHeight: 1.68,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {formatTypography(p.body)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <hr className="divider" />

          {/* ── FAQ ── */}
          <FAQ />

          <hr className="divider" />

          {/* ── ФОРМА ── */}
          <WebContactForm />

        </div>
      </main>
    </>
  );
}
