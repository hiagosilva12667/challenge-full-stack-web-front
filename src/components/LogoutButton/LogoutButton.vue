<template>
  <v-btn color="red" @click="logout">Sair</v-btn>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import AuthService from "@/services/authService";

const router = useRouter();

const logout = () => {
  AuthService.logout();
  router.push("/login");
};
</script>
