<template>
  <v-container>
    <v-form @submit.prevent="register">
      <v-text-field v-model="formData.name" placeholder="Nome" required />
      <v-text-field v-model="formData.email" placeholder="Email" required />
      <v-text-field
        v-model="formData.phone_number"
        placeholder="Telefone"
        required
      />
      <v-text-field v-model="formData.cpf" placeholder="CPF" required />
      <v-text-field
        v-model="formData.password"
        type="password"
        placeholder="Senha"
        required
      />
      <v-btn color="blue" type="submit">Criar Conta</v-btn>

      <p v-if="authStore.errorMessage" class="error">
        {{ authStore.errorMessage }}
      </p>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

export default {
  name: "CreateAccount",
  setup() {
    const authStore = useAuthStore();

    const formData = ref({
      name: "",
      email: "",
      phone_number: "",
      cpf: "",
      password: "",
    });

    const register = async () => {
      await authStore.createAccount(formData.value);
    };

    return {
      authStore,
      formData,
      register,
    };
  },
};
</script>

<style lang="scss"></style>
