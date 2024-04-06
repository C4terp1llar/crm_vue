<script setup>
import {computed, ref} from "vue";
import { useRouter } from "vue-router";
import {useStore} from "vuex";

const actionModel = ref(null);
const router = useRouter();
const store = useStore()

const info = computed(() => store.getters["info/getUserInfo"]);

const handleAction = (action) => {
  if (action === 'profile') {
    router.push('/home/profile');
    actionModel.value = null;
  } else if (action === 'logout') {
    router.push('/');
    store.commit('logout');
  }
}
</script>

<template>
  <nav>
    <div class="logo">
      <img src="../assets/logo.svg" alt="logo">
      <router-link to="/home"/>
    </div>
    <div class='wrap'>
      <select v-model="actionModel" @change="handleAction(actionModel)">
        <option :value="null" disabled selected class="user">
          {{info.email}} {{info.email && info.name ? '|' : ''}} {{info.name }}
        </option>
        <option value="profile">Профиль</option>
        <option class="logout" value="logout">Выйти</option>
      </select>
      <span>&#9660;</span>
    </div>
  </nav>
</template>

<style scoped lang="scss">
@import "../assets/res";

nav {
  grid-column: span 2;
  background-color: $color8;
  padding: $padding-large;
  @include flexbox(flex, space-between, center, row);
  .wrap {
    position: relative;
    @include flexbox(flex, unset, center, row);
    select {
      background-color: $color8;
      border: 1px solid black;
      border-radius: $radius;
      -moz-appearance: none;
      -webkit-appearance: none;
      outline: none;
      padding: 10px 25px 10px 10px;
      cursor: pointer;
      font-size: 16px;
      .logout{
        color: red;
      }
    }
    select:focus{
      .user{
        display: none;
      }
    }
    span {
      height: 9px;
      font-size: 10px;
      width: 15px;
      position: absolute;
      right: 0;
      cursor: pointer;
      font-weight: bold;
    }
  }
  .logo{
    position: relative;
    width: 50px;
    height: 50px;
    a{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
