import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  modules: ['@nuxt/content'],

  vite: {
    plugins: [tailwindcss()],
  },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'Animation Lab',
      meta: [
        { name: 'description', content: 'Motion as Knowledge — アニメーション技術の展覧・学習サイト' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Space+Mono:wght@400;700&family=Noto+Sans+JP:wght@400;500;700&display=swap',
        },
      ],
    },
  },

  content: {
    highlight: {
      theme: 'vitesse-dark',
      langs: ['html', 'css', 'javascript', 'typescript', 'vue'],
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
    },
  },
})
