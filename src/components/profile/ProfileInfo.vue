<script setup>
import {useStore} from "vuex";
import {computed} from "vue";

const store = useStore();
const info = computed(() => store.getters["info/getUserInfo"])

</script>

<template>
  <div class="block">
    <h2>Персональные данные</h2>
    <div class="wrap">
      <span>
        <strong>Имя:</strong>
        {{info.name}}
      </span>
      <span>
        <strong>Email:</strong>
        {{info.email}}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../assets/res";
.block{
  @include flexbox(flex, unset, center, column);
  gap: $gap-medium;
  width: 50%;
  background-color: $color10;
  border-radius: $radius;
  height: 100%;
  padding: $padding-medium;
  .wrap{
    width: 100%;
    @include flexbox(flex, unset, unset, column);
    gap: $gap-small;
    span{
      padding: $padding-small;
      border: 1px solid $color8;
      border-radius: $radius;
    }
  }
}
</style>