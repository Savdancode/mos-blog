<template>
  <footer class="container foot">
    <div class="box">
      <div class="left">
        <div class="logo">
          <span class="dot" />
          <span>GlassBlog</span>
        </div>
        <p class="muted">
          A modern Vue blog with light default + dark glassmorphism.
        </p>
      </div>

      <div class="right">
        <a class="link" href="https://vuejs.org" target="_blank" rel="noreferrer">Vue</a>
        <span class="sep">•</span>
        <span class="muted">© 2026</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.foot { padding: 30px 0 40px; }
.box {
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: linear-gradient(180deg, var(--card), var(--card2));
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: var(--shadow);
  padding: 18px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.logo { display: inline-flex; align-items: center; gap: 10px; font-weight: 900; }
.dot { width: 10px; height: 10px; border-radius: 999px; background: var(--primary); }
.muted { color: var(--muted); margin: 6px 0 0; }
.right { display: flex; align-items: center; gap: 10px; }
.link { color: var(--text); font-weight: 800; }
.sep { color: var(--muted); }

@media (max-width: 640px) {
  .box { flex-direction: column; align-items: flex-start; }
}
</style>
