<template>
  <v-container>
    <h2>Login</h2>
    <v-form @submit.prevent="handleLogin">
      <v-text-field v-model="email" label="E-mail" type="email" required />
      <v-text-field v-model="password" label="Senha" type="password" required />
      <v-btn color="green" type="submit">Entrar</v-btn>
      <v-btn color="blue" @click="router.push('/create-account')"
        >Criar Conta</v-btn
      >
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import AuthService from "@/services/authService";

const email = ref("");
const password = ref("");
const router = useRouter();

const handleLogin = async () => {
  try {
    const data = await AuthService.login(email.value, password.value);

    if (data && data.token) {
      AuthService.storeToken(data.token);
      router.push("/students");
    } else {
      console.error("Token não recebido:", data);
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
  }
};
</script>
