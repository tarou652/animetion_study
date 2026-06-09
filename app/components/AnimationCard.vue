<script setup lang="ts">
import type { Component } from 'vue'

interface Demo {
  path: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
  component: string
}

const props = defineProps<{
  demo: Demo
}>()

// デモコンポーネント本体を import.meta.glob で静的に取り込む。
// resolveComponent(文字列) はデータ駆動だとバンドル対象から外れて解決に失敗するため、
// glob でモジュールごと取り込み、Nuxt 自動インポート名で引く。
const demoModules = import.meta.glob('./demos/**/*.vue', {
  eager: true,
  import: 'default',
}) as Record<string, Component>
const componentByName = Object.fromEntries(
  Object.entries(demoModules).map(([filePath, mod]) => {
    const name = filePath
      .slice(filePath.indexOf('demos/'))
      .replace(/\.vue$/, '')
      .split('/')
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join('')
    return [name, mod]
  }),
)

const previewComponent = computed(() =>
  props.demo.component ? (componentByName[props.demo.component] ?? null) : null,
)
</script>

<template>
  <NuxtLink
    :to="demo.path"
    class="group glass-card relative flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-css)]/40 hover:shadow-[0_8px_40px_-12px_rgba(0,212,255,0.35)]"
  >
    <!-- live preview -->
    <div
      class="relative flex h-40 items-center justify-center overflow-hidden border-b border-[var(--color-border)] bg-black/20"
    >
      <component :is="previewComponent" v-if="previewComponent" preview />
      <span v-else class="font-mono text-xs text-gray-600">preview</span>
    </div>

    <!-- meta -->
    <div class="flex flex-1 flex-col gap-3 p-5">
      <div class="flex items-start justify-between gap-3">
        <h3 class="font-mono text-base font-bold text-white">{{ demo.title }}</h3>
        <DifficultyBadge :level="demo.difficulty" />
      </div>

      <p class="line-clamp-2 flex-1 text-sm leading-relaxed text-gray-400">
        {{ demo.description }}
      </p>

      <div class="flex flex-wrap gap-1.5">
        <TechTag v-for="tag in demo.tags" :key="tag" :label="tag" />
      </div>
    </div>
  </NuxtLink>
</template>
