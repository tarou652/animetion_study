<script setup lang="ts">
defineProps<{
  section: {
    id: string
    title: string
    description: string
    accent: string
    tag: string
    available: boolean
    demoCount: number
  }
}>()
</script>

<template>
  <component
    :is="section.available ? 'NuxtLink' : 'div'"
    :to="section.available ? `/${section.id}/` : undefined"
    class="glass-card rounded-2xl p-6 transition-all duration-300 block"
    :class="section.available ? 'hover:scale-[1.02] cursor-pointer' : 'opacity-50 cursor-default'"
  >
    <!-- Tag + Coming Soon -->
    <div class="flex items-center justify-between mb-4">
      <span
        class="text-xs font-mono px-2 py-0.5 rounded font-semibold"
        :style="`background: ${section.accent}18; color: ${section.accent}; border: 1px solid ${section.accent}33;`"
      >{{ section.tag }}</span>
      <span v-if="!section.available" class="text-xs font-mono px-2 py-0.5 rounded" style="background: rgba(255,255,255,0.05); color: #333355; border: 1px solid rgba(255,255,255,0.06);">
        Coming Soon
      </span>
      <span v-else class="text-xs font-mono" style="color: #333355;">
        {{ section.demoCount }} demos
      </span>
    </div>

    <!-- Mini preview animation -->
    <div class="h-24 rounded-lg mb-4 flex items-center justify-center overflow-hidden" :style="`background: ${section.accent}06; border: 1px solid ${section.accent}15;`">
      <!-- CSS preview -->
      <template v-if="section.id === 'css' && section.available">
        <div class="flex gap-3">
          <div class="w-6 h-6 rounded" :style="`background: ${section.accent}; animation: float 2s ease-in-out infinite;`"></div>
          <div class="w-6 h-6 rounded" :style="`background: ${section.accent}99; animation: float 2s ease-in-out infinite 0.3s;`"></div>
          <div class="w-6 h-6 rounded" :style="`background: ${section.accent}55; animation: float 2s ease-in-out infinite 0.6s;`"></div>
        </div>
      </template>
      <template v-else>
        <span class="text-xs font-mono" :style="`color: ${section.accent}44;`">// {{ section.title }}</span>
      </template>
    </div>

    <h3 class="font-bold mb-2" style="font-family: 'JetBrains Mono', monospace; color: #f0f0f8; font-size: 1rem;">
      {{ section.title }}
    </h3>
    <p class="text-xs leading-relaxed" style="color: #555577; font-family: 'Noto Sans JP', sans-serif;">
      {{ section.description }}
    </p>

    <div v-if="section.available" class="mt-4 flex items-center gap-1 text-xs font-mono transition-all duration-200" :style="`color: ${section.accent};`">
      <span>→ 学習を始める</span>
    </div>
  </component>
</template>

<style scoped>
a:hover {
  box-shadow: 0 0 30px rgba(0,212,255,0.06);
  border-color: rgba(0,212,255,0.15) !important;
}
</style>
