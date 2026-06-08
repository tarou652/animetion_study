<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen flex flex-col" style="background-color: #0a0a0f;">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
