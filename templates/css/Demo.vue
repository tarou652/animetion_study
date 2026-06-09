<!--
  デモコンポーネントのテンプレート。

  使い方:
  1. このファイルを app/components/demos/css/<YourDemo>.vue にコピー
  2. クラス名 demo-* を適宜リネームし、アニメーションを実装
  3. content/css/<slug>.md の frontmatter `component:` を
     自動インポート名（例: app/components/demos/css/YourDemo.vue → DemosCssYourDemo）に合わせる

  規約:
  - preview prop で「カード用の小さな常時アニメ」と「個別ページのフル表示」を切り替える
  - アニメーションは transform / opacity のみを使う（GPU 合成）
  - @media (prefers-reduced-motion: reduce) を必ず実装する
  - インラインの @click で複数文を書くときは ; 区切り（例: @click="a = b; fn()"）
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
    <div class="demo-preview-box" />
  </div>

  <!-- full: コントロール付きの本体 -->
  <div v-else class="flex flex-col gap-6">
    <div
      class="relative flex h-56 items-center justify-center overflow-hidden rounded-xl border border-[var(--color-border)] bg-black/20"
    >
      <div :key="playKey" class="demo-box" />
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
/* フル表示の箱 */
.demo-box {
  width: 64px;
  height: 64px;
  border-radius: 14px;
  background: linear-gradient(135deg, #00d4ff, #646cff);
  box-shadow: 0 8px 30px -8px rgba(0, 212, 255, 0.6);
  /* TODO: ここに animation を実装（transform / opacity のみ推奨） */
  animation: demo-pulse 1.6s ease-in-out infinite;
}

/* preview の箱（小さめ・常時ループ） */
.demo-preview {
  display: flex;
  align-items: center;
  justify-content: center;
}
.demo-preview-box {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: linear-gradient(135deg, #00d4ff, #646cff);
  animation: demo-pulse 1.6s ease-in-out infinite;
}

@keyframes demo-pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.35);
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
