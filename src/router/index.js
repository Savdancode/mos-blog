import { createRouter, createWebHashHistory } from "vue-router"; // 1. Change import

// ... imports remain the same

const router = createRouter({
  // 2. Switch to Hash History and add your repo name as the base
  history: createWebHashHistory('/mos-blog/'), 
  scrollBehavior() {
    return { top: 0 };
  },
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/blog", name: "blog", component: Blog },
    {
      path: '/blog/:id',
      name: 'BlogDetail',
      component: () => import('../pages/BlogDetail.vue')
    },
    { path: "/about", name: "about", component: About },
    { path: "/contact", name: "contact", component: Contact },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
});

export default router;