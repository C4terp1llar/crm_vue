<script setup>

import ProfileInfo from "@/components/profile/ProfileInfo.vue";
import ProfileChangeInfo from "@/components/profile/ProfileChangeInfo.vue";
</script>

<template>
  <div class="cont">
    <profile-info />
    <profile-change-info />
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
  border-radius: $radius;
  @media (max-width: 859px) {
    @include flexbox(flex, center, center, column);
  }
  form {
    width: 50%;
    @include flexbox(flex, unset, unset, column);
    gap: 5px;
    padding: $padding-small;
    border: 1px solid $color8;
    border-radius: $radius;

    @media (max-width: 859px) {
      width: 100%;
    }

    .radio-block {
      display: flex;
      gap: $gap-small;
    }

    fieldset {
      border: none;
    }

    input, button, select {
      padding: 5px;
      border-radius: 5px;
    }

    button {
      cursor: pointer;
    }

    button:disabled {
      cursor: not-allowed;
    }

    input {
      cursor: pointer;
    }

    .expense-select {
      @include flexbox(flex, unset, unset, column);
      gap: 5px;
    }
  }
}
</style>