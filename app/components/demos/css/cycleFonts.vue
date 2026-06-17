<!--
  転がるボール: 1 つの transform に translateX() と rotate() を並べて
  「移動」と「回転」を同時に適用するデモ。
  transform を複数回書くと後勝ちで上書きされるため、必ず 1 宣言にまとめる。
-->
<script setup lang="ts">
defineProps<{
  preview?: boolean // true のとき AnimationCard のサムネイル用に小さく表示
}>()

// フル表示で使うコントロール例（不要なら削除）
const playKey = ref(0)
function replay() {
  playKey.value++
}
</script>

<template>
  <!-- preview: カード用の小さな常時ループ -->
  <div v-if="preview" class="demo-preview">
    <div class="demo-preview-box" >
        <p>1</p>
    </div>
  </div>

  <!-- full: コントロール付きの本体 -->
  <div v-else class="flex flex-col gap-6">
    <div
      class="relative flex h-56 items-center justify-center overflow-hidden rounded-xl border border-[var(--color-border)] bg-black/20"
    >
      <div :key="playKey" class="demo-box"><span>1</span></div>
    </div>

    <!-- コントロール（ボタン・スライダーなど）をここに追加 -->
    <div class="flex justify-end">
      <button
        class="rounded-lg border border-[var(--color-accent-css)] bg-[var(--color-accent-css)]/10 px-5 py-2 font-mono text-sm text-[var(--color-accent-css)] transition-colors hover:bg-[var(--color-accent-css)]/20"
        @click="replay"
      >
        ▶ Replay
      </button>
    </div>
  </div>
</template>

<style scoped>
/* フル表示の転がるボール */
.demo-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00d4ff, #646cff);
  box-shadow: 0 8px 30px -8px rgba(0, 212, 255, 0.6);
  color: #fff;
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.4rem;
  font-weight: 700;
  /* translateX と rotate を 1 宣言にまとめて同時適用（→ @keyframes roll） */
  animation: roll 3s ease-in-out infinite;
}

/* preview の箱（小さめ・常時ループ） */
.demo-preview {
  display: flex;
  align-items: center;
  justify-content: center;
}
.demo-preview-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00d4ff, #646cff);
  animation: roll-mini 3s ease-in-out infinite;
}
.demo-preview-box p {
  color: #fff;
  font-size: 1.1em;
  font-weight: 700;
}

/*
  右へ転がって戻る。translateX（移動）と rotate（回転）を 1 つの transform に
  並べることで両方が同時に効き、「転がっている」ように見える。
  transform を別行で 2 回書くと後勝ちで一方が消えるので必ずまとめる。
*/
@keyframes roll {
  0% {
    transform: translateX(-130px) rotate(0deg);
  }
  50% {
    transform: translateX(130px) rotate(360deg); /* 右へ → 順回転 */
  }
  100% {
    transform: translateX(-130px) rotate(0deg); /* 左へ戻る → 逆回転 */
  }
}
@keyframes roll-mini {
  0% {
    transform: translateX(-32px) rotate(0deg);
  }
  50% {
    transform: translateX(32px) rotate(360deg);
  }
  100% {
    transform: translateX(-32px) rotate(0deg);
  }
}

/* アクセシビリティ: アニメーションを抑制する設定を尊重する */
@media (prefers-reduced-motion: reduce) {
  .demo-box,
  .demo-preview-box {
    animation: none !important;
    transform: none;
  }
}
</style>
