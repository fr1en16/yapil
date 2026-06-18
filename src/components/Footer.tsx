"use client";

import Link from "next/link";
import { HighlightHover } from "./HighlightHover";
import { formatTypography } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="site-footer">
      <HighlightHover
        as="a"
        href="https://t.me/yakov_pil"
        target="_blank"
        rel="noopener noreferrer"
        highlightColor="#FD4B32"
      >
        Telegram
      </HighlightHover>
      <HighlightHover
        as="a"
        href="https://wa.me/77088436197?text=%D0%9F%D1%80%D0%B8%D0%B2%D0%B5%D1%82%2C%20%D0%AF%D0%BA%D0%BE%D0%B2%21%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%BE%D0%B1%D1%81%D1%83%D0%B4%D0%B8%D1%82%D1%8C%20%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82."
        target="_blank"
        rel="noopener noreferrer"
        highlightColor="#FD4B32"
      >
        WhatsApp
      </HighlightHover>
      <HighlightHover
        as="a"
        href="mailto:hi@yapil.art"
        highlightColor="#FD4B32"
      >
        hi@yapil.art
      </HighlightHover>
      <HighlightHover
        as={Link}
        href="/privacy"
        highlightColor="#FD4B32"
      >
        {formatTypography("Конфиденциальность")}
      </HighlightHover>
      <span style={{ marginLeft: "auto", color: "var(--fg-muted)" }}>
        {formatTypography("© yapil.art")}
      </span>
    </footer>
  );
}

