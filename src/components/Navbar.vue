<script setup>
import { computed, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import GlassCard from "./GlassCard.vue";

const props = defineProps({
  theme: { type: Object, required: true }, // ref from parent
});
const emit = defineEmits(["toggle-theme"]);

const route = useRoute();
const open = ref(false);

const links = [
  { to: "/", label: "Home" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const themeLabel = computed(() => (props.theme.value === "light" ? "Dark" : "Light"));

watchEffect(() => {
  route.fullPath;
  open.value = false;
});
</script>

<template>
  <header class="wrap">
    <div class="container nav">
      <router-link class="brand" to="/">
        <span class="dot" />
        <span>San Mos</span>
      </router-link>

      <nav class="links">
        <router-link
          v-for="l in links"
          :key="l.to"
          :to="l.to"
          class="link"
          :class="{ active: route.path === l.to }"
        >
          {{ l.label }}
        </router-link>

        <button class="pill" @click="emit('toggle-theme')">{{ themeLabel }} Mode</button>
      </nav>

      <button class="burger" @click="open = !open" aria-label="Open menu">
        <span />
        <span />
        <span />
      </button>
    </div>

    <transition name="slide">
      <div v-if="open" class="mobile">
        <div class="container">
          <GlassCard class="panel">
            <div class="mobileLinks">
              <router-link v-for="l in links" :key="l.to" :to="l.to" class="mLink">
                {{ l.label }}
              </router-link>
              <button class="mBtn" @click="emit('toggle-theme')">
                Toggle {{ themeLabel }} Mode
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.wrap {
  position: sticky;
  top: 0;
  z-index: 40;
  padding: 14px 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.05), transparent);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 900;
  letter-spacing: -0.3px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: var(--primary);
  box-shadow: 0 0 0 6px rgba(15, 195, 178, 0.16);
}

.links {
  display: flex;
  align-items: center;
  gap: 12px;
}

.link {
  padding: 10px 12px;
  border-radius: 999px;
  color: var(--muted);
  font-weight: 700;
  transition: background 0.2s ease, color 0.2s ease;
}

.link:hover {
  background: rgba(15, 195, 178, 0.12);
  color: var(--text);
}

.link.active {
  background: rgba(15, 195, 178, 0.18);
  color: var(--text);
  border: 1px solid var(--border);
}

.pill {
  padding: 10px 12px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--card2);
  color: var(--text);
  font-weight: 800;
  cursor: pointer;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.burger {
  display: none;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--card2);
  cursor: pointer;
  padding: 10px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.burger span {
  display: block;
  height: 2px;
  background: var(--text);
  margin: 6px 0;
  border-radius: 2px;
}

.mobile {
  padding-top: 12px;
}
.panel {
  padding: 14px;
}

.mobileLinks {
  display: grid;
  gap: 10px;
}

.mLink {
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: rgba(15, 195, 178, 0.1);
  font-weight: 800;
}

.mBtn {
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--card2);
  color: var(--text);
  font-weight: 900;
  cursor: pointer;
}

@media (max-width: 860px) {
  .links {
    display: none;
  }
  .burger {
    display: inline-block;
  }
}

/* transition */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.18s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
