<script setup lang="ts">
defineProps<{
  title: string
  tag: string
  accent: string
  description: string
  phase: string
}>()
</script>

<template>
  <div class="min-h-[60vh] flex items-center justify-center px-6">
    <div class="text-center max-w-md">
      <span
        class="inline-block text-xs font-mono px-3 py-1 rounded-full mb-6"
        :style="`background: ${accent}18; color: ${accent}; border: 1px solid ${accent}33;`"
      >{{ tag }}</span>
      <h1 class="text-3xl font-bold mb-4" style="font-family: 'JetBrains Mono', monospace; color: #f0f0f8;">
        {{ title }}
      </h1>
      <p class="text-sm leading-relaxed mb-8" style="color: #555577; font-family: 'Noto Sans JP', sans-serif;">
        {{ description }}
      </p>
      <div class="glass-card rounded-xl px-6 py-4 inline-block">
        <div class="text-xs font-mono" style="color: #333355;">予定: {{ phase }}</div>
      </div>
      <div class="mt-8">
        <NuxtLink to="/" class="text-sm font-mono transition-colors hover:text-white" style="color: #555577;">
          ← トップに戻る
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
