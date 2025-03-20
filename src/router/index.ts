import { createRouter, createWebHistory } from "vue-router/auto";
import { routes } from "vue-router/auto-routes";
import NotFound from "@/views/notFound/notFound.vue";
import AuthService from "@/services/authService";

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
router.beforeEach((to, from, next) => {
  const isAuthenticated = AuthService.isAuthenticated();
  if (
    to.path !== "/login" &&
    to.path !== "/create-account" &&
    !isAuthenticated
  ) {
    next("/login");
  } else {
    next();
  }
});

export default router;
