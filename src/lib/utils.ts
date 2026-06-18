import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTypography(text: string): string {
  if (!text) return "";
  return text
    // 1. Bind 1-2 letter words and some common 3-letter prepositions/conjunctions/pronouns
    // to the next word with a non-breaking space
    .replace(/(^|[\s()"[\]{}<>»«“„])([а-яА-ЯёЁa-zA-Z]{1,2}|для|под|над|при|про|как|так|все|кто|что|моя|мне|его|ней|вас|нас|тем|чем|без|или|еще|ещё|уже|она|они|был|были|быть)\s+/g, '$1$2\u00A0')
    // 2. Bind numbers to the next word (e.g., "8 лет" -> "8\u00A0лет")
    // and also check for numbers followed by units/words
    .replace(/(^|\s)(\d+)\s+/g, '$1$2\u00A0')
    // 3. Bind em-dash "—" to the preceding word (e.g. "разработки — от" -> "разработки\u00A0— от")
    .replace(/\s+(—|–)\s+/g, '\u00A0$1 ');
}
