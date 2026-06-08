<script setup lang="ts">
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

const liveComponent = computed(() =>
  demo.value?.component ? resolveComponent(demo.value.component) : null,
)

// コードタブ
const codeTabs = computed(() => {
  const code = demo.value?.code ?? {}
  return (['html', 'css', 'js'] as const)
    .filter((k) => code[k])
    .map((k) => ({ key: k, label: k.toUpperCase(), content: code[k] as string }))
})
const activeTab = ref<'html' | 'css' | 'js'>('css')
watchEffect(() => {
  if (codeTabs.value.length && !codeTabs.value.some((t) => t.key === activeTab.value)) {
    activeTab.value = codeTabs.value[0]!.key
  }
})

// コピー
const copied = ref(false)
async function copyCode() {
  const current = codeTabs.value.find((t) => t.key === activeTab.value)
  if (!current) return
  try {
    await navigator.clipboard.writeText(current.content)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch {
    /* clipboard 非対応環境は無視 */
  }
}

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

    <!-- ④ CODE -->
    <section v-if="codeTabs.length" class="py-10">
      <h2 class="mb-4 font-mono text-sm tracking-widest text-[var(--color-accent-css)]">
        ▸ CODE
      </h2>
      <div class="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[#0d1117]">
        <div class="flex items-center justify-between border-b border-[var(--color-border)] px-4">
          <div class="flex">
            <button
              v-for="tab in codeTabs"
              :key="tab.key"
              class="border-b-2 px-4 py-2.5 font-mono text-xs transition-colors"
              :class="
                activeTab === tab.key
                  ? 'border-[var(--color-accent-css)] text-[var(--color-accent-css)]'
                  : 'border-transparent text-gray-500 hover:text-gray-300'
              "
              @click="activeTab = tab.key"
            >
              {{ tab.label }}
            </button>
          </div>
          <button
            class="rounded-md px-3 py-1 font-mono text-xs text-gray-400 transition-colors hover:text-white"
            @click="copyCode"
          >
            {{ copied ? '✓ Copied' : 'Copy' }}
          </button>
        </div>
        <pre
          v-for="tab in codeTabs"
          v-show="activeTab === tab.key"
          :key="tab.key"
          class="overflow-x-auto p-5 font-mono text-[0.8rem] leading-relaxed text-gray-200"
        ><code>{{ tab.content.trimEnd() }}</code></pre>
      </div>
    </section>

    <!-- ⑤ TIPS -->
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
