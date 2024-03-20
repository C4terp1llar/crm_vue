<script setup>
import { ref } from 'vue';

const showAside = ref(true);

const toggleAside = () => {
  showAside.value = !showAside.value;
}
</script>

<template>
  <aside >
    <ul >
      <li>
        <router-link to="account">Счет</router-link>
      </li>
      <li>
        <router-link to="history">История</router-link>
      </li>
      <li>
        <router-link to="planning">Планирование</router-link>
      </li>
      <li>
        <router-link to="new">Новая запись</router-link>
      </li>
      <li>
        <router-link to="categories">Категории</router-link>
      </li>
    </ul>
  </aside>
</template>

<style scoped lang="scss">
@import "../assets/res";

aside{
  background-color: $color8;
  padding: $padding-large;
  ul{
    @include flexbox(flex,start,start,column);
    list-style-type: none;
    gap: $gap-medium;
    li{
      font-size: 20px;
    }
  }
}
</style>
