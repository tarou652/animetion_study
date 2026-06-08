<script setup lang="ts">
const props = defineProps<{ preview?: boolean }>()

const duration = ref(1.2)
const isPlaying = ref(true)
const animKey = ref(0)

function replay() {
  isPlaying.value = false
  animKey.value++
  nextTick(() => { isPlaying.value = true })
}
</script>

<template>
  <!-- Preview mode (card thumbnail) -->
  <div v-if="preview" class="flex gap-3 items-center">
    <div class="w-8 h-8 rounded-lg" style="background: #00d4ff; animation: kf-slide-in 2s ease-in-out infinite alternate;"></div>
    <div class="w-8 h-8 rounded-full" style="background: #00d4ff88; animation: kf-slide-in 2s ease-in-out 0.3s infinite alternate;"></div>
  </div>

  <!-- Full interactive demo -->
  <div v-else class="w-full">
    <!-- Demo area -->
    <div class="rounded-xl p-8 mb-6 flex flex-col items-center justify-center gap-8" style="background: rgba(0,0,0,0.3); min-height: 200px;">
      <!-- from/to demo -->
      <div class="w-full">
        <p class="text-xs font-mono mb-4" style="color: #555577;">① from / to（開始と終了の2点指定）</p>
        <div class="h-16 flex items-center px-4 rounded-lg relative overflow-hidden" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);">
          <div
            :key="`a-${animKey}`"
            class="w-10 h-10 rounded-lg absolute"
            :style="`background: linear-gradient(135deg, #00d4ff, #0099cc); animation: kf-slide-in ${duration}s ease both ${isPlaying ? '' : 'paused'};`"
          ></div>
        </div>
      </div>

      <!-- Multi-stop demo -->
      <div class="w-full">
        <p class="text-xs font-mono mb-4" style="color: #555577;">② % 指定（複数ステップ）</p>
        <div class="h-16 flex items-center px-4 rounded-lg relative overflow-hidden" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);">
          <div
            :key="`b-${animKey}`"
            class="w-10 h-10 rounded-lg absolute"
            :style="`background: linear-gradient(135deg, #00d4ff, #646cff); animation: kf-bounce ${duration * 1.5}s ease-in-out both ${isPlaying ? '' : 'paused'};`"
          ></div>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div class="glass-card rounded-xl p-5 space-y-4">
      <div class="flex items-center gap-4">
        <label class="text-xs font-mono w-24 flex-shrink-0" style="color: #8888aa;">duration</label>
        <input type="range" min="0.3" max="3" step="0.1" v-model.number="duration" class="flex-1 accent-[#00d4ff]" />
        <span class="text-xs font-mono w-12 text-right" style="color: #00d4ff;">{{ duration.toFixed(1) }}s</span>
      </div>
      <div class="flex gap-2">
        <button @click="isPlaying = !isPlaying" class="px-4 py-2 rounded-lg text-xs font-mono transition-all duration-200 hover:scale-105" style="background: rgba(0,212,255,0.12); border: 1px solid rgba(0,212,255,0.25); color: #00d4ff;">
          {{ isPlaying ? '⏸ Pause' : '▶ Play' }}
        </button>
        <button @click="replay" class="px-4 py-2 rounded-lg text-xs font-mono transition-all duration-200 hover:scale-105" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); color: #8888aa;">
          ↺ Replay
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes kf-slide-in {
  from { left: 16px; opacity: 0; }
  to   { left: calc(100% - 56px); opacity: 1; }
}

@keyframes kf-bounce {
  0%   { left: 16px;                opacity: 0; transform: scale(0.5); }
  30%  { left: calc(40% - 20px);   opacity: 1; transform: scale(1.2); }
  60%  { left: calc(70% - 20px);               transform: scale(0.9); }
  80%  { left: calc(82% - 20px);               transform: scale(1.05); }
  100% { left: calc(100% - 56px);              transform: scale(1); }
}
</style>
