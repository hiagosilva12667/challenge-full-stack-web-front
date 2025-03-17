<template>
  <div class="menu">
    <button @click="toggleButtons" class="menu-button">Students</button>

    <div v-if="showButtons" class="menu-buttons">
      <button @click="handleRoute('/students')" class="action-button">
        ● View Students
      </button>
      <button @click="handleRoute('/create-student')" class="action-button">
        ● Create Student
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "menu",
  setup() {
    const $router = useRouter();
    const showButtons = ref(false);
    const toggleButtons = () => {
      showButtons.value = !showButtons.value;
    };

    const handleRoute = (route) => {
      return $router.push(route);
    };

    return { showButtons, toggleButtons, handleRoute };
  },
};
</script>

<style scoped>
@import "./menu.styles.scss";
</style>
