<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import GlassCard from "../components/GlassCard.vue";
import { getPostBySlug, getRecentPosts } from "../data/posts";
import PostCard from "../components/PostCard.vue";

const route = useRoute();
const router = useRouter();

const post = computed(() => getPostBySlug(route.params.slug));
const more = computed(() => getRecentPosts(3).filter((p) => p.slug !== route.params.slug));

function back() {
  router.push("/blog");
}

function renderMarkdown(md) {
  const escaped = md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return escaped
    .replace(/^### (.*)$/gm, "<h3>$1</h3>")
    .replace(/^## (.*)$/gm, "<h2>$1</h2>")
    .replace(/^# (.*)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n\n/g, "<br/><br/>");
}
</script>

<template>
  <section class="container" v-if="post">
    <div class="top">
      <button class="btn secondary" @click="back">← Back</button>
      <span class="badge">{{ post.readTime }}</span>
    </div>

    <GlassCard class="hero">
      <div class="cover" :style="{ backgroundImage: `url(${post.cover})` }" />
      <div class="inner">
        <div class="meta">
          <span class="date">{{ new Date(post.date).toLocaleDateString() }}</span>
          <div class="tags">
            <span v-for="t in post.tags" :key="t" class="tag">{{ t }}</span>
          </div>
        </div>
        <h1 class="title">{{ post.title }}</h1>
        <p class="excerpt">{{ post.excerpt }}</p>
      </div>
    </GlassCard>

    <GlassCard class="content">
      <div class="prose" v-html="renderMarkdown(post.content)"></div>
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
      <h2>Post not found</h2>
      <p class="muted">That link doesn’t exist. Try going back to the blog.</p>
      <router-link class="btn" to="/blog">Back to Blog</router-link>
    </GlassCard>
  </section>
</template>

<style scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0 12px;
}

.hero { overflow: hidden; }
.cover {
  height: 260px;
  background-size: cover;
  background-position: center;
  border-bottom: 1px solid var(--border);
}
.inner { padding: 16px; }
.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.date { color: var(--muted); font-weight: 800; }
.tags { display: flex; gap: 8px; flex-wrap: wrap; }
.tag {
  padding: 7px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: rgba(15,195,178,0.10);
  font-weight: 800;
  font-size: 12px;
}

.title {
  margin: 12px 0 8px;
  letter-spacing: -0.8px;
  font-size: clamp(28px, 3vw, 42px);
  line-height: 1.05;
}
.excerpt { margin: 0; color: var(--muted); line-height: 1.7; }

.content { margin-top: 14px; padding: 18px; }
.prose :deep(h1), .prose :deep(h2), .prose :deep(h3) {
  letter-spacing: -0.5px;
  margin-top: 0;
}
.prose { color: var(--text); line-height: 1.8; }
.prose :deep(p) { margin: 0 0 12px; color: var(--muted); }

.more { margin-top: 18px; }
.row { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
.moreLink { color: var(--primary); font-weight: 900; }

.grid {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.missing { padding: 18px; margin-top: 12px; }
.missing .muted { color: var(--muted); line-height: 1.7; }

@media (max-width: 980px) {
  .grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 640px) {
  .grid { grid-template-columns: 1fr; }
  .cover { height: 200px; }
}
</style>
