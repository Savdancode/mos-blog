<script setup>
import { getRecentPosts } from "../data/posts";
import PostCard from "./PostCard.vue";

const props = defineProps({
  limit: { type: Number, default: 3 },
});

const recent = getRecentPosts(props.limit);
</script>

<template>
  <section class="container section">
    <div class="top">
      <h2>Recent Posts</h2>
      <router-link class="more" to="/blog">View all →</router-link>
    </div>

    <div class="grid">
      <PostCard v-for="p in recent" :key="p.id" :post="p" />
    </div>
  </section>
</template>

<style scoped>
.section { padding: 18px 0 0; }
.top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}
.more { color: var(--primary); font-weight: 900; }
.grid {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}
@media (max-width: 980px) {
  .grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 640px) {
  .grid { grid-template-columns: 1fr; }
}
</style>
