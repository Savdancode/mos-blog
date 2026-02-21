<template>
  <div class="glass">
    <slot />
  </div>
</template>

<style scoped>
.glass {
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: linear-gradient(180deg, var(--card), var(--card2));
  box-shadow: var(--shadow);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}
</style>
