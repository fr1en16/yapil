import { MagicText } from "./MagicText";
import { formatTypography } from "@/lib/utils";

export default function Header() {
  return (
    <header>
      <div className="first-screen-container">
        <div className="photo-wrapper">
          <img src="/me.webp" alt="Яков Пилипюк" className="me-photo" />
        </div>
        <div className="header-top">
          <h1 className="site-name">{formatTypography("Яков Пилипюк")}</h1>
          <p className="site-subtitle">{formatTypography("Мультидисциплинарный дизайнер")}</p>
        </div>
        <div className="header-divider" />
      </div>
      <div className="section">
        <MagicText text={formatTypography("Уже 8 лет я превращаю сложные бизнес-задачи в точные визуальные системы, предлагая полный цикл разработки — от айдентики и полиграфии до сайтов любой сложности. В свои 25 лет я нахожусь в индустрии дизайна и веб-разработки с 2017 года, пройдя путь от стремных креативов для таргетированной рекламы до работы с высокобюджетными проектами. Как сооснователь и ключевой дизайнер агентства thepeak.kz, обеспечивал(ю) визуальную поддержку и разработку для крупнейших брендов, среди которых LUKOIL, Cadillac, PUMA, Dodo Pizza, FAW, УАЗ и Gippo. Моя глубокая экспертиза охватывает как сферу инфобизнеса, так и корпоративный сектор, позволяя мне грамотно курировать дизайн-процессы и создавать сильные бренды с нуля.")} />
      </div>
    </header>
  );
}
