<script setup>
import { ref, onMounted, computed } from "vue";
import GlassCard from "../components/GlassCard.vue";
import { fetchAbout } from "../services/api";

const aboutData = ref(null);
const loading = ref(true);

// ✅ Helper to extract text from Strapi "Blocks" JSON
const rawText = computed(() => {
  if (!aboutData.value?.description) return "";

  return aboutData.value.description
    .map((block) => {
      if (block.type === "paragraph" || block.type === "heading") {
        return block.children.map((child) => child.text).join("");
      }
      if (block.type === "list") {
        return block.children
          .map((item) => "• " + item.children.map((c) => c.text).join(""))
          .join("\n");
      }
      return "";
    })
    .join("\n\n");
});

onMounted(async () => {
  try {
    loading.value = true;
    const response = await fetchAbout();
    // ✅ Extracting data directly from your API response structure
    aboutData.value = response.data || response;
  } catch (err) {
    console.error("Failed to load about data:", err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <section class="container page">
    <h1>{{ aboutData?.title || "About" }}</h1>

    <div v-if="loading" class="loading">Loading story...</div>

    <div v-else class="single-column">
      <GlassCard class="card bio-section">
        <h2>👤 Professional Summary</h2>
        <p class="content-text">{{ rawText }}</p>

        <div class="chips" v-if="aboutData?.tags?.length">
          <span v-for="tag in aboutData.tags" :key="tag.id" class="chip">
            {{ tag.name }}
          </span>
        </div>
      </GlassCard>
    </div>
  </section>
</template>

<style scoped>
.page {
  padding: 10px 0;
}
h1 {
  margin: 6px 0 8px;
  letter-spacing: -0.6px;
}

.single-column {
  margin-top: 14px;
}

.card {
  padding: 24px;
}
h2 {
  margin: 0 0 16px;
  font-size: 1.3rem;
}

/* ✅ Ensures line breaks from Strapi are visible */
.content-text {
  color: var(--muted);
  line-height: 1.8;
  white-space: pre-wrap;
  font-size: 1rem;
}

.chips {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}
.chip {
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: rgba(15, 195, 178, 0.12);
  color: var(--primary);
  font-weight: 700;
  font-size: 13px;
  transition: 0.2s;
}

.chip:hover {
  background: rgba(15, 195, 178, 0.2);
  transform: translateY(-2px);
}

.loading {
  margin-top: 20px;
  color: var(--muted);
}
</style>
