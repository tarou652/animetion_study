<script setup lang="ts">
const props = defineProps<{
  demo: {
    title: string
    description: string
    difficulty: string
    tags: string[]
    slug: string
    component?: string
  }
  to: string
}>()

const demoComponentMap: Record<string, string> = {
  'keyframes-basics':    'DemosCssKeyframesBasic',
  'timing-functions':    'DemosCssTimingFunctions',
  'transform-gallery':   'DemosCssTransformGallery',
  'transition-states':   'DemosCssTransitionStates',
  'animation-fill-mode': 'DemosCssAnimationFillMode',
  'stagger-effect':      'DemosCssStaggerEffect',
  'scroll-driven':       'DemosCssScrollDriven',
  'clip-path-morph':     'DemosCssClipPathMorph',
}

const componentName = computed(() => demoComponentMap[props.demo.slug])
const previewComponent = computed(() => {
  if (!componentName.value) return null
  try { return resolveComponent(componentName.value) } catch { return null }
})
</script>

<template>
  <NuxtLink
    :to="to"
    class="group block glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
  >
    <!-- Live Preview Area -->
    <div class="relative h-44 overflow-hidden border-b" style="border-color: rgba(255,255,255,0.06); background: rgba(0,0,0,0.2);">
      <div class="absolute inset-0 flex items-center justify-center scale-75 pointer-events-none">
        <component :is="previewComponent" v-if="previewComponent" :preview="true" />
        <div v-else class="font-mono text-xs" style="color: #333355;">// {{ demo.slug }}</div>
      </div>
      <!-- Hover overlay -->
      <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style="background: rgba(0,212,255,0.06);">
        <span class="text-xs font-mono px-3 py-1.5 rounded-full" style="background: rgba(0,212,255,0.15); color: #00d4ff; border: 1px solid rgba(0,212,255,0.3);">
          → デモを見る
        </span>
      </div>
    </div>

    <!-- Card Body -->
    <div class="p-5">
      <div class="flex items-start justify-between gap-2 mb-2">
        <h3 class="font-semibold text-sm leading-snug group-hover:text-white transition-colors" style="font-family: 'JetBrains Mono', monospace; color: #c0c0d8;">
          {{ demo.title }}
        </h3>
        <DifficultyBadge :level="demo.difficulty" size="sm" class="flex-shrink-0 mt-0.5" />
      </div>
      <p class="text-xs leading-relaxed mb-3" style="color: #555577; font-family: 'Noto Sans JP', sans-serif;">
        {{ demo.description }}
      </p>
      <div class="flex flex-wrap gap-1">
        <TechTag v-for="tag in demo.tags" :key="tag" :tag="tag" />
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
a:hover {
  border-color: rgba(0,212,255,0.25) !important;
  box-shadow: 0 0 30px rgba(0,212,255,0.08);
}
</style>
