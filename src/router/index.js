import { createRouter, createWebHashHistory } from "vue-router";

// ✅ ADD THESE IMPORTS AT THE TOP
import Home from "../pages/Home.vue";
import Blog from "../pages/Blog.vue";
import About from "../pages/About.vue";
import Contact from "../pages/Contact.vue";

const router = createRouter({
  // Use hash history for easy GitHub Pages deployment
  history: createWebHashHistory("mos-blog"), 
  scrollBehavior() {
    return { top: 0 };
  },
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/blog", name: "blog", component: Blog },
    {
      path: '/blog/:id',
      name: 'BlogDetail',
      // Lazy loading this one is fine
      component: () => import('../pages/BlogDetail.vue')
    },
    { path: "/about", name: "about", component: About },
    { path: "/contact", name: "contact", component: Contact },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
});

export default router;