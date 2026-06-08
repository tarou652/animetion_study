<script setup lang="ts">
const { data: demos } = await useAsyncData('css-demos', () =>
  queryCollection('css').order('order', 'ASC').all(),
)

const activeDifficulty = ref<'all' | 'beginner' | 'intermediate' | 'advanced'>('all')
const activeTag = ref<string>('all')

const difficulties = ['all', 'beginner', 'intermediate', 'advanced'] as const

const allTags = computed(() => {
  const set = new Set<string>()
  demos.value?.forEach((d) => d.tags?.forEach((t: string) => set.add(t)))
  return ['all', ...Array.from(set)]
})

const filtered = computed(() => {
  return (demos.value ?? []).filter((d) => {
    const okDiff =
      activeDifficulty.value === 'all' || d.difficulty === activeDifficulty.value
    const okTag = activeTag.value === 'all' || d.tags?.includes(activeTag.value)
    return okDiff && okTag
  })
})
</script>

<template>
  <div class="mx-auto max-w-6xl px-5 py-12">
    <!-- 技術概要パネル -->
    <section class="glass-card mb-10 overflow-hidden p-8">
      <div class="flex items-center gap-3">
        <span class="h-3 w-3 rounded-full bg-[var(--color-accent-css)]" />
        <span class="font-mono text-sm tracking-widest text-[var(--color-accent-css)]"
          >CSS ANIMATION & TRANSITION</span
        >
      </div>
      <h1 class="mt-4 font-mono text-3xl font-bold text-white sm:text-4xl">
        Pure CSS で動かす
      </h1>
      <p class="mt-4 max-w-2xl leading-relaxed text-gray-400">
        JavaScript を使わずに、ブラウザのレンダリングエンジンだけで動くアニメーション。
        <code class="font-mono text-[var(--color-accent-css)]">@keyframes</code> の自走、
        <code class="font-mono text-[var(--color-accent-css)]">transition</code> による状態補間、
        <code class="font-mono text-[var(--color-accent-css)]">transform</code> での変形を、
        実際に触りながら理解します。
      </p>
    </section>

    <!-- フィルター -->
    <section class="mb-8 flex flex-col gap-4">
      <div class="flex flex-wrap items-center gap-2">
        <span class="mr-1 font-mono text-xs text-gray-500">難易度</span>
        <button
          v-for="d in difficulties"
          :key="d"
          class="rounded-full border px-3 py-1 font-mono text-xs capitalize transition-colors"
          :class="
            activeDifficulty === d
              ? 'border-[var(--color-accent-css)] bg-[var(--color-accent-css)]/15 text-[var(--color-accent-css)]'
              : 'border-[var(--color-border)] text-gray-400 hover:text-white'
          "
          @click="activeDifficulty = d"
        >
          {{ d }}
        </button>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <span class="mr-1 font-mono text-xs text-gray-500">タグ</span>
        <button
          v-for="t in allTags"
          :key="t"
          class="rounded-full border px-3 py-1 font-mono text-xs transition-colors"
          :class="
            activeTag === t
              ? 'border-[var(--color-accent-css)] bg-[var(--color-accent-css)]/15 text-[var(--color-accent-css)]'
              : 'border-[var(--color-border)] text-gray-400 hover:text-white'
          "
          @click="activeTag = t"
        >
          {{ t }}
        </button>
      </div>
    </section>

    <!-- デモグリッド -->
    <section>
      <div v-if="filtered.length" class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimationCard
          v-for="demo in filtered"
          :key="demo.path"
          :demo="{
            path: demo.path,
            title: demo.title,
            description: demo.description,
            difficulty: demo.difficulty,
            tags: demo.tags,
            component: demo.component,
          }"
        />
      </div>
      <p v-else class="py-16 text-center font-mono text-sm text-gray-500">
        条件に合うデモがありません。
      </p>
    </section>
  </div>
</template>
