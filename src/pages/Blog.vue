<script setup>
import { computed, ref } from "vue";
import { posts } from "../data/posts";
import PostCard from "../components/PostCard.vue";
import GlassCard from "../components/GlassCard.vue";

const q = ref("");
const tag = ref("All");

const tags = computed(() => {
  const s = new Set();
  posts.forEach((p) => p.tags.forEach((t) => s.add(t)));
  return ["All", ...Array.from(s)];
});

const filtered = computed(() => {
  const query = q.value.trim().toLowerCase();
  return [...posts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .filter((p) => (tag.value === "All" ? true : p.tags.includes(tag.value)))
    .filter((p) => {
      if (!query) return true;
      return (
        p.title.toLowerCase().includes(query) ||
        p.excerpt.toLowerCase().includes(query) ||
        p.tags.join(" ").toLowerCase().includes(query)
      );
    });
});
</script>

<template>
  <section class="container head">
    <h1>Blog</h1>
    <p class="muted">
      Browse posts, search by keyword, and filter by tag.
    </p>

    <GlassCard class="controls">
      <input class="input" v-model="q" placeholder="Search posts..." />
      <select class="select" v-model="tag">
        <option v-for="t in tags" :key="t" :value="t">{{ t }}</option>
      </select>
    </GlassCard>
  </section>

  <section class="container">
    <div v-if="filtered.length === 0" class="empty">
      No posts found. Try another search.
    </div>

    <div class="grid">
      <PostCard v-for="p in filtered" :key="p.id" :post="p" />
    </div>
  </section>
</template>

<style scoped>
.head { padding: 10px 0 10px; }
h1 { margin: 6px 0 8px; letter-spacing: -0.6px; }
.muted { color: var(--muted); margin: 0; line-height: 1.7; }

.controls {
  margin-top: 14px;
  padding: 12px;
  display: grid;
  grid-template-columns: 1fr 220px;
  gap: 10px;
  align-items: center;
}

.select {
  width: 100%;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: var(--card2);
  color: var(--text);
  padding: 12px 14px;
  outline: none;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.grid {
  margin-top: 14px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.empty {
  margin-top: 14px;
  color: var(--muted);
  padding: 16px;
  border-radius: var(--radius);
  border: 1px dashed var(--border);
  background: var(--card2);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

@media (max-width: 980px) {
  .grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 740px) {
  .controls { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .grid { grid-template-columns: 1fr; }
}
</style>
