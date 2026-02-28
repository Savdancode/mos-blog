<script setup>
import { computed, ref, onMounted, watch } from "vue";
import PostCard from "../components/PostCard.vue";
import GlassCard from "../components/GlassCard.vue";
import { fetchCate, fetchPosts } from "../services/api";

const posts = ref([]);
const categories = ref([]);
const loading = ref(true);

const q = ref("");
const selectedCategory = ref("All");

// ✅ Pagination State
const currentPage = ref(1);
const totalPages = ref(1);

// ✅ Reusable Load Function
const loadData = async () => {
  loading.value = true;
  try {
    // Calling fetchPosts with current page and limit of 6
    const res = await fetchPosts(selectedCategory.value, q.value, currentPage.value, 6);
    posts.value = res.data;
    totalPages.value = res.meta.pagination.pageCount;
  } catch (err) {
    console.error("Fetch error:", err);
  } finally {
    loading.value = false;
  }
};

const handleSearch = () => {
  currentPage.value = 1; // Reset to page 1 on new search
  loadData();
};

// ✅ NEW: Watch search input to recall API when cleared
watch(q, (newVal) => {
  if (newVal.trim() === "") {
    handleSearch();
  }
});

// ✅ Reset page and reload when category changes
watch(selectedCategory, () => {
  currentPage.value = 1;
  loadData();
});

// ✅ Reload when page number changes
watch(currentPage, loadData);

const categoryList = computed(() => {
  const base = ["All"];
  if (categories.value && categories.value.length > 0) {
    const apiTitles = categories.value.map((cat) => cat.title);
    return [...base, ...apiTitles];
  }
  return base;
});

const filtered = computed(() => posts.value || []);

onMounted(async () => {
  try {
    loading.value = true;
    const catResponse = await fetchCate();
    categories.value = catResponse.data || catResponse;
    await loadData();
  } catch (err) {
    console.error("API ERROR:", err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <section class="container head">
    <h1>Blog</h1>
    <p class="muted">Browse posts, search by keyword, and filter by category.</p>

    <GlassCard class="controls">
      <div class="search-box">
        <input
          class="input"
          v-model="q"
          placeholder="Search posts..."
          @keyup.enter="handleSearch"
        />
        <button class="search-btn" @click="handleSearch" aria-label="Search">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      <select class="select" v-model="selectedCategory">
        <option v-for="cat in categoryList" :key="cat" :value="cat">
          {{ cat }}
        </option>
      </select>
    </GlassCard>
  </section>

  <section class="container">
    <div v-if="loading" class="empty">Loading...</div>
    <div v-else-if="filtered.length === 0" class="empty">
      No posts found in this category.
    </div>

    <div v-else>
      <div class="grid">
        <PostCard v-for="p in filtered" :key="p.id" :post="p" />
      </div>

      <div class="pagination" v-if="totalPages > 1">
        <button class="page-btn" :disabled="currentPage === 1" @click="currentPage--">
          Previous
        </button>

        <span class="page-info">
          Page <strong>{{ currentPage }}</strong> of {{ totalPages }}
        </span>

        <button
          class="page-btn"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          Next
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Keeping your exact styles */
.head {
  padding: 10px 0 10px;
}
h1 {
  margin: 6px 0 8px;
  letter-spacing: -0.6px;
}
.muted {
  color: var(--muted);
  margin: 0;
  line-height: 1.7;
}
.search-box {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}
.search-box .input {
  width: 100%;
  padding-right: 52px;
}
.search-btn {
  position: absolute;
  right: 6px;
  background: var(--primary);
  border: none;
  border-radius: 10px;
  color: white;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}
.search-btn:hover {
  background: var(--primary-hover, #00d1b2);
  transform: scale(1.05);
}
.search-btn svg {
  width: 18px;
  height: 18px;
}
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
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  background-size: 18px;
  padding-right: 40px;
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
  border-radius: 14px;
  border: 1px dashed var(--border);
  background: var(--card2);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* ✅ New Pagination Styles */
.pagination {
  margin: 30px 0 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

.page-btn {
  padding: 8px 16px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--card2);
  color: var(--text);
  cursor: pointer;
  transition: 0.2s;
  font-weight: 500;
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-btn:not(:disabled):hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.page-info {
  font-size: 0.95rem;
  color: var(--muted);
}

@media (max-width: 980px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 740px) {
  .controls {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 640px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
