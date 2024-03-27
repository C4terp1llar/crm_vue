<script>

export default {
  setup(){

    return{
    }
  }
}
</script>

<template>
  <div class="container">
    <!-- логика редиректа по умолчанию прописана в роутере (если путь === ' ' -> рендерится auth)-->
    <router-view/>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/res";

.container {
  width: 350px;
  @include flexbox(flex, center, center, column);
  padding: $padding-large;
  background-color: $color8;
  border-radius: $radius;
  gap: $gap-small;
}
</style>