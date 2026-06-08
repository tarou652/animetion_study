<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: demo } = await useAsyncData(`css-${slug}`, () =>
  queryCollection('css').path(`/css/${slug}`).first()
)

if (!demo.value) {
  throw createError({ statusCode: 404, statusMessage: 'Demo not found' })
}

useHead({ title: `${demo.value.title} — CSS — Animation Lab` })

const demoComponentName = computed(() => demo.value?.component ?? '')
const demoComponent = computed(() => {
  if (!demoComponentName.value) return null
  return resolveComponent(demoComponentName.value)
})

const activeTab = ref<'css' | 'html' | 'js'>('css')
const codeTabs = computed(() => {
  const tabs: Array<'css' | 'html' | 'js'> = []
  if (demo.value?.code?.css) tabs.push('css')
  if (demo.value?.code?.html) tabs.push('html')
  if (demo.value?.code?.js) tabs.push('js')
  return tabs
})

const hasPrev = computed(() => (demo.value?.order ?? 1) > 1)
const hasNext = computed(() => (demo.value?.order ?? 1) < 8)

const { data: prevDemo } = await useAsyncData(`css-prev-${slug}`, () =>
  hasPrev.value
    ? queryCollection('css').where('order', '==', (demo.value?.order ?? 1) - 1).first()
    : Promise.resolve(null)
)
const { data: nextDemo } = await useAsyncData(`css-next-${slug}`, () =>
  hasNext.value
    ? queryCollection('css').where('order', '==', (demo.value?.order ?? 1) + 1).first()
    : Promise.resolve(null)
)

const copied = ref(false)
async function copyCode() {
  const code = demo.value?.code?.[activeTab.value] ?? ''
  await navigator.clipboard.writeText(code)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<template>
  <div v-if="demo" class="max-w-5xl mx-auto px-4 md:px-6 pb-24">

    <!-- ① HERO -->
    <section class="py-12 border-b" style="border-color: rgba(255,255,255,0.06);">
      <div class="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div class="flex items-center gap-3 mb-3">
            <NuxtLink to="/css/" class="text-xs font-mono transition-colors hover:text-white" style="color: #555577;">← CSS</NuxtLink>
            <span style="color: #333355;">/</span>
            <span class="text-xs font-mono" style="color: #555577;">{{ demo.slug }}</span>
          </div>
          <h1 class="text-3xl md:text-4xl font-bold mb-3" style="font-family: 'JetBrains Mono', monospace; color: #f0f0f8;">
            {{ demo.title }}
          </h1>
          <p class="text-base mb-4" style="color: #8888aa; font-family: 'Noto Sans JP', sans-serif; max-width: 50ch;">
            {{ demo.description }}
          </p>
          <div class="flex items-center gap-3 flex-wrap">
            <DifficultyBadge :level="demo.difficulty" />
            <TechTag v-for="tag in demo.tags" :key="tag" :tag="tag" />
          </div>
        </div>
        <!-- Prev / Next nav -->
        <div class="flex items-center gap-2">
          <NuxtLink
            v-if="prevDemo"
            :to="`/css/${prevDemo.slug}`"
            class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono transition-all duration-200 hover:scale-105"
            style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); color: #8888aa;"
          >
            ← {{ prevDemo.title }}
          </NuxtLink>
          <NuxtLink
            v-if="nextDemo"
            :to="`/css/${nextDemo.slug}`"
            class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono transition-all duration-200 hover:scale-105"
            style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); color: #8888aa;"
          >
            {{ nextDemo.title }} →
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ② THEORY -->
    <section class="py-12 border-b" style="border-color: rgba(255,255,255,0.06);">
      <h2 class="text-xs font-mono uppercase tracking-widest mb-8" style="color: #00d4ff; letter-spacing: 0.15em;">// 理論説明</h2>
      <div class="prose-demo">
        <ContentRenderer v-if="demo.body" :value="demo" />
      </div>
    </section>

    <!-- ③ LIVE DEMO -->
    <section class="py-12 border-b" style="border-color: rgba(255,255,255,0.06);">
      <h2 class="text-xs font-mono uppercase tracking-widest mb-8" style="color: #00d4ff; letter-spacing: 0.15em;">// ライブデモ</h2>
      <div class="glass-card rounded-2xl overflow-hidden">
        <div class="flex items-center gap-2 px-4 py-3 border-b" style="border-color: rgba(255,255,255,0.06);">
          <div class="w-3 h-3 rounded-full" style="background:#ff5f57;"></div>
          <div class="w-3 h-3 rounded-full" style="background:#febc2e;"></div>
          <div class="w-3 h-3 rounded-full" style="background:#28c840;"></div>
          <span class="ml-2 text-xs font-mono" style="color: #555577;">Interactive Demo</span>
        </div>
        <div class="p-8">
          <component :is="demoComponent" v-if="demoComponent" />
          <div v-else class="text-center py-8 font-mono text-sm" style="color: #555577;">
            // Demo component not found: {{ demo.component }}
          </div>
        </div>
      </div>
    </section>

    <!-- ④ CODE -->
    <section class="py-12 border-b" style="border-color: rgba(255,255,255,0.06);">
      <h2 class="text-xs font-mono uppercase tracking-widest mb-8" style="color: #00d4ff; letter-spacing: 0.15em;">// コード</h2>
      <div class="glass-card rounded-2xl overflow-hidden">
        <!-- Tab bar -->
        <div class="flex items-center justify-between px-4 py-2 border-b" style="border-color: rgba(255,255,255,0.06);">
          <div class="flex gap-1">
            <button
              v-for="tab in codeTabs"
              :key="tab"
              @click="activeTab = tab"
              class="px-4 py-2 text-xs font-mono rounded transition-all duration-200"
              :style="activeTab === tab
                ? 'background: rgba(0,212,255,0.15); color: #00d4ff;'
                : 'color: #555577; hover:color: #f0f0f8;'"
            >.{{ tab }}</button>
          </div>
          <button
            @click="copyCode"
            class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded transition-all duration-200"
            style="border: 1px solid rgba(255,255,255,0.08); color: #8888aa;"
            :style="copied ? 'color: #00d4ff; border-color: rgba(0,212,255,0.3);' : ''"
          >
            <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/></svg>
            {{ copied ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <!-- Code content -->
        <div class="overflow-auto" style="max-height: 480px;">
          <pre class="p-6 text-sm leading-relaxed" style="font-family: 'JetBrains Mono', monospace; color: #d4d4d4; margin: 0;"><code>{{ demo.code?.[activeTab] ?? '' }}</code></pre>
        </div>
      </div>
    </section>

    <!-- ⑤ TIPS -->
    <section class="py-12">
      <h2 class="text-xs font-mono uppercase tracking-widest mb-8" style="color: #00d4ff; letter-spacing: 0.15em;">// Tips &amp; まとめ</h2>
      <div v-if="demo.tips?.length" class="space-y-3 mb-8">
        <div
          v-for="(tip, i) in demo.tips"
          :key="i"
          class="flex items-start gap-3 p-4 rounded-lg"
          style="background: rgba(0,212,255,0.04); border: 1px solid rgba(0,212,255,0.1);"
        >
          <span class="text-xs font-mono mt-0.5 flex-shrink-0" style="color: #00d4ff;">{{ String(i + 1).padStart(2, '0') }}</span>
          <p class="text-sm" style="color: #c0c0d8; font-family: 'Noto Sans JP', sans-serif;">{{ tip }}</p>
        </div>
      </div>

      <!-- Related demos -->
      <div v-if="demo.related?.length">
        <h3 class="text-xs font-mono uppercase tracking-widest mb-4" style="color: #555577;">関連デモ</h3>
        <div class="flex flex-wrap gap-2">
          <NuxtLink
            v-for="rel in demo.related"
            :key="rel"
            :to="`/css/${rel}`"
            class="px-4 py-2 rounded-lg text-sm font-mono transition-all duration-200 hover:scale-105"
            style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); color: #8888aa;"
          >→ {{ rel }}</NuxtLink>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
.prose-demo :deep(h2) {
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.25rem;
  font-weight: 700;
  color: #f0f0f8;
  margin-bottom: 0.75rem;
  margin-top: 2rem;
}
.prose-demo :deep(h3) {
  font-family: 'JetBrains Mono', monospace;
  font-size: 1rem;
  font-weight: 600;
  color: #00d4ff;
  margin-bottom: 0.5rem;
  margin-top: 1.5rem;
}
.prose-demo :deep(p) {
  color: #8888aa;
  font-family: 'Noto Sans JP', sans-serif;
  line-height: 1.8;
  margin-bottom: 1rem;
}
.prose-demo :deep(code) {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85em;
  color: #00d4ff;
  background: rgba(0,212,255,0.08);
  padding: 0.1em 0.4em;
  border-radius: 4px;
}
.prose-demo :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
}
.prose-demo :deep(th) {
  text-align: left;
  padding: 0.6rem 1rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid rgba(0,212,255,0.2);
  color: #00d4ff;
}
.prose-demo :deep(td) {
  padding: 0.6rem 1rem;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  color: #c0c0d8;
}
</style>
