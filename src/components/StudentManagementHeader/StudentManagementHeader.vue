<template>
  <div class="student-management-header">
    <h1 class="student-management-header--title">{{ title }}</h1>
  </div>
</template>

<script lang="ts">
import type { IStudentManagementHeader } from "./models/studentManagementHeader.interface";
import type { PropType } from "vue";
export default {
  name: "StudentManagementHeader",
  props: {
    title: {
      type: String as PropType<IStudentManagementHeader["title"]>,
      required: true,
    },
  },
};
</script>

<style scoped>
@import "./studentManagementHeader.styles.scss";
</style>
