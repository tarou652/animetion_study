<script setup lang="ts">
defineProps<{
  title: string
  description: string
  to: string
  accent: string
  count?: string
  ready: boolean
}>()
</script>

<template>
  <component
    :is="ready ? 'NuxtLink' : 'div'"
    :to="ready ? to : undefined"
    class="group glass-card relative flex flex-col gap-4 overflow-hidden p-6 transition-all duration-300"
    :class="
      ready
        ? 'cursor-pointer hover:-translate-y-1.5'
        : 'cursor-not-allowed opacity-50 grayscale'
    "
    :style="ready ? { '--accent': accent } : {}"
  >
    <!-- accent glow -->
    <div
      v-if="ready"
      class="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
      :style="{ background: accent }"
    />

    <div class="flex items-center justify-between">
      <span
        class="font-mono text-2xl font-bold"
        :style="ready ? { color: accent } : { color: '#6b7280' }"
      >
        {{ title }}
      </span>
      <span
        v-if="!ready"
        class="rounded-full border border-[var(--color-border)] px-2.5 py-0.5 font-mono text-[0.65rem] text-gray-500"
      >
        Coming Soon
      </span>
      <span v-else-if="count" class="font-mono text-xs text-gray-500">{{ count }}</span>
    </div>

    <p class="relative text-sm leading-relaxed text-gray-400">{{ description }}</p>

    <div
      v-if="ready"
      class="relative mt-auto flex items-center gap-1 font-mono text-sm transition-transform duration-300 group-hover:translate-x-1"
      :style="{ color: accent }"
    >
      Explore
      <span aria-hidden="true">→</span>
    </div>
  </component>
</template>
