<script setup lang="ts">
useHead({ title: 'Animation Lab — Motion as Knowledge' })

const sections = [
  {
    id: 'css',
    title: 'CSS Animation',
    description: 'Keyframes, transitions, timing functions、スクロール連動まで。Pure CSSアニメーションの全技術を体系的に学ぶ。',
    accent: '#00d4ff',
    tag: 'CSS',
    available: true,
    demoCount: 8,
    previewClass: 'preview-css',
  },
  {
    id: 'gsap',
    title: 'GSAP 3',
    description: 'Timeline制御、ScrollTrigger、Draggable。プロが使うGSAPの強力なAPIを実例で習得する。',
    accent: '#88ce02',
    tag: 'GSAP',
    available: false,
    demoCount: 0,
    previewClass: 'preview-gsap',
  },
  {
    id: 'motion',
    title: '@vueuse/motion',
    description: 'Vue専用のMotion APIで宣言的なアニメーションを実装。コンポーネントに命を吹き込む。',
    accent: '#646cff',
    tag: 'Motion',
    available: false,
    demoCount: 0,
    previewClass: 'preview-motion',
  },
  {
    id: 'svg',
    title: 'SVG Animation',
    description: 'パスアニメーション、モーフィング、SVG SMIL。ベクターグラフィクスに動きを与える。',
    accent: '#ff6b35',
    tag: 'SVG',
    available: false,
    demoCount: 0,
    previewClass: 'preview-svg',
  },
  {
    id: 'threejs',
    title: 'Three.js / WebGL',
    description: '3Dシーン構築からシェーダーまで。TresJSでVueと3Dを融合させた次世代表現を探求。',
    accent: '#ff6b35',
    tag: 'Three.js',
    available: false,
    demoCount: 0,
    previewClass: 'preview-threejs',
  },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden px-6 py-24 text-center">
      <!-- Background grid -->
      <div class="absolute inset-0 pointer-events-none" style="background-image: linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px); background-size: 60px 60px;"></div>

      <div class="relative max-w-4xl mx-auto">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-6" style="background: rgba(0,212,255,0.1); border: 1px solid rgba(0,212,255,0.2); color: #00d4ff;">
          <span class="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
          Motion as Knowledge
        </div>

        <h1 class="text-5xl md:text-7xl font-bold mb-6 tracking-tight" style="font-family: 'JetBrains Mono', monospace;">
          <span class="gradient-text-css">Animation</span>
          <span style="color: #f0f0f8;"> Lab</span>
        </h1>

        <p class="text-lg md:text-xl max-w-2xl mx-auto mb-10" style="color: #8888aa; font-family: 'Noto Sans JP', sans-serif;">
          アニメーションを「見るだけ」でなく「理解して使える」ようになる、<br class="hidden md:block">チーム共有用の展覧・学習サイト。
        </p>

        <NuxtLink to="/css/" class="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-sm font-semibold transition-all duration-300 hover:scale-105" style="background: linear-gradient(135deg, #00d4ff22, #00d4ff11); border: 1px solid rgba(0,212,255,0.4); color: #00d4ff;">
          CSS Section を始める
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/></svg>
        </NuxtLink>
      </div>
    </section>

    <!-- Sections Grid -->
    <section class="px-6 pb-24">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-sm font-mono uppercase tracking-widest mb-8" style="color: #555577; letter-spacing: 0.15em;">
          // Sections
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SectionCard
            v-for="section in sections"
            :key="section.id"
            :section="section"
          />
        </div>
      </div>
    </section>
  </div>
</template>
