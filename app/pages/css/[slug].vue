<script setup lang="ts">
import type { Component } from 'vue'

const route = useRoute()
const path = computed(() => `/css/${route.params.slug}`)

const { data: demo } = await useAsyncData(`css-${route.params.slug}`, () =>
  queryCollection('css').path(path.value).first(),
)

if (!demo.value) {
  throw createError({ statusCode: 404, statusMessage: 'Demo not found', fatal: true })
}

// 前後ナビ用に全件取得
const { data: all } = await useAsyncData('css-all-nav', () =>
  queryCollection('css').order('order', 'ASC').all(),
)

const navIndex = computed(() =>
  (all.value ?? []).findIndex((d) => d.path === path.value),
)
const prev = computed(() => all.value?.[navIndex.value - 1] ?? null)
const next = computed(() => all.value?.[navIndex.value + 1] ?? null)

// glob のファイルパス（例: ../../components/demos/css/KeyframesBasic.vue）を
// Nuxt 自動インポート名（例: DemosCssKeyframesBasic）へ変換する。
function toComponentName(filePath: string): string {
  return filePath
    .slice(filePath.indexOf('components/') + 'components/'.length)
    .replace(/\.vue$/, '')
    .split('/')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('')
}

// デモコンポーネント本体を import.meta.glob で静的に取り込む。
// resolveComponent(文字列) はデータ駆動だと Nuxt のバンドル対象から外れて
// 解決に失敗するため、glob でモジュールごと取り込んで名前で引く。
const demoModules = import.meta.glob('../../components/demos/**/*.vue', {
  eager: true,
  import: 'default',
}) as Record<string, Component>
const componentByName = Object.fromEntries(
  Object.entries(demoModules).map(([filePath, mod]) => [toComponentName(filePath), mod]),
)

const liveComponent = computed(() =>
  demo.value?.component ? (componentByName[demo.value.component] ?? null) : null,
)

useHead(() => ({
  title: demo.value ? `${demo.value.title} — Animation Lab` : 'Animation Lab',
}))
</script>

<template>
  <article v-if="demo" class="mx-auto max-w-4xl px-5 py-12">
    <!-- パンくず -->
    <NuxtLink
      to="/css"
      class="mb-8 inline-flex items-center gap-1.5 font-mono text-xs text-gray-500 transition-colors hover:text-[var(--color-accent-css)]"
    >
      <span aria-hidden="true">←</span> CSS セクション
    </NuxtLink>

    <!-- ① HERO -->
    <header class="border-b border-[var(--color-border)] pb-8">
      <div class="mb-3 flex flex-wrap items-center gap-2">
        <DifficultyBadge :level="demo.difficulty" />
        <TechTag v-for="tag in demo.tags" :key="tag" :label="tag" />
      </div>
      <h1 class="font-mono text-3xl font-bold text-white sm:text-4xl">{{ demo.title }}</h1>
      <p class="mt-3 text-lg leading-relaxed text-gray-400">{{ demo.description }}</p>
    </header>

    <!-- ③ LIVE DEMO（理論の前に「まず触る」を置く） -->
    <section class="py-10">
      <h2 class="mb-4 font-mono text-sm tracking-widest text-[var(--color-accent-css)]">
        ▸ LIVE DEMO
      </h2>
      <div class="glass-card p-6">
        <component :is="liveComponent" v-if="liveComponent" />
        <p v-else class="font-mono text-sm text-gray-500">デモコンポーネントが見つかりません。</p>
      </div>
    </section>

    <!-- ② 理論説明（レンダリングした Markdown 本文） -->
    <section class="prose-lab py-6">
      <ContentRenderer :value="demo" />
    </section>

    <!-- ④ TIPS -->
    <section v-if="demo.tips?.length" class="py-6">
      <h2 class="mb-4 font-mono text-sm tracking-widest text-[var(--color-accent-css)]">
        ▸ TIPS
      </h2>
      <ul class="glass-card flex flex-col gap-3 p-6">
        <li
          v-for="(tip, i) in demo.tips"
          :key="i"
          class="flex gap-3 text-sm leading-relaxed text-gray-300"
        >
          <span class="text-[var(--color-accent-css)]" aria-hidden="true">●</span>
          <span>{{ tip }}</span>
        </li>
      </ul>
    </section>

    <!-- 前後ナビ -->
    <nav class="mt-8 grid gap-4 border-t border-[var(--color-border)] pt-8 sm:grid-cols-2">
      <NuxtLink
        v-if="prev"
        :to="prev.path"
        class="glass-card group flex flex-col gap-1 p-5 transition-colors hover:border-[var(--color-accent-css)]/40"
      >
        <span class="font-mono text-xs text-gray-500">← 前のデモ</span>
        <span class="font-mono text-sm text-white group-hover:text-[var(--color-accent-css)]">{{
          prev.title
        }}</span>
      </NuxtLink>
      <span v-else />

      <NuxtLink
        v-if="next"
        :to="next.path"
        class="glass-card group flex flex-col items-end gap-1 p-5 text-right transition-colors hover:border-[var(--color-accent-css)]/40"
      >
        <span class="font-mono text-xs text-gray-500">次のデモ →</span>
        <span class="font-mono text-sm text-white group-hover:text-[var(--color-accent-css)]">{{
          next.title
        }}</span>
      </NuxtLink>
    </nav>
  </article>
</template>
