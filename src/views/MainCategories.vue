<script setup>
import CategoryCreate from "@/components/categories/CategoryCreate.vue";
import CategoryEdit from "@/components/categories/CategoryEdit.vue";
import CategoriesList from "@/components/categories/CategoriesList.vue";

</script>

<template>
  <div class="cont">
    <div class="block">
      <categories-list />
    </div>
    <div class="block">
      <category-create />
      <category-edit />
    </div>
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
    width: 50%;
    background-color: $color10;
    border-radius: $radius;
    height: 100%;
    padding: $padding-medium;
  }
}
</style>