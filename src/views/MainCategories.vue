<script setup>
import AppLoader from "@/components/AppLoader.vue";
import {ref} from "vue";
import CategoryCreate from "@/components/categories/CategoryCreate.vue";
import CategoryEdit from "@/components/categories/CategoryEdit.vue";

const isLoading = ref(false);


</script>

<template>
  <app-loader v-if="isLoading"/>
  <div v-else class="cont">
    <category-create />
    <category-edit />
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
    width: 50%;
    background-color: $color10;
    border-radius: $radius;
    height: 100%;
    padding: $padding-medium;
  }
}
</style>