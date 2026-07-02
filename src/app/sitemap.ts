import type { MetadataRoute } from "next";

const baseUrl = "https://yapil.art";

const routes = [
  "",
  "/web",
  "/case/bebble",
  "/case/boya",
  "/case/compass",
  "/case/igorkochergin",
  "/case/rv",
  "/case/shanding",
  "/case/yatut",
  "/privacy",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: route === "" || route === "/web" ? "monthly" : "yearly",
    priority: route === "" ? 1 : route === "/web" ? 0.9 : 0.7,
  }));
}
