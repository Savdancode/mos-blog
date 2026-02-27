<script setup>
import Hero from "../components/Hero.vue";
import RecentPosts from "../components/RecentPosts.vue";
import GlassCard from "../components/GlassCard.vue";
import { ref, onMounted } from "vue";
import { fetchHome } from "../services/api";
import PopularPosts from "../components/PopularPosts.vue";
import Footer from "../components/Footer.vue";

const home = ref(null);
const loading = ref(true);
const error = ref(null);
var footerTitle = "";
var footerDes = "";

onMounted(async () => {
  console.log("HOME COMPONENT MOUNTED");
  console.log("Calling fetchHome...");

  try {
    const data = await fetchHome();

    home.value = data;
    footerTitle = home.value.footerTitle;
    footerDes = home.value.footerShortDes;
    console.log(footerTitle + footerDes);
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
  <PopularPosts :limit="3" :blogs="home?.popular_blogs" />
  <RecentPosts :limit="3" />
  <Footer :title="footerTitle" :description="footerDes" />
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
