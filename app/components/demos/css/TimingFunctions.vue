<script setup lang="ts">
defineProps<{
  preview?: boolean
}>()

const easings = [
  { name: 'linear', value: 'linear' },
  { name: 'ease', value: 'ease' },
  { name: 'ease-in', value: 'ease-in' },
  { name: 'ease-out', value: 'ease-out' },
  { name: 'ease-in-out', value: 'ease-in-out' },
  { name: 'cubic-bezier (back)', value: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)' },
]

const duration = ref(1.5)
const playKey = ref(0)

function replay() {
  playKey.value++
}
</script>

<template>
  <!-- preview -->
  <div v-if="preview" class="tf-preview">
    <div class="tf-track">
      <div class="tf-dot tf-linear" />
    </div>
    <div class="tf-track">
      <div class="tf-dot tf-bezier" />
    </div>
  </div>

  <!-- full -->
  <div v-else class="flex flex-col gap-6">
    <div
      class="flex flex-col gap-4 rounded-xl border border-[var(--color-border)] bg-black/20 p-5"
    >
      <div
        v-for="e in easings"
        :key="e.name"
        class="flex items-center gap-3"
      >
        <span class="w-40 shrink-0 truncate font-mono text-xs text-gray-400">{{ e.name }}</span>
        <div class="tf-track flex-1">
          <div
            :key="playKey"
            class="tf-dot"
            :style="{
              animationDuration: `${duration}s`,
              animationTimingFunction: e.value,
            }"
          />
        </div>
      </div>
    </div>

    <div class="grid gap-5 sm:grid-cols-[1fr_auto]">
      <label class="flex flex-col gap-1.5">
        <span class="font-mono text-xs text-gray-400"
          >duration: <span class="text-[var(--color-accent-css)]">{{ duration }}s</span></span
        >
        <input
          v-model.number="duration"
          type="range"
          min="0.4"
          max="4"
          step="0.1"
          class="accent-[var(--color-accent-css)]"
        />
      </label>

      <button
        class="self-end rounded-lg border border-[var(--color-accent-css)] bg-[var(--color-accent-css)]/10 px-5 py-2 font-mono text-sm text-[var(--color-accent-css)] transition-colors hover:bg-[var(--color-accent-css)]/20"
        @click="replay"
      >
        ▶ Replay
      </button>
    </div>
  </div>
</template>

<style scoped>
.tf-track {
  position: relative;
  height: 18px;
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.05);
}
.tf-dot {
  position: absolute;
  top: 1px;
  left: 1px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00d4ff, #646cff);
  box-shadow: 0 0 12px rgba(0, 212, 255, 0.7);
  animation-name: tf-move;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-fill-mode: forwards;
}

@keyframes tf-move {
  from {
    left: 1px;
  }
  to {
    left: calc(100% - 17px);
  }
}

/* preview */
.tf-preview {
  display: flex;
  width: 70%;
  flex-direction: column;
  gap: 10px;
}
.tf-linear {
  animation-duration: 1.8s;
  animation-timing-function: linear;
}
.tf-bezier {
  animation-duration: 1.8s;
  animation-timing-function: cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

@media (prefers-reduced-motion: reduce) {
  .tf-dot {
    animation: none !important;
    left: calc(50% - 8px);
  }
}
</style>
