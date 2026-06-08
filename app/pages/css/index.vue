<script setup lang="ts">
useHead({ title: 'CSS Animation — Animation Lab' })

const { data: demos } = await useAsyncData('css-demos', () =>
  queryCollection('css').order('order', 'ASC').all()
)

const activeFilter = ref<string>('all')
const activeDifficulty = ref<string>('all')

const allTags = computed(() => {
  const tags = new Set<string>()
  demos.value?.forEach(d => d.tags?.forEach((t: string) => tags.add(t)))
  return ['all', ...Array.from(tags)]
})

const filtered = computed(() => {
  return demos.value?.filter(d => {
    const tagMatch = activeFilter.value === 'all' || d.tags?.includes(activeFilter.value)
    const diffMatch = activeDifficulty.value === 'all' || d.difficulty === activeDifficulty.value
    return tagMatch && diffMatch
  }) ?? []
})
</script>

<template>
  <div>
    <!-- Section Hero -->
    <section class="px-6 py-16 border-b" style="border-color: rgba(255,255,255,0.06);">
      <div class="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 items-start">
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-4">
            <span class="text-xs font-mono px-2 py-0.5 rounded" style="background: rgba(0,212,255,0.1); color: #00d4ff; border: 1px solid rgba(0,212,255,0.2);">CSS</span>
            <span class="text-xs font-mono" style="color: #555577;">Animation &amp; Transition</span>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold mb-4 tracking-tight" style="font-family: 'JetBrains Mono', monospace; color: #f0f0f8;">
            CSS Animation
          </h1>
          <p class="text-base md:text-lg leading-relaxed" style="color: #8888aa; font-family: 'Noto Sans JP', sans-serif; max-width: 42ch;">
            Pure CSSだけで実現できるアニメーションの全技術。<code style="color: #00d4ff; font-family: 'JetBrains Mono', monospace; font-size: 0.85em;">@keyframes</code> からスクロール連動まで、基礎から応用を体系的に習得する。
          </p>
        </div>
        <div class="flex-shrink-0 glass-card rounded-2xl p-6 w-full md:w-64">
          <div class="text-3xl font-bold font-mono mb-1" style="color: #00d4ff;">{{ demos?.length ?? 0 }}</div>
          <div class="text-sm mb-4" style="color: #8888aa;">デモ収録</div>
          <div class="space-y-2">
            <div v-for="level in ['beginner', 'intermediate', 'advanced']" :key="level" class="flex items-center justify-between text-xs">
              <DifficultyBadge :level="level" size="sm" />
              <span style="color: #555577;">{{ demos?.filter(d => d.difficulty === level).length ?? 0 }}本</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Filters -->
    <section class="px-6 py-5 border-b sticky top-0 z-10" style="border-color: rgba(255,255,255,0.06); background: rgba(10,10,15,0.9); backdrop-filter: blur(12px);">
      <div class="max-w-5xl mx-auto flex flex-wrap items-center gap-4">
        <!-- Difficulty filter -->
        <div class="flex items-center gap-2">
          <span class="text-xs font-mono" style="color: #555577;">難易度:</span>
          <button
            v-for="d in ['all', 'beginner', 'intermediate', 'advanced']"
            :key="d"
            @click="activeDifficulty = d"
            class="text-xs px-3 py-1 rounded-full font-mono transition-all duration-200"
            :style="activeDifficulty === d
              ? 'background: rgba(0,212,255,0.2); color: #00d4ff; border: 1px solid rgba(0,212,255,0.4);'
              : 'background: transparent; color: #555577; border: 1px solid rgba(255,255,255,0.08);'"
          >{{ d === 'all' ? 'All' : d }}</button>
        </div>
        <!-- Tag filter -->
        <div class="flex items-center gap-2 flex-wrap">
          <span class="text-xs font-mono" style="color: #555577;">タグ:</span>
          <button
            v-for="tag in allTags"
            :key="tag"
            @click="activeFilter = tag"
            class="text-xs px-3 py-1 rounded-full font-mono transition-all duration-200"
            :style="activeFilter === tag
              ? 'background: rgba(0,212,255,0.2); color: #00d4ff; border: 1px solid rgba(0,212,255,0.4);'
              : 'background: transparent; color: #555577; border: 1px solid rgba(255,255,255,0.08);'"
          >#{{ tag }}</button>
        </div>
      </div>
    </section>

    <!-- Demo Grid -->
    <section class="px-6 py-12">
      <div class="max-w-5xl mx-auto">
        <div v-if="filtered.length === 0" class="text-center py-16" style="color: #555577;">
          <p class="font-mono">// No results found</p>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimationCard
            v-for="demo in filtered"
            :key="demo.slug"
            :demo="demo"
            :to="`/css/${demo.slug}`"
          />
        </div>
      </div>
    </section>
  </div>
</template>
