<script setup>

import NewEntry from "@/components/new/NewEntry.vue";
</script>

<template>
<div class="cont">
  <new-entry />
</div>
</template>

<style scoped lang="scss">
@import "../assets/res";

.cont {
  width: 100%;
  height: 100%;
  gap: $gap-medium;
  @include flexbox(flex, center, center, row);
  background-color: $color8;
  padding: $padding-large;
  .block{
    @include flexbox(flex, unset, center, column);
    gap: $gap-medium;
    width: 100%;
    background-color: $color10;
    border-radius: $radius;
    height: 100%;
    padding: $padding-medium;
  }
}
</style>