<script>
import {ref} from "vue";

export default {
  setup(){
    const login = ref(null);
    const password = ref(null);
    const handleSubmit = () =>{

    }
    return{
      handleSubmit,login,
      password
    }
  }
}
</script>

<template>
  <h1>Авторизация</h1>
  <form @submit.prevent="handleSubmit">
    <label for="login">Введите логин:</label>
    <input id="login" type="text" v-model.trim="login">
    <label for="password">Введите пароль:</label>
    <input id="password" type="text" v-model.trim="password">
    <button type="submit">Войти</button>
  </form>
  <p>Нет аккаунта? <router-link to="/reg">Регистрация</router-link></p>
</template>

<style scoped lang="scss">
@import "../assets/res";

form {
  @include flexbox(flex, unset, unset, column);
  gap: 5px;
  input,button{
    padding: 5px;
    border-radius: 5px;
  }
  button{
    cursor: pointer;
  }
}
p{
  margin-top: 10px;
}
</style>