<script setup lang="ts">
defineProps<{
  preview?: boolean
}>()
</script>

<template>
  <!-- preview -->
  <div v-if="preview" class="ts-preview">
    <button class="ts-preview-btn">hover</button>
  </div>

  <!-- full -->
  <div v-else class="flex flex-col gap-6">
    <p class="font-mono text-xs text-gray-400">
      下の要素にマウスを乗せる / クリック / Tab でフォーカスして状態変化を確認してください。
    </p>

    <div class="grid gap-5 sm:grid-cols-3">
      <!-- hover -->
      <div class="flex flex-col items-center gap-3 rounded-xl border border-[var(--color-border)] bg-black/20 p-6">
        <button class="ts-card ts-hover">Hover me</button>
        <code class="font-mono text-[0.7rem] text-[var(--color-accent-css)]">:hover</code>
      </div>

      <!-- focus -->
      <div class="flex flex-col items-center gap-3 rounded-xl border border-[var(--color-border)] bg-black/20 p-6">
        <button class="ts-card ts-focus">Focus me</button>
        <code class="font-mono text-[0.7rem] text-[var(--color-accent-css)]">:focus</code>
      </div>

      <!-- active -->
      <div class="flex flex-col items-center gap-3 rounded-xl border border-[var(--color-border)] bg-black/20 p-6">
        <button class="ts-card ts-active">Press me</button>
        <code class="font-mono text-[0.7rem] text-[var(--color-accent-css)]">:active</code>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ts-card {
  width: 110px;
  height: 64px;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  background: rgba(255, 255, 255, 0.04);
  color: #c8c8d0;
  font-family: var(--font-mono, monospace);
  font-size: 0.8rem;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease,
    box-shadow 0.3s ease, color 0.3s ease;
}

.ts-hover:hover {
  transform: translateY(-6px) scale(1.05);
  background: rgba(0, 212, 255, 0.12);
  color: #00d4ff;
  box-shadow: 0 12px 30px -10px rgba(0, 212, 255, 0.6);
}

.ts-focus:focus {
  outline: none;
  background: rgba(100, 108, 255, 0.15);
  color: #646cff;
  box-shadow: 0 0 0 3px rgba(100, 108, 255, 0.5);
}

.ts-active:active {
  transform: scale(0.92);
  background: rgba(0, 212, 255, 0.2);
  color: #00d4ff;
}

/* preview */
.ts-preview {
  display: flex;
  align-items: center;
  justify-content: center;
}
.ts-preview-btn {
  width: 90px;
  height: 50px;
  border-radius: 11px;
  border: 1px solid var(--color-border);
  background: rgba(255, 255, 255, 0.04);
  color: #c8c8d0;
  font-family: var(--font-mono, monospace);
  font-size: 0.75rem;
  animation: ts-pulse 2.4s ease-in-out infinite;
}

@keyframes ts-pulse {
  0%,
  100% {
    transform: translateY(0) scale(1);
    box-shadow: 0 0 0 0 rgba(0, 212, 255, 0);
    color: #c8c8d0;
  }
  50% {
    transform: translateY(-6px) scale(1.05);
    box-shadow: 0 12px 30px -10px rgba(0, 212, 255, 0.6);
    color: #00d4ff;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ts-card {
    transition: none !important;
  }
  .ts-preview-btn {
    animation: none !important;
  }
}
</style>
