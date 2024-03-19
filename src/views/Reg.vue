<script>
export default {
  setup(){
    const handleSubmit = () =>{

    }
    return{
      handleSubmit
    }
  }
}
</script>

<template>
  <h1>Регистрация</h1>
  <form @submit.prevent="handleSubmit">
    <label for="login">Введите логин:</label>
    <input id="login" type="text">
    <label for="password">Введите пароль:</label>
    <input id="password" type="text">
    <button type="submit">Зарегистрироваться</button>
  </form>
  <p><router-link to="/">К авторизации</router-link></p>
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