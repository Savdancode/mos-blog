<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import GlassCard from "../components/GlassCard.vue";
import PostCard from "../components/PostCard.vue";
import { request } from "../services/api"; // Assuming export named 'request' is fixed in api.js

const route = useRoute();
const router = useRouter();

const post = ref(null);
const more = ref([]);
const loading = ref(true);
const API_URL = import.meta.env.VITE_API_URL;

const fetchData = async () => {
  loading.value = true;
  try {
    // 1. Fetch current post using the ID from the URL (route.params.id)
    // Strapi needs ?populate=* to include images and categories
    const response = await request(`/blogs/${route.params.id}?populate=*`);
    post.value = response.data;

    // 2. Fetch "More Posts" excluding the one being read
    const moreRes = await request(
      `/blogs?populate=*&pagination[limit]=3&filters[documentId][$ne]=${route.params.id}`
    );
    more.value = moreRes.data;
  } catch (error) {
    console.error("Error loading blog details:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);

function back() {
  router.push("/blog");
}

/**
 * Renders Strapi Blocks JSON into HTML.
 * This looks for the 'text' property within paragraph children as seen in your JSON.
 */
function renderContent(blocks) {
  if (!blocks) return "";
  return blocks
    .map((block) => {
      if (block.type === "paragraph") {
        const text = block.children?.map((c) => c.text).join("") || "";
        return text.trim() ? `<p>${text}</p>` : "";
      }
      return "";
    })
    .join("");
}
</script>

<template>
  <section class="container" v-if="post">
    <div class="top">
      <button class="btn secondary" @click="back">← Back</button>
      <!-- <span class="badge" v-if="post.categorie_posts?.[0]">
        {{ post.categorie_posts[0].title }}
      </span> -->
    </div>

    <GlassCard class="hero">
      <div
        class="cover"
        :style="{
          backgroundImage: `url(${
            post.image?.[0] ? API_URL + post.image[0].url : '/placeholder.jpg'
          })`,
        }"
      />
      <div class="inner">
        <div class="meta">
          <span class="date">{{ new Date(post.publishedAt).toLocaleDateString() }}</span>
          <div class="tags">
            <span v-for="cat in post.categorie_posts" :key="cat.id" class="tag">
              {{ cat.title }}
            </span>
          </div>
        </div>
        <h1 class="title">{{ post.title }}</h1>
        <p class="excerpt">{{ post.shortDescription || post.title }}</p>
      </div>
    </GlassCard>

    <GlassCard class="content">
      <div class="prose" v-html="renderContent(post.content)"></div>
    </GlassCard>

    <section class="more">
      <div class="row">
        <h2>More posts</h2>
        <router-link class="moreLink" to="/blog">All posts →</router-link>
      </div>
      <div class="grid">
        <PostCard v-for="p in more" :key="p.id" :post="p" />
      </div>
    </section>
  </section>

  <section class="container" v-else>
    <GlassCard class="missing">
      <h2 v-if="loading">Loading...</h2>
      <template v-else>
        <h2>Post not found</h2>
        <p class="muted">That link doesn’t exist. Try going back to the blog.</p>
        <router-link class="btn" to="/blog">Back to Blog</router-link>
      </template>
    </GlassCard>
  </section>
</template>

<style scoped>
/* All your styles remain exactly the same as requested */
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0 12px;
}
.hero {
  overflow: hidden;
}
.cover {
  height: 260px;
  background-size: cover;
  background-position: center;
  border-bottom: 1px solid var(--border);
}
.inner {
  padding: 16px;
}
.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.date {
  color: var(--muted);
  font-weight: 800;
}
.tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.tag {
  padding: 7px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: rgba(15, 195, 178, 0.1);
  font-weight: 800;
  font-size: 12px;
}
.title {
  margin: 12px 0 8px;
  letter-spacing: -0.8px;
  font-size: clamp(28px, 3vw, 42px);
  line-height: 1.05;
}
.excerpt {
  margin: 0;
  color: var(--muted);
  line-height: 1.7;
}
.content {
  margin-top: 14px;
  padding: 18px;
}
.prose :deep(h1),
.prose :deep(h2),
.prose :deep(h3) {
  letter-spacing: -0.5px;
  margin-top: 0;
}
.prose {
  color: var(--text);
  line-height: 1.8;
}
.prose :deep(p) {
  margin: 0 0 12px;
  color: var(--muted);
}
.more {
  margin-top: 18px;
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
}
.moreLink {
  color: var(--primary);
  font-weight: 900;
}
.grid {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}
.missing {
  padding: 18px;
  margin-top: 12px;
}
.missing .muted {
  color: var(--muted);
  line-height: 1.7;
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
  .cover {
    height: 200px;
  }
}
</style>
