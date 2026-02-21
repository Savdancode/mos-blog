<script setup>
import GlassCard from "./GlassCard.vue";
</script>

<template>
  <section class="container hero">
    <div class="grid">
      <div class="left">
        <span class="badge">Primary: #0fc3b2 • Vue 3 • Glass UI</span>
        <h1 class="title">
          A <span class="accent">modern</span> blog with
          <span class="accent">fancy glass</span> design.
        </h1>
        <p class="desc">
          Clean light mode by default, and a stunning dark glassmorphism mode when you want the “wow”.
          Fully responsive with a mobile hamburger menu.
        </p>

        <div class="actions">
          <router-link class="btn" to="/blog">Explore Blog</router-link>
          <router-link class="btn secondary" to="/contact">Contact</router-link>
        </div>

        <div class="stats">
          <div class="stat">
            <div class="k">Fast</div>
            <div class="v">Vite + Vue</div>
          </div>
          <div class="stat">
            <div class="k">Clean</div>
            <div class="v">Glass components</div>
          </div>
          <div class="stat">
            <div class="k">Responsive</div>
            <div class="v">Mobile-first</div>
          </div>
        </div>
      </div>

      <GlassCard class="right">
        <div class="blob" />
        <div class="card">
          <div class="miniTop">
            <span class="pill">Hero Card</span>
            <span class="pill muted">Glass</span>
          </div>
          <h3>Premium feel</h3>
          <p>
            Subtle gradients, soft borders, and blur give you a “fancy app” vibe without heavy libraries.
          </p>
          <div class="miniRow">
            <span class="chip">Typography</span>
            <span class="chip">Depth</span>
            <span class="chip">Motion</span>
          </div>
        </div>
      </GlassCard>
    </div>
  </section>
</template>

<style scoped>
.hero { padding: 26px 0 8px; }
.grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 18px;
  align-items: stretch;
}

.title {
  font-size: clamp(34px, 3.6vw, 56px);
  line-height: 1.02;
  margin: 14px 0 10px;
  letter-spacing: -1px;
}

.accent {
  color: var(--primary);
  text-shadow: 0 18px 50px rgba(15,195,178,0.25);
}

.desc {
  color: var(--muted);
  font-size: 16px;
  line-height: 1.7;
  max-width: 55ch;
  margin: 0;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 16px;
  flex-wrap: wrap;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-top: 18px;
}

.stat {
  border-radius: 16px;
  border: 1px solid var(--border);
  background: var(--card2);
  padding: 12px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.k { font-weight: 900; }
.v { color: var(--muted); font-weight: 700; margin-top: 4px; font-size: 13px; }

.right {
  position: relative;
  overflow: hidden;
  padding: 16px;
}

.blob {
  position: absolute;
  inset: -120px -120px auto auto;
  width: 320px;
  height: 320px;
  background: radial-gradient(circle at 30% 30%, rgba(15,195,178,0.9), transparent 60%),
              radial-gradient(circle at 70% 70%, rgba(255,255,255,0.25), transparent 60%);
  filter: blur(6px);
  opacity: 0.45;
  transform: rotate(10deg);
}

.card {
  position: relative;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(0,0,0,0.02);
  padding: 16px;
}

.card h3 { margin: 10px 0 8px; letter-spacing: -0.4px; }
.card p { margin: 0; color: var(--muted); line-height: 1.7; }

.miniTop { display: flex; gap: 10px; }
.pill {
  display: inline-flex;
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--card2);
  font-weight: 800;
}
.pill.muted { color: var(--muted); font-weight: 700; }

.miniRow { display: flex; gap: 8px; margin-top: 14px; flex-wrap: wrap; }
.chip {
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: rgba(15,195,178,0.12);
  font-weight: 800;
  font-size: 12px;
}

@media (max-width: 900px) {
  .grid { grid-template-columns: 1fr; }
}
</style>
