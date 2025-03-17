<template>
  <div class="app-layout">
    <Header />
    <AcademicModuleHeaderContent />
    <div class="main-content">
      <Menu />

      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Header from "@/components/Header/Header.vue";
import Menu from "@/components/Menu/Menu.vue";
import AcademicModuleHeaderContent from "@/components/AcademicModuleHeaderContent/AcademicModuleHeaderContent.vue";

export default {
  name: "App",
  components: {
    Header,
    Menu,
    AcademicModuleHeaderContent,
  },
};
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  height: 98vh;
}

.main-content {
  display: flex;
  flex-grow: 1;
}

.content {
  flex-grow: 1;
}
</style>
