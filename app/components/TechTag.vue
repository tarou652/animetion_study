<script setup lang="ts">
defineProps<{ tag: string }>()
</script>

<template>
  <span
    class="inline-block text-xs font-mono px-2 py-0.5 rounded"
    style="background: rgba(255,255,255,0.05); color: #8888aa; border: 1px solid rgba(255,255,255,0.08);"
  >#{{ tag }}</span>
</template>
