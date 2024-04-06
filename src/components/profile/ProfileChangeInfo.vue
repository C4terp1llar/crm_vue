<script setup>
import {sendAlert} from "@/helpers/alertHelper";
import {computed, ref} from "vue";
import AppLoader from "@/components/AppLoader.vue";
import {useStore} from "vuex";

const store = useStore();

const isLoading = ref(false);

const newName = ref(null);

const valid = computed(() => {
  return !newName.value;
})

async function handleSubmit () {
  try {
    isLoading.value = true;

    await store.dispatch('info/updateUserInfo', {name: newName.value});
  }catch (e){
    console.error(e.message);
    sendAlert('Возникла ошибка при обновлении информации, попробуйте позже', 'error');
  }finally {
    isLoading.value = false;
    newName.value = null;
  }
}
</script>

<template>
  <div class="block">
    <h2>Изменить данные</h2>
    <form @submit.prevent="handleSubmit">
      <label for="userName">Введите имя: </label>
      <input id="userName" type="text" v-model.trim="newName">

      <button :disabled="isLoading || valid" type="submit">
        <template v-if="isLoading">
          <app-loader/>
        </template>
        <template v-else>
          Обновить
        </template>
      </button>

    </form>
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
  form {
    width: 100%;
    @include flexbox(flex, unset, unset, column);
    gap: 5px;
    padding: $padding-small;
    border: 1px solid $color8;
    border-radius: $radius;

    input, button, select {
      padding: 5px;
      border-radius: 5px;
    }

    button {
      cursor: pointer;
    }

    button:disabled {
      cursor: not-allowed;
    }

    input {
      cursor: pointer;
    }
  }
}
</style>