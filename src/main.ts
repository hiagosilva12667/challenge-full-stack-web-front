/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";
// Lib
import { createPinia } from "pinia";
// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

const app = createApp(App);
app.use(createPinia()); // Adiciona Pinia ao projeto
registerPlugins(app);

app.mount("#app");
