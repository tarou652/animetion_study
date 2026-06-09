import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  future: { compatibilityVersion: 4 },

  modules: ['@nuxt/content'],

  // GitHub Pages（プロジェクトページ）向け。
  // .nojekyll と 404.html を自動生成し、_nuxt/ が Jekyll に無視されるのを防ぐ。
  nitro: { preset: 'github_pages' },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  content: {
    build: {
      markdown: {
        highlight: {
          theme: 'github-dark',
          langs: ['css', 'html', 'js', 'ts', 'vue', 'bash'],
        },
      },
    },
  },

  app: {
    // ローカルは '/'、CI では NUXT_APP_BASE_URL=/animetion_study/ を渡す。
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      title: 'Animation Lab — Motion as Knowledge',
      htmlAttrs: { lang: 'ja' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'アニメーション技術を理解して使えるようになる学習・展覧サイト。',
        },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Noto+Sans+JP:wght@400;500;700&display=swap',
        },
      ],
    },
  },
})
