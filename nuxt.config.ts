// https://nuxt.com/docs/api/configuration/nuxt-config

// SEO defaults sourced from content/index.peninsula.yml
const SITE_URL = process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000";
const SITE_NAME = "Península Cross Cancún";
const SITE_BRAND = "Península Cross";
const SITE_DESCRIPTION_META =
  "Clases guiadas, comunidad y WODs variados. Horarios matutinos y vespertinos. Escribe por Instagram para tu clase de prueba.";
const SITE_DESCRIPTION_TEXT =
  "Súmate a Península y entrena con quienes nunca te dejan rendirte. Centro de entrenamiento funcional en SM 510, Cancún, Quintana Roo, México.";
const SITE_IMAGE = process.env.NUXT_PUBLIC_SITE_IMAGE || "/logo.jpg";
const SITE_OG_IMAGE = (() => {
  try {
    return new URL(SITE_IMAGE, SITE_URL).href;
  } catch {
    return SITE_IMAGE;
  }
})();

export default defineNuxtConfig({
  modules: [
    process.env.NODE_ENV !== "production" && "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxt/content",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
    "nuxt-aos",
  ].filter(Boolean) as string[],

  ssr: true,

  devtools: { enabled: false },

  app: {
    head: {
      htmlAttrs: { lang: "es" },
      titleTemplate: (titleChunk?: string) => {
        const base = SITE_BRAND;
        if (!titleChunk) return base;
        return `${titleChunk} – ${base}`;
      },
      title: SITE_NAME,
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, viewport-fit=cover",
        },
        {
          name: "format-detection",
          content: "telephone=no, address=no, email=no",
        },
        { name: "theme-color", content: "#ffffff" },
        { name: "description", content: SITE_DESCRIPTION_META },
        {
          name: "keywords",
          content:
            "CrossFit Cancún, entrenamiento funcional Cancún, gimnasio Cancún, WOD Cancún, box Cancún, Península Cross",
        },
        { name: "robots", content: "index,follow" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: SITE_NAME },
        {
          property: "og:title",
          content: "Península Cross Cancún | CrossFit en Cancún",
        },
        {
          property: "og:description",
          content:
            "Entrena con una comunidad que no te deja rendirte. Clase de prueba disponible.",
        },
        { property: "og:locale", content: "es_MX" },
        { property: "og:url", content: SITE_URL },
        { property: "og:image", content: SITE_OG_IMAGE },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "Península Cross Cancún | CrossFit en Cancún",
        },
        {
          name: "twitter:description",
          content: "Clases guiadas, comunidad y WODs variados.",
        },
        { name: "twitter:image", content: SITE_OG_IMAGE },
      ],
      link: [
        { rel: "canonical", href: SITE_URL },
        { rel: "icon", href: "/logo.ico" },
      ],
      script: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: SITE_BRAND,
            url: SITE_URL,
            logo: SITE_OG_IMAGE,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE_NAME,
            url: SITE_URL,
          }),
        },
      ],
    },
  },

  css: ["~/assets/css/main.css"],

  mdc: {
    highlight: { noApiRoute: false },
  },

  runtimeConfig: {
    public: {
      siteUrl: SITE_URL,
      siteName: SITE_NAME,
      siteDescription: SITE_DESCRIPTION_TEXT,
      siteImage: SITE_IMAGE,
    },
  },

  routeRules: {
    "/": {
      prerender: true,
      headers: {
        "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
    "/_nuxt/**": {
      headers: { "cache-control": "public, max-age=31536000, immutable" },
    },
    "/images/**": {
      headers: { "cache-control": "public, max-age=31536000, immutable" },
    },
    "/sitemap.xml": {
      headers: {
        "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
    "/robots.txt": {
      headers: {
        "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  },

  compatibilityDate: "2025-01-07",

  nitro: {
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true,
    },
  },

  vite: {
    build: {
      sourcemap: false,
      cssCodeSplit: true,
    },
  },

  aos: {
    disable: false,
    useClassNames: false,
    disableMutationObserver: false,
    debounceDelay: 10,
    throttleDelay: 99,
    offset: 200,
    delay: 0,
    duration: 400,
    once: true,
    mirror: false,
    anchorPlacement: "top-bottom",
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },

  image: {
    provider: "ipx",
    format: ["avif", "webp"],
    quality: 75,
    densities: [1, 2],
    screens: { xs: 320, sm: 640, md: 768, lg: 1024, xl: 1280, xxl: 1536 },
  },

  sitemap: {
    siteUrl: SITE_URL,
    autoLastmod: true,
    cacheMaxAge: 3600,
    defaults: { changefreq: "monthly", priority: 0.7 },
  },
  robots: {
    groups: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL.replace(/\/$/, "")}/sitemap.xml`,
  },
});
