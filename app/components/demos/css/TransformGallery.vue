<script setup lang="ts">
defineProps<{
  preview?: boolean
}>()

const items = [
  { label: 'translate', value: 'translate(20px, -16px)' },
  { label: 'scale', value: 'scale(1.4)' },
  { label: 'rotate', value: 'rotate(45deg)' },
  { label: 'skew', value: 'skew(18deg, 6deg)' },
  { label: 'scaleX', value: 'scaleX(0.5)' },
  { label: 'rotate3d', value: 'perspective(300px) rotateY(50deg)' },
]

const applied = ref(true)
</script>

<template>
  <!-- preview -->
  <div v-if="preview" class="tg-preview">
    <div class="tg-preview-box" />
  </div>

  <!-- full -->
  <div v-else class="flex flex-col gap-6">
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
      <div
        v-for="it in items"
        :key="it.label"
        class="flex flex-col items-center gap-3 rounded-xl border border-[var(--color-border)] bg-black/20 p-5"
      >
        <div class="flex h-24 items-center justify-center">
          <div
            class="tg-box"
            :style="{ transform: applied ? it.value : 'none' }"
          />
        </div>
        <code class="font-mono text-[0.7rem] text-[var(--color-accent-css)]">{{ it.label }}</code>
      </div>
    </div>

    <button
      class="self-start rounded-lg border border-[var(--color-accent-css)] bg-[var(--color-accent-css)]/10 px-5 py-2 font-mono text-sm text-[var(--color-accent-css)] transition-colors hover:bg-[var(--color-accent-css)]/20"
      @click="applied = !applied"
    >
      {{ applied ? 'Reset (transform: none)' : 'Apply transforms' }}
    </button>
  </div>
</template>

<style scoped>
.tg-box {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: linear-gradient(135deg, #00d4ff, #646cff);
  box-shadow: 0 6px 24px -8px rgba(0, 212, 255, 0.6);
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* preview */
.tg-preview {
  display: flex;
  align-items: center;
  justify-content: center;
}
.tg-preview-box {
  width: 46px;
  height: 46px;
  border-radius: 11px;
  background: linear-gradient(135deg, #00d4ff, #646cff);
  animation: tg-spin 3s ease-in-out infinite;
}

@keyframes tg-spin {
  0% {
    transform: rotate(0) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(1.3);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .tg-box {
    transition: none !important;
  }
  .tg-preview-box {
    animation: none !important;
  }
}
</style>
