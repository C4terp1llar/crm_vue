<script setup>
import {computed, ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {sendAlert} from "@/helpers/alertHelper";
import AppLoader from "@/components/AppLoader.vue";

const login = ref(null);
const password = ref(null);
const name = ref(null);

const store = useStore();
const router = useRouter();

const isLoading = ref(false);

const valid = computed(() => {
  return !(login.value && password.value && password.value.length >= 6)
});

async function handleSubmit() {
  try {
    isLoading.value = true;

    await store.dispatch('auth/register', {email: login.value, password: password.value, name: name.value});
    await router.push('/home');
    sendAlert('Регистрация успешна!', 'success');
  }catch (e){
    sendAlert('Пользователь с таким email уже существует', 'error');
    console.error(e.message);
  }finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <h1>Регистрация</h1>
  <form @submit.prevent="handleSubmit">
    <label for="name">Введите имя:</label>
    <input id="name" maxlength="20" v-model.trim="name" type="text">
    <label for="login">Введите email:</label>
    <input id="login" v-model.trim="login" type="email">
    <label for="password">Введите пароль:</label>
    <input minlength="6" id="password" v-model.trim="password" type="password">
    <button type="submit" :disabled="valid || isLoading">
      <template v-if="isLoading">
        <app-loader/>
      </template>
      <template v-else>
        Зарегистрироваться
      </template>
    </button>
  </form>
  <p>
    <router-link class="default-link" to="auth">К авторизации</router-link>
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