"use client";

import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { HighlightHover } from "@/components/HighlightHover";
import { formatTypography } from "@/lib/utils";

export default function PrivacyPage() {
  return (
    <>
      {/* Theme toggle — fixed top-right */}
      <ThemeToggle />

      <div className="content-col pt-16 pb-12">
        {/* Back Link */}
        <div style={{ paddingTop: "24px", paddingBottom: "24px" }}>
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
            {formatTypography("← На главную")}
          </HighlightHover>
        </div>

        <hr className="divider mb-8" />

        <article className="prose dark:prose-invert max-w-none text-[15px] leading-relaxed tracking-tight text-[var(--fg)] flex flex-col gap-6">
          <h1 className="text-2xl font-semibold tracking-tight">{formatTypography("Политика конфиденциальности")}</h1>
          
          <p className="text-[var(--fg-muted)] text-[10.5px] uppercase tracking-wider">
            {formatTypography("Последнее обновление: 19 июня 2026 г.")}
          </p>

          <p>
            {formatTypography("Настоящая Политика конфиденциальности описывает, как индивидуальный предприниматель")} <strong>{formatTypography("ИП «PEAK»")}</strong> {formatTypography("в лице")} <strong>{formatTypography("Пилипюка Якова Владимировича")}</strong> {formatTypography("(ИИН 001130550960) собирает, использует и защищает информацию, которую вы предоставляете при использовании веб-сайта")} <a href="https://yapil.art" className="text-[var(--accent)] hover:underline">yapil.art</a>.
          </p>

          <div>
            <h2 className="text-base font-semibold uppercase tracking-wider text-[var(--fg-muted)] text-[10.5px] mb-2">{formatTypography("1. Собираемые данные")}</h2>
            <p className="mb-2">{formatTypography("Мы собираем только те данные, которые вы добровольно предоставляете через форму обратной связи на сайте:")}</p>
            <ul className="list-disc list-inside pl-4 flex flex-col gap-1">
              <li>{formatTypography("Ваше имя;")}</li>
              <li>{formatTypography("Номер телефона;")}</li>
              <li>{formatTypography("Вид интересующей вас услуги;")}</li>
              <li>{formatTypography("Описание вашей задачи (если предоставлено).")}</li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-semibold uppercase tracking-wider text-[var(--fg-muted)] text-[10.5px] mb-2">{formatTypography("2. Цели сбора данных")}</h2>
            <p className="mb-2">{formatTypography("Ваши персональные данные используются исключительно для следующих целей:")}</p>
            <ul className="list-disc list-inside pl-4 flex flex-col gap-1">
              <li>{formatTypography("Обратная связь и обсуждение деталей проекта;")}</li>
              <li>{formatTypography("Подготовка коммерческого предложения;")}</li>
              <li>{formatTypography("Оказание услуг по разработке дизайна, веб-сайтов и брендингу.")}</li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-semibold uppercase tracking-wider text-[var(--fg-muted)] text-[10.5px] mb-2">{formatTypography("3. Защита и хранение данных")}</h2>
            <p>
              {formatTypography("Мы принимаем необходимые технические и организационные меры безопасности для защиты ваших персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения. Ваши данные не передаются третьим лицам, за исключением случаев, предусмотренных законодательством Республики Казахстан.")}
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold uppercase tracking-wider text-[var(--fg-muted)] text-[10.5px] mb-2">{formatTypography("4. Согласие на обработку данных")}</h2>
            <p>
              {formatTypography("Отправляя форму заказа на сайте, вы подтверждаете свое согласие на обработку ваших персональных данных в соответствии с Законом Республики Казахстан от 21 мая 2013 года № 94-V «О персональных данных и их защите».")}
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold uppercase tracking-wider text-[var(--fg-muted)] text-[10.5px] mb-2">{formatTypography("5. Контакты и реквизиты")}</h2>
            <p className="mb-4">{formatTypography("По всем вопросам, связанным с обработкой или удалением ваших данных, вы можете связаться напрямую:")}</p>
            <div className="bg-[var(--surface)] border border-[var(--border)] p-5 rounded-[2px] flex flex-col gap-2 transition-colors duration-300">
              <p className="font-semibold text-base">{formatTypography("ИП «PEAK»")}</p>
              <p><span className="text-[var(--fg-muted)] text-[12px]">{formatTypography("Владелец:")}</span> {formatTypography("Пилипюк Яков Владимирович")}</p>
              <p><span className="text-[var(--fg-muted)] text-[12px]">{formatTypography("ИИН:")}</span> {formatTypography("001130550960")}</p>
              <p><span className="text-[var(--fg-muted)] text-[12px]">{formatTypography("Email:")}</span> <a href="mailto:hi@yapil.art" className="text-[var(--accent)] hover:underline">hi@yapil.art</a></p>
              <p><span className="text-[var(--fg-muted)] text-[12px]">{formatTypography("Telegram:")}</span> <a href="https://t.me/yakov_pil" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">@yakov_pil</a></p>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
