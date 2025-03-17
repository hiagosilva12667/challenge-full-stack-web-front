import { createRouter, createWebHistory } from "vue-router/auto";
import { routes } from "vue-router/auto-routes";
import NotFound from "@/views/notFound/notFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...routes,
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

export default router;
