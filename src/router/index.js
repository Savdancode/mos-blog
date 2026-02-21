import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";
import Blog from "../pages/Blog.vue";
import BlogDetail from "../pages/BlogDetail.vue";
import About from "../pages/About.vue";
import Contact from "../pages/Contact.vue";

const router = createRouter({
  history: createWebHistory(), // ✅ use history for clean URL
  scrollBehavior() {
    return { top: 0 };
  },
  routes: [
    { path: "/", name: "home", component: Home }, // 👈 THIS is important
    { path: "/blog", name: "blog", component: Blog },
    { path: "/blog/:slug", name: "blog-detail", component: BlogDetail },
    { path: "/about", name: "about", component: About },
    { path: "/contact", name: "contact", component: Contact },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
});

export default router;