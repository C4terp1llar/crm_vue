<script setup>
import {sendAlert} from "@/helpers/alertHelper";
import {onMounted, onUnmounted, ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
const start = ref(false);
const conrol = ref(false);

const redirectMain = () => {
  router.push('/');
}

onMounted(() => {
  setTimeout(() => {
    sendAlert('Страницы не существует! Попробуйте позже или измените адрес в поисковой строке', 'error');
    start.value = true;
  }, 100)
  setTimeout(() => {
    conrol.value = !conrol.value;
  }, 2000);
});

onUnmounted(() => start.value = !start.value);
</script>

<template>
  <div class="wrap">
    <img src="../assets/notfound.png" alt="error 404" :class="{ 'activeImg': start }">
    <div :class="{'controlBlActive': conrol, 'controlBl': true}">
      <h1>Страница не найдена</h1>
      <button @click="redirectMain">На главную</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/res";

.wrap {
  @include flexbox(flex, center,center, column);
  gap: $gap-medium;
  img {
    border-radius: $radius;
    transition: 2s;
    width: 100px;
    height: 100px;
  }
  .activeImg {
    width: 500px;
    height: 400px;
    transform: rotate(360deg);
  }
  .controlBl{
    @include flexbox(flex, center,center, column);
    gap: $gap-small;
    color: green;
    opacity: 0;
    visibility: hidden;
    transition: 1s;
    button {
      padding: 5px;
      border-radius: 5px;
      cursor: pointer;
      background-color: green;
    }
  }
  .controlBlActive{
    opacity: 1;
    visibility: visible;
  }
}

</style>
