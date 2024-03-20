<template>
  <router-view/>
  <app-alert />
</template>

<script setup>

import AppAlert from "@/components/AppAlert.vue";
</script>

<style lang="scss">
@import "assets/res";

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html, body{
  width: 100%;
  height: 100%;
}
#app{
  width: 100%;
  height: 100%;
  background-color: $color10;
  @include flexbox(flex,center,center,row);
}
</style>
