import { formatTypography } from "@/lib/utils";

const services = [
  { name: "Дизайн сайта", price: "от 150 000 ₸" },
  { name: "Сайт на Tilda", price: "от 200 000 ₸" },
  { name: "Брендинг", price: "от 300 000 ₸" },
  { name: "Логотип", price: "от 120 000 ₸" },
  { name: "Полиграфия", price: "от 30 000 ₸" },
  {
    name: "Дизайн-поддержка",
    price: "от 100 000 ₸",
  },
];

export default function Services() {
  return (
    <section className="section">
      <span className="section-label">{formatTypography("Услуги")}</span>
      <ol className="service-list">
        {services.map((s, i) => (
          <li key={i} className="service-item">
            <span className="service-number">
              {String(i + 1).padStart(2, "0")}.
            </span>
            <span className="service-name">{formatTypography(s.name)}</span>
            <span className="service-price">{formatTypography(s.price)}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
