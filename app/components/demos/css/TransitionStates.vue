<script setup lang="ts">
const props = defineProps<{ preview?: boolean }>()

const duration = ref(0.3)
const easing = ref('ease')
const easingOptions = ['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out']
</script>

<template>
  <!-- Preview mode -->
  <div v-if="preview" class="flex gap-2 items-center">
    <div class="w-12 h-6 rounded-md transition-all duration-300 hover:scale-110" style="background: linear-gradient(135deg, #00d4ff, #0099cc);"></div>
    <div class="w-6 h-6 rounded-full transition-all duration-500 hover:rotate-180" style="background: #646cff;"></div>
  </div>

  <!-- Full demo -->
  <div v-else class="w-full">
    <!-- Controls -->
    <div class="glass-card rounded-xl p-4 mb-6 flex flex-wrap items-center gap-6">
      <div class="flex items-center gap-3">
        <label class="text-xs font-mono" style="color: #8888aa;">duration</label>
        <input type="range" min="0.05" max="1.5" step="0.05" v-model.number="duration" class="w-28 accent-[#00d4ff]" />
        <span class="text-xs font-mono" style="color: #00d4ff;">{{ duration.toFixed(2) }}s</span>
      </div>
      <div class="flex items-center gap-2">
        <label class="text-xs font-mono" style="color: #8888aa;">easing</label>
        <select v-model="easing" class="text-xs font-mono px-2 py-1 rounded" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #f0f0f8;">
          <option v-for="e in easingOptions" :key="e" :value="e">{{ e }}</option>
        </select>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

      <!-- Button transition -->
      <div class="glass-card rounded-xl p-5">
        <p class="text-xs font-mono mb-4" style="color: #555577;">Button（background-color）</p>
        <div class="flex items-center justify-center h-20">
          <button
            class="px-6 py-2.5 rounded-lg font-mono text-sm font-semibold"
            :style="`transition: background-color ${duration}s ${easing}, transform ${duration}s ${easing}; background: rgba(0,212,255,0.15); border: 1px solid rgba(0,212,255,0.3); color: #00d4ff;`"
            @mouseover="(e: MouseEvent) => { (e.target as HTMLElement).style.background = 'rgba(0,212,255,0.35)'; (e.target as HTMLElement).style.transform = 'scale(1.05)'; }"
            @mouseleave="(e: MouseEvent) => { (e.target as HTMLElement).style.background = 'rgba(0,212,255,0.15)'; (e.target as HTMLElement).style.transform = 'scale(1)'; }"
          >Hover me</button>
        </div>
        <code class="block text-xs px-3 py-2 rounded" style="background: rgba(0,212,255,0.05); color: #00d4ff; font-family: 'JetBrains Mono', monospace; font-size: 0.7rem;">
          transition: background-color {{ duration }}s {{ easing }}
        </code>
      </div>

      <!-- Card transform -->
      <div class="glass-card rounded-xl p-5">
        <p class="text-xs font-mono mb-4" style="color: #555577;">Card（transform: translateY）</p>
        <div class="flex items-center justify-center h-20">
          <div
            class="w-20 h-12 rounded-lg flex items-center justify-center text-xs font-mono cursor-pointer"
            :style="`transition: transform ${duration}s ${easing}, box-shadow ${duration}s ${easing}; background: rgba(100,108,255,0.15); border: 1px solid rgba(100,108,255,0.3); color: #646cff;`"
            @mouseover="(e: MouseEvent) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-6px)'; el.style.boxShadow = '0 12px 30px rgba(100,108,255,0.25)'; }"
            @mouseleave="(e: MouseEvent) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }"
          >Hover</div>
        </div>
        <code class="block text-xs px-3 py-2 rounded" style="background: rgba(100,108,255,0.05); color: #646cff; font-family: 'JetBrains Mono', monospace; font-size: 0.7rem;">
          transition: transform {{ duration }}s {{ easing }}
        </code>
      </div>

      <!-- Input focus -->
      <div class="glass-card rounded-xl p-5">
        <p class="text-xs font-mono mb-4" style="color: #555577;">Input（border-color on :focus）</p>
        <div class="flex items-center justify-center h-20">
          <input
            type="text"
            placeholder="Click to focus..."
            class="w-full px-4 py-2 rounded-lg text-sm font-mono outline-none"
            :style="`transition: border-color ${duration}s ${easing}, box-shadow ${duration}s ${easing}; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); color: #f0f0f8;`"
            @focus="(e: FocusEvent) => { const el = e.target as HTMLElement; el.style.borderColor = 'rgba(0,212,255,0.5)'; el.style.boxShadow = '0 0 0 3px rgba(0,212,255,0.1)'; }"
            @blur="(e: FocusEvent) => { const el = e.target as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.1)'; el.style.boxShadow = 'none'; }"
          />
        </div>
        <code class="block text-xs px-3 py-2 rounded" style="background: rgba(0,212,255,0.05); color: #00d4ff; font-family: 'JetBrains Mono', monospace; font-size: 0.7rem;">
          transition: border-color {{ duration }}s {{ easing }}
        </code>
      </div>

      <!-- Opacity reveal -->
      <div class="glass-card rounded-xl p-5">
        <p class="text-xs font-mono mb-4" style="color: #555577;">Reveal（opacity + transform）</p>
        <div class="flex items-center justify-center h-20 relative overflow-hidden">
          <div
            class="w-full h-full rounded-lg flex items-center justify-center cursor-pointer relative group"
            style="background: rgba(136,206,2,0.08); border: 1px solid rgba(136,206,2,0.2);"
          >
            <span class="text-xs font-mono" style="color: #555577;">Hover me</span>
            <div
              class="absolute inset-0 rounded-lg flex items-center justify-center text-sm font-mono font-bold"
              :style="`transition: opacity ${duration}s ${easing}, transform ${duration}s ${easing}; opacity: 0; transform: translateY(8px); background: rgba(136,206,2,0.15); color: #88ce02;`"
              :class="'group-hover:opacity-100 group-hover:translate-y-0'"
            >Revealed!</div>
          </div>
        </div>
        <code class="block text-xs px-3 py-2 rounded" style="background: rgba(136,206,2,0.05); color: #88ce02; font-family: 'JetBrains Mono', monospace; font-size: 0.7rem;">
          transition: opacity {{ duration }}s {{ easing }}, transform {{ duration }}s {{ easing }}
        </code>
      </div>

    </div>
  </div>
</template>
