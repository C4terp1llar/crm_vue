<script setup>
import { ref } from 'vue';

const isSidebarOpen = ref(true);

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}
</script>

<template>
  <aside>
    <div class="nav">
      <h1>Навигация</h1>
      <button @click="toggleSidebar" class="burger-icon">
        {{ isSidebarOpen ? '&#x2715;' : '&#9776;' }}
      </button>
    </div>
    <ul :class="{ 'open': isSidebarOpen }">
      <li>
        <router-link to="/home/account">Счет</router-link>
      </li>
      <li>
        <router-link to="/home/history">История</router-link>
      </li>
      <li>
        <router-link to="/home/planning">Планирование</router-link>
      </li>
      <li>
        <router-link to="/home/new">Новая запись</router-link>
      </li>
      <li>
        <router-link to="/home/categories">Категории</router-link>
      </li>
    </ul>
  </aside>
</template>

<style scoped lang="scss">
@import "../assets/res";

aside {
  background-color: $color8;
  padding: $padding-large;
  position: relative;
  text-align: center;

  @media (max-width: 859px) {
    grid-column: span 1;
  }

  .nav{
    @include flexbox(flex, space-between, center, row);
    padding: 15px 0;
    h1{
      @media (max-width: 1150px) {
        font-size: 20px;
      }
      @media (max-width: 950px) {
        font-size: 18px;
      }
      @media (max-width: 859px) {
        font-size: 24px;
      }
    }
  }
  ul {
    @include flexbox(flex, start, start, column);
    list-style-type: none;
    gap: $gap-medium;
    display: none;
    li {
      font-size: 20px;
      @media (max-width: 859px) {
        font-size: 24px;
      }
    }
    &.open {
      display: flex;
    }
  }
  .burger-icon {
    font-size: 24px;
    border: none;
    background: none;
    cursor: pointer;
  }

  &.open {
    transform: translateX(0);
  }
}
</style>
