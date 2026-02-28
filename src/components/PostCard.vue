<script setup>
import GlassCard from "./GlassCard.vue";

const props = defineProps({
  post: { type: Object, required: true },
});

// Define your backend URL here so images load
const STRAPI_URL = import.meta.env.VITE_API_URL;

const getExcerpt = (content) => {
  if (!content || !Array.isArray(content)) return "";
  const firstParagraph = content.find(
    (block) => block.type === "paragraph" && block.children?.[0]?.text?.trim() !== ""
  );
  return firstParagraph ? firstParagraph.children[0].text : "";
};
</script>

<template>
  <router-link :to="`/blog/${post.documentId}`" class="wrap">
    <GlassCard class="card">
      <div
        class="cover"
        :style="{
          backgroundImage: `url(${
            post.image?.[0]?.url ? post.image[0].url : '/placeholder.jpg'
          })`,
        }"
      />
      <div class="body">
        <div class="meta">
          <!-- <span class="badge">News</span> -->
          <span class="date">{{ new Date(post.publishedAt).toLocaleDateString() }}</span>
        </div>

        <h3 class="title">{{ post.title }}</h3>

        <p class="excerpt">{{ getExcerpt(post.content) }}</p>

        <div class="categories">
          <span v-for="cat in post.categorie_posts" :key="cat.id" class="category">
            {{ cat.title }}
          </span>
        </div>
      </div>
    </GlassCard>
  </router-link>
</template>

<style scoped>
.wrap {
  display: block;
  text-decoration: none;
  color: inherit;
}
.card {
  overflow: hidden;
}
.cover {
  height: 200px;
  background-size: cover;
  background-position: center;
  border-bottom: 1px solid var(--border);
}
.body {
  padding: 14px;
}
.meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.date {
  color: var(--muted);
  font-size: 13px;
  font-weight: 700;
}
.title {
  margin: 10px 0 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.excerpt {
  color: var(--muted);
  font-size: 14px;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.categories {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 12px;
}
.category {
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(15, 195, 178, 0.1);
  color: var(--primary);
  font-weight: 800;
  font-size: 12px;
}
</style>
