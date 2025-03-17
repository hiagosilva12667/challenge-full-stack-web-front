<template>
  <div class="header">
    <h1 class="header-title">Instituto JavaScript</h1>
    <router-link to="/">
      <img class="header-logo" src="@/assets/logo.jpg" size="65" />
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style>
@import "./header.styles.scss";
</style>
