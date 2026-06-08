<script setup lang="ts">
interface Demo {
  path: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
  component: string
}

const props = defineProps<{
  demo: Demo
}>()

// slug → 自動インポート済みコンポーネント名のマッピング。
// frontmatter の component フィールドを優先し、無ければここで補完する。
const demoComponentMap: Record<string, string> = {
  'keyframes-basics': 'DemosCssKeyframesBasic',
  'timing-functions': 'DemosCssTimingFunctions',
  'transform-gallery': 'DemosCssTransformGallery',
  'transition-states': 'DemosCssTransitionStates',
}

const slug = computed(() => props.demo.path.split('/').pop() ?? '')

const previewComponent = computed(() => {
  const name = props.demo.component || demoComponentMap[slug.value]
  return name ? resolveComponent(name) : null
})
</script>

<template>
  <NuxtLink
    :to="demo.path"
    class="group glass-card relative flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-css)]/40 hover:shadow-[0_8px_40px_-12px_rgba(0,212,255,0.35)]"
  >
    <!-- live preview -->
    <div
      class="relative flex h-40 items-center justify-center overflow-hidden border-b border-[var(--color-border)] bg-black/20"
    >
      <component :is="previewComponent" v-if="previewComponent" preview />
      <span v-else class="font-mono text-xs text-gray-600">preview</span>
    </div>

    <!-- meta -->
    <div class="flex flex-1 flex-col gap-3 p-5">
      <div class="flex items-start justify-between gap-3">
        <h3 class="font-mono text-base font-bold text-white">{{ demo.title }}</h3>
        <DifficultyBadge :level="demo.difficulty" />
      </div>

      <p class="line-clamp-2 flex-1 text-sm leading-relaxed text-gray-400">
        {{ demo.description }}
      </p>

      <div class="flex flex-wrap gap-1.5">
        <TechTag v-for="tag in demo.tags" :key="tag" :label="tag" />
      </div>
    </div>
  </NuxtLink>
</template>
