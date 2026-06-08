<script setup lang="ts">
defineProps<{ preview?: boolean }>()

const easings = [
  { name: 'linear',                          value: 'linear',                          color: '#8888aa' },
  { name: 'ease',                            value: 'ease',                            color: '#00d4ff' },
  { name: 'ease-in',                         value: 'ease-in',                         color: '#646cff' },
  { name: 'ease-out',                        value: 'ease-out',                        color: '#88ce02' },
  { name: 'ease-in-out',                     value: 'ease-in-out',                     color: '#ff6b35' },
  { name: 'cubic-bezier(0.34,1.56,0.64,1)', value: 'cubic-bezier(0.34,1.56,0.64,1)', color: '#ff3c64' },
]

const animKey = ref(0)
const duration = ref(1.5)

function replay() {
  animKey.value++
}
</script>

<template>
  <!-- Preview mode -->
  <div v-if="preview" class="flex items-end gap-1">
    <div
      v-for="(e, i) in easings.slice(0, 4)"
      :key="e.name"
      class="w-4 rounded-sm"
      :style="`height:${12 + i * 6}px; background:${e.color}; animation: tf-bar-pulse 1.5s ${e.value} infinite ${i * 0.2}s alternate;`"
    ></div>
  </div>

  <!-- Full demo -->
  <div v-else class="w-full">
    <!-- Controls -->
    <div class="flex items-center gap-6 mb-6 flex-wrap">
      <div class="flex items-center gap-3">
        <label class="text-xs font-mono" style="color: #8888aa;">duration</label>
        <input type="range" min="0.5" max="4" step="0.1" v-model.number="duration" class="w-32 accent-[#00d4ff]" />
        <span class="text-xs font-mono" style="color: #00d4ff;">{{ duration.toFixed(1) }}s</span>
      </div>
      <button @click="replay" class="px-4 py-2 rounded-lg text-xs font-mono transition-all duration-200 hover:scale-105" style="background: rgba(0,212,255,0.12); border: 1px solid rgba(0,212,255,0.25); color: #00d4ff;">
        ↺ Replay
      </button>
    </div>

    <!-- Easing rows — each track is a fixed-width flex row -->
    <div class="space-y-3">
      <div v-for="easing in easings" :key="easing.name" class="flex items-center gap-3">
        <!-- Label -->
        <span class="text-xs font-mono w-44 flex-shrink-0 leading-tight" :style="`color: ${easing.color};`">{{ easing.name }}</span>
        <!-- Track -->
        <div class="flex-1 h-10 rounded-lg relative" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); overflow: hidden;">
          <div
            :key="`${easing.name}-${animKey}`"
            class="absolute top-1/2 -translate-y-1/2 w-7 h-7 rounded-full"
            :style="`left: 8px; background: ${easing.color}; animation: tf-slide ${duration}s ${easing.value} forwards;`"
          ></div>
        </div>
      </div>
    </div>

    <p class="mt-5 text-xs leading-relaxed" style="color: #555577; font-family: 'Noto Sans JP', sans-serif;">
      全ボールが同時スタート。イージングの違いで「止まり方・加速感」が変わります。
    </p>
  </div>
</template>

<style scoped>
/* Animate left so we can use 100% of the container without knowing its px width */
@keyframes tf-slide {
  from { left: 8px; }
  to   { left: calc(100% - 36px); }
}

@keyframes tf-bar-pulse {
  from { opacity: 0.4; transform: scaleY(0.6); }
  to   { opacity: 1;   transform: scaleY(1); }
}
</style>
