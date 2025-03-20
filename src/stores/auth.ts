import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null,
    errorMessage: null,
  }),
  actions: {
    async createAccount(data: any) {
      try {
        const response = await fetch(
          "http://localhost:3006/responsibles/create-account",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        );

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.error || "Erro desconhecido");
        }

        this.user = responseData;
        this.errorMessage = null;
      } catch (error: any) {
        this.errorMessage = error.message;
      }
    },

    async login(credentials: { email: string; password: string }) {
      try {
        const response = await fetch(
          "http://localhost:3006/responsibles/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          }
        );

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.error || "Erro ao fazer login");
        }

        this.token = responseData.token;
        localStorage.setItem("token", responseData.token);
        this.errorMessage = null;

        return true;
      } catch (error: any) {
        this.errorMessage = error.message;
        return false;
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
      this.errorMessage = null;
    },
  },
});
