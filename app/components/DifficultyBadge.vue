<script setup lang="ts">
const props = defineProps<{
  level: 'beginner' | 'intermediate' | 'advanced'
}>()

const config = {
  beginner: { label: 'Beginner', color: '#4ade80', bg: 'rgba(74, 222, 128, 0.12)' },
  intermediate: { label: 'Intermediate', color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.12)' },
  advanced: { label: 'Advanced', color: '#f87171', bg: 'rgba(248, 113, 113, 0.12)' },
} as const

const c = computed(() => config[props.level])
</script>

<template>
  <span
    class="inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-xs font-medium"
    :style="{ color: c.color, background: c.bg }"
  >
    {{ c.label }}
  </span>
</template>
