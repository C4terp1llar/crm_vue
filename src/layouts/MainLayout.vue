<script setup>
import AppNavbar from "@/components/AppNavbar.vue";
import AppAside from "@/components/AppAside.vue";
</script>

<template>
  <div class="container">
    <AppNavbar></AppNavbar>
    <AppAside></AppAside>
    <router-view/>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/res";

.container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 100px 1fr;
  grid-template-columns: 1fr 3fr;
  gap: $gap-small;
  *{
    border-radius: $radius;
  }
}
</style>