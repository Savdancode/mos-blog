<script setup>
import { ref, onMounted } from "vue";
import { fetchPosts } from "../services/api";
import PostCard from "./PostCard.vue";

const props = defineProps({
  limit: { type: Number, default: 3 },
});

const recent = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    loading.value = true;

    // ✅ Call fetchPosts with "All" to ensure it gets everything for the homepage
    const response = await fetchPosts("All");

    // ✅ Based on your JSON, 'response' IS the array now because your api.js returns 'json.data'
    if (response && Array.isArray(response)) {
      recent.value = response.slice(0, props.limit);
    } else if (response && response.data) {
      // Fallback in case your api.js is still returning the full object
      recent.value = response.data.slice(0, props.limit);
    }

    console.log("Recent posts in component:", recent.value);
  } catch (error) {
    console.error("Failed to fetch recent posts:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <section class="container section">
    <div class="top">
      <h2>Recent Posts</h2>
      <router-link class="more" to="/blog">View all →</router-link>
    </div>

    <div v-if="loading" class="grid">
      <p>Loading posts...</p>
    </div>

    <div v-else class="grid">
      <PostCard v-for="p in recent" :key="p.id" :post="p" />
    </div>
  </section>
</template>

<style scoped>
.section {
  padding: 18px 0 0;
}
.top {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}
.more {
  color: var(--primary);
  font-weight: 900;
}
.grid {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}
@media (max-width: 980px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 640px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
