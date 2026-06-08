<script setup lang="ts">
const navLinks = [
  { label: 'CSS', to: '/css/', accent: '#00d4ff' },
  { label: 'GSAP', to: '/gsap/', accent: '#88ce02' },
  { label: 'Motion', to: '/motion/', accent: '#646cff' },
  { label: 'SVG', to: '/svg/', accent: '#ff6b35' },
  { label: 'Three.js', to: '/threejs/', accent: '#ff6b35' },
]
const isOpen = ref(false)
</script>

<template>
  <header class="sticky top-0 z-50 px-6 py-4 border-b" style="border-color: rgba(255,255,255,0.06); background: rgba(10,10,15,0.85); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);">
    <div class="max-w-6xl mx-auto flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-3 group">
        <div class="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm font-mono transition-all duration-300 group-hover:scale-110" style="background: linear-gradient(135deg, #00d4ff22, #00d4ff44); border: 1px solid rgba(0,212,255,0.3); color: #00d4ff;">
          A
        </div>
        <span class="font-bold tracking-tight" style="font-family: 'JetBrains Mono', monospace; color: #f0f0f8; font-size: 1rem;">
          Animation<span style="color: #00d4ff;">Lab</span>
        </span>
      </NuxtLink>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-1">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="px-3 py-1.5 rounded-lg text-sm font-mono transition-all duration-200 relative"
          style="color: #555577;"
          active-class="nav-active"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <!-- Mobile toggle -->
      <button @click="isOpen = !isOpen" class="md:hidden p-2 rounded-lg" style="color: #8888aa;">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
          <path v-if="!isOpen" fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
          <path v-else d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <Transition name="slide-down">
      <nav v-if="isOpen" class="md:hidden mt-3 pb-3 border-t pt-3 space-y-1" style="border-color: rgba(255,255,255,0.06);">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="block px-3 py-2 rounded-lg text-sm font-mono transition-colors"
          style="color: #555577;"
          @click="isOpen = false"
        >{{ link.label }}</NuxtLink>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.nav-active {
  color: #f0f0f8 !important;
  background: rgba(255,255,255,0.06);
}
a:hover:not(.nav-active) {
  color: #c0c0d8 !important;
  background: rgba(255,255,255,0.04);
}
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.2s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
