<script setup lang="ts">
const props = defineProps<{
  level: string
  size?: 'sm' | 'md'
}>()

const config = computed(() => {
  const map: Record<string, { label: string; bg: string; color: string }> = {
    beginner:     { label: 'Beginner',     bg: 'rgba(0,212,255,0.1)',   color: '#00d4ff' },
    intermediate: { label: 'Intermediate', bg: 'rgba(255,190,0,0.1)',   color: '#ffbe00' },
    advanced:     { label: 'Advanced',     bg: 'rgba(255,60,100,0.1)',   color: '#ff3c64' },
  }
  return map[props.level] ?? map['beginner']
})
</script>

<template>
  <span
    class="inline-flex items-center gap-1 rounded-full font-mono font-semibold"
    :style="`background: ${config.bg}; color: ${config.color}; border: 1px solid ${config.color}33; padding: ${size === 'sm' ? '0.1rem 0.5rem' : '0.2rem 0.65rem'}; font-size: ${size === 'sm' ? '0.65rem' : '0.72rem'};`"
  >
    <span class="w-1 h-1 rounded-full bg-current"></span>
    {{ config.label }}
  </span>
</template>
