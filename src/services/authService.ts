import Api from "../services/api";

class AuthService {
  static async login(email: string, password: string) {
    try {
      const response = await Api.post("/responsibles/login", {
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      console.error("Erro no login:", error);
      throw error.response?.data || { error: "Erro ao processar login" };
    }
  }

  static storeToken(token: string) {
    localStorage.setItem("token", token);
  }

  static logout() {
    localStorage.removeItem("token");
  }

  static isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  }
}

export default AuthService;
