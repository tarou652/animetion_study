<script setup lang="ts">
defineProps<{
  preview?: boolean
}>()

const types = ['slide', 'fade', 'bounce', 'pulse'] as const
type AnimType = (typeof types)[number]

const type = ref<AnimType>('slide')
const duration = ref(1.2)
const playKey = ref(0)

function replay() {
  playKey.value++
}
</script>

<template>
  <!-- preview: 常時ループする小さなデモ -->
  <div v-if="preview" class="kf-preview">
    <div class="kf-preview-box" />
  </div>

  <!-- full: コントロール付き -->
  <div v-else class="flex flex-col gap-6">
    <div
      class="relative flex h-56 items-center justify-center overflow-hidden rounded-xl border border-[var(--color-border)] bg-black/20"
    >
      <div
        :key="playKey"
        class="kf-box"
        :class="`kf-${type}`"
        :style="{ animationDuration: `${duration}s` }"
      />
    </div>

    <div class="grid gap-5 sm:grid-cols-[1fr_auto]">
      <div class="flex flex-col gap-4">
        <label class="flex flex-col gap-1.5">
          <span class="font-mono text-xs text-gray-400"
            >animation-name: <span class="text-[var(--color-accent-css)]">{{ type }}</span></span
          >
          <div class="flex flex-wrap gap-2">
            <button
              v-for="t in types"
              :key="t"
              class="rounded-md border px-3 py-1 font-mono text-xs transition-colors"
              :class="
                type === t
                  ? 'border-[var(--color-accent-css)] bg-[var(--color-accent-css)]/15 text-[var(--color-accent-css)]'
                  : 'border-[var(--color-border)] text-gray-400 hover:text-white'
              "
              @click="type = t; replay()"
            >
              {{ t }}
            </button>
          </div>
        </label>

        <label class="flex flex-col gap-1.5">
          <span class="font-mono text-xs text-gray-400"
            >animation-duration:
            <span class="text-[var(--color-accent-css)]">{{ duration }}s</span></span
          >
          <input
            v-model.number="duration"
            type="range"
            min="0.2"
            max="3"
            step="0.1"
            class="accent-[var(--color-accent-css)]"
          />
        </label>
      </div>

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
.kf-box {
  width: 64px;
  height: 64px;
  border-radius: 14px;
  background: linear-gradient(135deg, #00d4ff, #646cff);
  box-shadow: 0 8px 30px -8px rgba(0, 212, 255, 0.6);
  animation-timing-function: ease;
  animation-fill-mode: forwards;
}

.kf-slide {
  animation-name: kf-slide;
}
.kf-fade {
  animation-name: kf-fade;
}
.kf-bounce {
  animation-name: kf-bounce;
}
.kf-pulse {
  animation-name: kf-pulse;
}

@keyframes kf-slide {
  from {
    transform: translateX(-180px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes kf-fade {
  from {
    opacity: 0;
    transform: scale(0.6);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes kf-bounce {
  0% {
    transform: translateY(-120px);
    opacity: 0;
  }
  60% {
    transform: translateY(20px);
    opacity: 1;
  }
  80% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes kf-pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.35);
  }
}

/* preview */
.kf-preview {
  display: flex;
  align-items: center;
  justify-content: center;
}
.kf-preview-box {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: linear-gradient(135deg, #00d4ff, #646cff);
  animation: kf-pulse 1.6s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .kf-box,
  .kf-preview-box {
    animation: none !important;
    opacity: 1;
    transform: none;
  }
}
</style>
