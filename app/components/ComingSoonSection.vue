<script setup lang="ts">
defineProps<{
  title: string
  description: string
  accent: string
}>()
</script>

<template>
  <div class="mx-auto max-w-3xl px-5 py-24 text-center">
    <div
      class="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-[var(--color-border)]"
      :style="{ background: `${accent}1a` }"
    >
      <span class="font-mono text-3xl" :style="{ color: accent }">…</span>
    </div>

    <h1 class="font-mono text-4xl font-bold text-white">{{ title }}</h1>
    <p
      class="mt-3 inline-block rounded-full border border-[var(--color-border)] px-4 py-1 font-mono text-sm"
      :style="{ color: accent }"
    >
      Coming Soon
    </p>

    <p class="mx-auto mt-6 max-w-xl leading-relaxed text-gray-400">{{ description }}</p>

    <NuxtLink
      to="/"
      class="mt-10 inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-5 py-2.5 font-mono text-sm text-gray-300 transition-colors hover:border-white/30 hover:text-white"
    >
      <span aria-hidden="true">←</span> トップに戻る
    </NuxtLink>
  </div>
</template>
