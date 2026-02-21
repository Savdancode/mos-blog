<script setup>
import GlassCard from "../components/GlassCard.vue";
</script>

<template>
  <section class="container page">
    <h1>About</h1>
    <p class="muted">
      A simple about page you can customize with your story, skills, and links.
    </p>

    <div class="grid">
      <GlassCard class="card">
        <h2>👤 Who I am</h2>
        <p>
          Write a short intro: what you do, what you’re learning, and what you’re building.
        </p>
        <div class="chips">
          <span class="chip">Vue</span>
          <span class="chip">UI</span>
          <span class="chip">Frontend</span>
        </div>
      </GlassCard>

      <GlassCard class="card">
        <h2>💎 What this site includes</h2>
        <ul>
          <li>Hero + Recent posts</li>
          <li>Blog list + Blog detail</li>
          <li>Mobile hamburger nav</li>
          <li>Contact form</li>
          <li>Light default + Dark glass toggle</li>
        </ul>
      </GlassCard>
    </div>
  </section>
</template>

<style scoped>
.page { padding: 10px 0; }
h1 { margin: 6px 0 8px; letter-spacing: -0.6px; }
.muted { color: var(--muted); margin: 0; line-height: 1.7; }

.grid {
  margin-top: 14px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.card { padding: 16px; }
h2 { margin: 0 0 10px; letter-spacing: -0.4px; }
p, li { color: var(--muted); line-height: 1.7; }
ul { margin: 0; padding-left: 18px; }

.chips { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; }
.chip {
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: rgba(15,195,178,0.12);
  font-weight: 900;
  font-size: 12px;
}

@media (max-width: 820px) {
  .grid { grid-template-columns: 1fr; }
}
</style>
