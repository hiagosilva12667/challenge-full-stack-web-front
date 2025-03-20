<template>
  <div class="menu">
    <button @click="toggleButtons" class="menu-button">Alunos</button>

    <div v-if="showButtons" class="menu-buttons">
      <button @click="handleRoute('/students')" class="action-button">
        ● Ver alunos
      </button>
      <button @click="handleRoute('/create-student')" class="action-button">
        ● Criar aluno
      </button>
    </div>
    <v-btn v-if="isAuthenticated" color="red" @click="handleLogout">Sair</v-btn>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import AuthService from "@/services/authService";

export default {
  name: "menu",
  setup() {
    const router = useRouter();
    const showButtons = ref(false);
    const toggleButtons = () => {
      showButtons.value = !showButtons.value;
    };

    const handleRoute = (route) => {
      router.push(route);
    };
    const isAuthenticated = computed(() => AuthService.isAuthenticated());

    const handleLogout = () => {
      AuthService.logout();
      isAuthenticated.value = false;
      router.push("/login");
    };

    return {
      showButtons,
      toggleButtons,
      handleRoute,
      isAuthenticated,
      handleLogout,
    };
  },
};
</script>

<style scoped>
@import "./menu.styles.scss";
</style>
