import { createRouter, createWebHistory } from "vue-router/auto";
import { routes } from "vue-router/auto-routes";
import NotFound from "@/views/notFound/notFound.vue";
import AuthService from "@/services/authService"; // Importa o serviço de autenticação

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

// Protege rotas que exigem autenticação
router.beforeEach((to, from, next) => {
  const isAuthenticated = AuthService.isAuthenticated();
  // Permite acesso às rotas de login e criação de conta sem autenticação
  if (
    to.path !== "/login" &&
    to.path !== "/create-account" &&
    !isAuthenticated
  ) {
    next("/login"); // Redireciona para o login se não estiver autenticado
  } else {
    next(); // Prossegue normalmente
  }
});

export default router;
