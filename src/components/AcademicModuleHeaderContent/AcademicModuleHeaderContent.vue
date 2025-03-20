<template>
  <div class="academic-module-header-content">
    <div class="title">Módulo acadêmico</div>
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: "AcademicModuleHeaderContent",
};
</script>

<style scoped>
@import "./academicModuleHeaderContent.styles.scss";
</style>
