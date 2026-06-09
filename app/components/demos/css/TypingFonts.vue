<script setup lang="ts">
defineProps<{
  preview?: boolean
}>()

// フル表示で打ち込むフレーズ（等幅フォント前提なので ASCII 中心にする）
const phrases = ['npm run dev', 'const future = build()', 'Hello, Animation Lab!'] as const
const text = ref<string>(phrases[0])
const duration = ref(2)
const playKey = ref(0)

function replay() {
  playKey.value++
}
function setPhrase(p: string) {
  text.value = p
  replay()
}

// テキストに合わせて steps() の段数・幅(ch)・再生時間を CSS 変数で渡す
const lineStyle = computed(() => ({
  '--tf-ch': `${text.value.length}ch`,
  '--tf-steps': String(text.value.length),
  '--tf-dur': `${duration.value}s`,
}))
</script>

<template>
  <!-- preview: 小さくループするタイピング -->
  <div v-if="preview" class="tf-preview">
    <span class="tf-line tf-line--preview">Hello, World</span>
  </div>

  <!-- full: コントロール付き本体 -->
  <div v-else class="flex flex-col gap-6">
    <div
      class="flex min-h-[4rem] items-center overflow-hidden rounded-xl border border-[var(--color-border)] bg-black/20 px-6"
    >
      <span :key="playKey" class="tf-line" :style="lineStyle">{{ text }}</span>
    </div>

    <div class="grid gap-5 sm:grid-cols-[1fr_auto]">
      <div class="flex flex-col gap-4">
        <label class="flex flex-col gap-1.5">
          <span class="font-mono text-xs text-gray-400">
            text: <span class="text-[var(--color-accent-css)]">steps({{ text.length }})</span>
          </span>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="p in phrases"
              :key="p"
              class="rounded-md border px-3 py-1 font-mono text-xs transition-colors"
              :class="
                text === p
                  ? 'border-[var(--color-accent-css)] bg-[var(--color-accent-css)]/15 text-[var(--color-accent-css)]'
                  : 'border-[var(--color-border)] text-gray-400 hover:text-white'
              "
              @click="setPhrase(p)"
            >
              {{ p }}
            </button>
          </div>
        </label>

        <label class="flex flex-col gap-1.5">
          <span class="font-mono text-xs text-gray-400">
            animation-duration:
            <span class="text-[var(--color-accent-css)]">{{ duration }}s</span>
          </span>
          <input
            v-model.number="duration"
            type="range"
            min="0.5"
            max="4"
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
.tf-line {
  --tf-ch: 0ch;
  --tf-steps: 1;
  --tf-dur: 2s;

  display: inline-block;
  max-width: 100%;
  width: var(--tf-ch);
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid var(--color-accent-css);
  font-family: 'JetBrains Mono', 'Space Mono', monospace;
  font-size: 1.1rem;
  color: #e6e6ee;

  /* 1本目: width を steps() で区切って 1 文字ずつ表示 / 2本目: キャレット点滅 */
  animation-name: tf-typing, tf-caret;
  animation-duration: var(--tf-dur), 0.8s;
  animation-timing-function: steps(var(--tf-steps), end), step-end;
  animation-iteration-count: 1, infinite;
  animation-fill-mode: forwards, none;
}

@keyframes tf-typing {
  from {
    width: 0;
  }
  to {
    width: var(--tf-ch);
  }
}

@keyframes tf-caret {
  50% {
    border-color: transparent;
  }
}

/* preview: 打って消してを繰り返す（alternate） */
.tf-preview {
  display: flex;
  align-items: center;
  justify-content: center;
}
.tf-line--preview {
  --tf-ch: 12ch;
  --tf-steps: 12;
  --tf-dur: 2.4s;
  font-size: 0.85rem;
  animation-iteration-count: infinite, infinite;
  animation-direction: alternate, normal;
  animation-fill-mode: none, none;
}

/* アクセシビリティ: モーションを抑制する設定では全文を即時表示しキャレットも止める */
@media (prefers-reduced-motion: reduce) {
  .tf-line,
  .tf-line--preview {
    animation: none !important;
    width: var(--tf-ch);
    border-right-color: transparent;
  }
}
</style>
