<script setup>
import { ref, onMounted } from "vue";
import Navbar from "./components/Navbar.vue";


const theme = ref("light");

function applyTheme(value) {
  theme.value = value;
  document.documentElement.setAttribute("data-theme", value);
  localStorage.setItem("theme", value);
}

function toggleTheme() {
  applyTheme(theme.value === "light" ? "dark" : "light");
}

onMounted(() => {
  const saved = localStorage.getItem("theme");
  applyTheme(saved === "dark" ? "dark" : "light"); // default: light
});
</script>

<template>
  <Navbar :theme="theme" @toggle-theme="toggleTheme" />
  <main class="fade-in">
    <router-view />
  </main>
</template>

<style>
main {
  padding-bottom: 40px;
}
</style>
