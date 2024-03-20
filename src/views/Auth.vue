<script setup>
import {computed, ref} from "vue";
import {useStore} from 'vuex';
import {useRouter} from "vue-router";
import {sendAlert} from "@/helpers/alertHelper";

const login = ref(null);
const password = ref(null);

const store = useStore();
const router = useRouter();

const valid = computed(() => {
  return !(login.value && password.value && password.value.length >= 6)
});

async function handleSubmit() {
  try {
    await store.dispatch('auth/login', {email: login.value, password: password.value})
    await router.push('/home');
    sendAlert('Авторизация успешна!', 'success');
  } catch (e) {
    sendAlert('Неверный email или пароль', 'error');
    console.error(e.message);
  }
}
</script>


<template>
  <h1>Авторизация</h1>
  <form @submit.prevent="handleSubmit">
    <label for="login">Введите email:</label>
    <input id="login" type="email" v-model.trim="login">
    <label for="password">Введите пароль:</label>
    <input minlength="6" id="password" type="password" v-model.trim="password">
    <button type="submit" :disabled="valid">Войти</button>
  </form>
  <p>Нет аккаунта?
    <router-link class="default-link" to="reg">Регистрация</router-link>
  </p>
</template>

<style scoped lang="scss">
@import "../assets/res";

form {
  @include flexbox(flex, unset, unset, column);
  gap: 5px;

  input, button {
    padding: 5px;
    border-radius: 5px;
  }

  button {
    cursor: pointer;
  }

  button:disabled {
    cursor: not-allowed;
  }
}

p {
  margin-top: 10px;
}
</style>