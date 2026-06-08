<script setup lang="ts">
const props = defineProps<{ preview?: boolean }>()

const tx = ref(30)
const ty = ref(0)
const scale = ref(1.4)
const rotate = ref(45)
const skewX = ref(20)

const boxBase = 'width:56px;height:56px;border-radius:10px;'

const translateStyle = computed(() =>
  `${boxBase}background:linear-gradient(135deg,#00d4ff,#0099cc);transform:translate(${tx.value}px,${ty.value}px);transition:transform 0.3s ease;`
)
const scaleStyle = computed(() =>
  `${boxBase}background:linear-gradient(135deg,#646cff,#4040cc);transform:scale(${scale.value});transition:transform 0.3s ease;`
)
const rotateStyle = computed(() =>
  `${boxBase}background:linear-gradient(135deg,#88ce02,#66aa00);transform:rotate(${rotate.value}deg);transition:transform 0.3s ease;`
)
const skewStyle = computed(() =>
  `${boxBase}background:linear-gradient(135deg,#ff6b35,#cc4400);transform:skewX(${skewX.value}deg);transition:transform 0.3s ease;`
)
</script>

<template>
  <!-- Preview mode -->
  <div v-if="preview" class="grid grid-cols-2 gap-2">
    <div style="width:24px;height:24px;border-radius:5px;background:#00d4ff;transform:translate(4px,-4px);"></div>
    <div style="width:24px;height:24px;border-radius:5px;background:#646cff;transform:scale(1.3);"></div>
    <div style="width:24px;height:24px;border-radius:5px;background:#88ce02;transform:rotate(30deg);"></div>
    <div style="width:24px;height:24px;border-radius:5px;background:#ff6b35;transform:skewX(15deg);"></div>
  </div>

  <!-- Full demo -->
  <div v-else class="w-full">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

      <!-- translate -->
      <div class="glass-card rounded-xl p-5">
        <h4 class="text-xs font-mono mb-4" style="color: #00d4ff;">translate()</h4>
        <div class="h-24 flex items-center justify-center mb-4 rounded-lg" style="background: rgba(0,0,0,0.2);">
          <div :style="translateStyle"></div>
        </div>
        <div class="space-y-2">
          <div class="flex items-center gap-3">
            <span class="text-xs font-mono w-12 flex-shrink-0" style="color: #8888aa;">X: {{ tx }}px</span>
            <input type="range" min="-60" max="60" v-model.number="tx" class="flex-1 accent-[#00d4ff]" />
          </div>
          <div class="flex items-center gap-3">
            <span class="text-xs font-mono w-12 flex-shrink-0" style="color: #8888aa;">Y: {{ ty }}px</span>
            <input type="range" min="-40" max="40" v-model.number="ty" class="flex-1 accent-[#00d4ff]" />
          </div>
        </div>
        <code class="block mt-3 text-xs px-3 py-2 rounded" style="background: rgba(0,212,255,0.06); color: #00d4ff; font-family: 'JetBrains Mono', monospace;">
          transform: translate({{ tx }}px, {{ ty }}px)
        </code>
      </div>

      <!-- scale -->
      <div class="glass-card rounded-xl p-5">
        <h4 class="text-xs font-mono mb-4" style="color: #646cff;">scale()</h4>
        <div class="h-24 flex items-center justify-center mb-4 rounded-lg" style="background: rgba(0,0,0,0.2);">
          <div :style="scaleStyle"></div>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs font-mono w-16 flex-shrink-0" style="color: #8888aa;">{{ scale.toFixed(1) }}</span>
          <input type="range" min="0.2" max="2" step="0.05" v-model.number="scale" class="flex-1 accent-[#646cff]" />
        </div>
        <code class="block mt-3 text-xs px-3 py-2 rounded" style="background: rgba(100,108,255,0.06); color: #646cff; font-family: 'JetBrains Mono', monospace;">
          transform: scale({{ scale.toFixed(2) }})
        </code>
      </div>

      <!-- rotate -->
      <div class="glass-card rounded-xl p-5">
        <h4 class="text-xs font-mono mb-4" style="color: #88ce02;">rotate()</h4>
        <div class="h-24 flex items-center justify-center mb-4 rounded-lg" style="background: rgba(0,0,0,0.2);">
          <div :style="rotateStyle"></div>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs font-mono w-16 flex-shrink-0" style="color: #8888aa;">{{ rotate }}deg</span>
          <input type="range" min="-180" max="180" v-model.number="rotate" class="flex-1 accent-[#88ce02]" />
        </div>
        <code class="block mt-3 text-xs px-3 py-2 rounded" style="background: rgba(136,206,2,0.06); color: #88ce02; font-family: 'JetBrains Mono', monospace;">
          transform: rotate({{ rotate }}deg)
        </code>
      </div>

      <!-- skew -->
      <div class="glass-card rounded-xl p-5">
        <h4 class="text-xs font-mono mb-4" style="color: #ff6b35;">skewX()</h4>
        <div class="h-24 flex items-center justify-center mb-4 rounded-lg" style="background: rgba(0,0,0,0.2);">
          <div :style="skewStyle"></div>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs font-mono w-16 flex-shrink-0" style="color: #8888aa;">{{ skewX }}deg</span>
          <input type="range" min="-45" max="45" v-model.number="skewX" class="flex-1 accent-[#ff6b35]" />
        </div>
        <code class="block mt-3 text-xs px-3 py-2 rounded" style="background: rgba(255,107,53,0.06); color: #ff6b35; font-family: 'JetBrains Mono', monospace;">
          transform: skewX({{ skewX }}deg)
        </code>
      </div>
    </div>
  </div>
</template>
