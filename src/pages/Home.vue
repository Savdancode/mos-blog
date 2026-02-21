<script setup>
import Hero from "../components/Hero.vue";
import RecentPosts from "../components/RecentPosts.vue";
import GlassCard from "../components/GlassCard.vue";
import { ref, onMounted } from "vue";
import { fetchHome } from "../services/api";

const home = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  console.log("HOME COMPONENT MOUNTED");
  console.log("Calling fetchHome...");

  try {
    const data = await fetchHome();
    console.log("API RESPONSE:", data);
    home.value = data;
  } catch (err) {
    console.error("API ERROR:", err);
    error.value = "Failed to load home content";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <Hero v-if="home" :data="home" />

  <section class="container mid">
    <GlassCard class="strip">
      <div class="row">
        <div class="left">
          <h2>Built for a clean portfolio vibe</h2>
          <p>
            Use this as your personal blog, developer blog, or product updates page. The
            styling is already premium—just add your content.
          </p>
        </div>
        <router-link class="btn" to="/about">About me</router-link>
      </div>
    </GlassCard>
  </section>

  <RecentPosts :limit="3" />
</template>

<style scoped>
.mid {
  padding: 12px 0 8px;
}
.strip {
  padding: 16px;
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
}
h2 {
  margin: 0 0 8px;
  letter-spacing: -0.4px;
}
p {
  margin: 0;
  color: var(--muted);
  line-height: 1.7;
  max-width: 65ch;
}

@media (max-width: 740px) {
  .row {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
