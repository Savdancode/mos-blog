<script setup>
import GlassCard from "./GlassCard.vue";

defineProps({
  post: { type: Object, required: true },
});
</script>

<template>
  <router-link :to="`/blog/${post.slug}`" class="wrap">
    <GlassCard class="card">
      <div class="cover" :style="{ backgroundImage: `url(${post.cover})` }" />
      <div class="body">
        <div class="meta">
          <span class="badge">{{ post.readTime }}</span>
          <span class="date">{{ new Date(post.date).toLocaleDateString() }}</span>
        </div>
        <h3 class="title">{{ post.title }}</h3>
        <p class="excerpt">{{ post.excerpt }}</p>
        <div class="tags">
          <span v-for="t in post.tags" :key="t" class="tag">{{ t }}</span>
        </div>
      </div>
    </GlassCard>
  </router-link>
</template>

<style scoped>
.wrap { display: block; }
.card { overflow: hidden; }
.cover {
  height: 170px;
  background-size: cover;
  background-position: center;
  border-bottom: 1px solid var(--border);
  filter: saturate(1.05);
}
.body { padding: 14px; }
.meta { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.date { color: var(--muted); font-weight: 700; font-size: 13px; }
.title { margin: 10px 0 8px; letter-spacing: -0.4px; }
.excerpt { margin: 0; color: var(--muted); line-height: 1.7; }
.tags { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; }
.tag {
  padding: 7px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: rgba(15,195,178,0.10);
  font-weight: 800;
  font-size: 12px;
}
</style>
