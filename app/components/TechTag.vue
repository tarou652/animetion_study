<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<template>
  <span
    class="inline-flex items-center rounded-md border border-[var(--color-border)] bg-white/5 px-2 py-0.5 font-mono text-[0.7rem] text-gray-300"
  >
    {{ label }}
  </span>
</template>
