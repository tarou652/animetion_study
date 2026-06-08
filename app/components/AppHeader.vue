<script setup lang="ts">
const nav = [
  { label: 'CSS', to: '/css', accent: '#00d4ff', ready: true },
  { label: 'GSAP', to: '/gsap', accent: '#88ce02', ready: false },
  { label: 'Motion', to: '/motion', accent: '#646cff', ready: false },
  { label: 'SVG', to: '/svg', accent: '#f038ff', ready: false },
  { label: 'Three.js', to: '/threejs', accent: '#ff6b35', ready: false },
]
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[#0a0a0f]/70 backdrop-blur-md"
  >
    <div class="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
      <NuxtLink to="/" class="group flex items-center gap-2 font-mono text-lg font-bold">
        <span class="text-[var(--color-accent-css)]">&lt;</span>
        <span class="text-white">Animation Lab</span>
        <span class="text-[var(--color-accent-css)]">/&gt;</span>
      </NuxtLink>

      <nav class="flex items-center gap-1 sm:gap-3">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="group relative rounded-lg px-2.5 py-1.5 font-mono text-sm transition-colors sm:px-3"
          :class="item.ready ? 'text-gray-300 hover:text-white' : 'text-gray-600'"
        >
          {{ item.label }}
          <span
            v-if="!item.ready"
            class="ml-1 hidden align-super text-[0.6rem] text-gray-600 sm:inline"
            >soon</span
          >
          <span
            class="absolute inset-x-2 -bottom-px h-px origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
            :style="{ background: item.accent }"
          />
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
