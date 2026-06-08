<script setup lang="ts">
const { data: cssDemos } = await useAsyncData('css-count', () =>
  queryCollection('css').all(),
)

const sections = computed(() => [
  {
    title: 'CSS',
    description:
      '@keyframes・transition・transform。ライブラリ無しで動かす、アニメーションの基礎体力。',
    to: '/css',
    accent: '#00d4ff',
    count: `${cssDemos.value?.length ?? 0} demos`,
    ready: true,
  },
  {
    title: 'GSAP',
    description: 'タイムライン制御とプラグインで複雑な演出を緻密に組み立てる業界標準ライブラリ。',
    to: '/gsap',
    accent: '#88ce02',
    ready: false,
  },
  {
    title: 'Motion',
    description: '@vueuse/motion による宣言的アニメーション。Vue の世界に馴染む書き味。',
    to: '/motion',
    accent: '#646cff',
    ready: false,
  },
  {
    title: 'SVG',
    description: 'パスの描画・モーフィング・stroke アニメーション。ベクターならではの表現。',
    to: '/svg',
    accent: '#f038ff',
    ready: false,
  },
  {
    title: 'Three.js',
    description: 'WebGL と TresJS で 3D 空間のアニメーションへ。光・素材・カメラを操る。',
    to: '/threejs',
    accent: '#ff6b35',
    ready: false,
  },
])
</script>

<template>
  <div class="mx-auto max-w-6xl px-5">
    <!-- hero -->
    <section class="py-20 text-center sm:py-28">
      <p class="font-mono text-sm tracking-widest text-[var(--color-accent-css)]">
        MOTION AS KNOWLEDGE
      </p>
      <h1 class="mt-4 font-mono text-4xl font-bold leading-tight text-white sm:text-6xl">
        Animation Lab
      </h1>
      <p class="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
        アニメーションを「見る」だけでなく「理解して使える」ようになるための、
        チーム共有の展覧・学習サイト。技術ごとに、動くデモとコードと理論をひとつに。
      </p>
      <div class="mt-8 flex justify-center gap-3">
        <NuxtLink
          to="/css"
          class="rounded-lg bg-[var(--color-accent-css)] px-6 py-3 font-mono text-sm font-bold text-[#0a0a0f] transition-transform hover:scale-105"
        >
          CSS から始める →
        </NuxtLink>
      </div>
    </section>

    <!-- section grid -->
    <section class="pb-10">
      <h2 class="mb-6 font-mono text-sm tracking-widest text-gray-500">SECTIONS</h2>
      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <SectionCard
          v-for="s in sections"
          :key="s.title"
          v-bind="s"
        />
      </div>
    </section>
  </div>
</template>
