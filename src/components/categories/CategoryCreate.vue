<script setup>
import {computed, onMounted, ref} from "vue";
import {filterNonDigits} from "@/helpers/inputFilter";
import {sendAlert} from "@/helpers/alertHelper";
import {useStore} from "vuex";
import AppLoader from "@/components/AppLoader.vue";

const store = useStore();

const title = ref(null);
const limit = ref(null);
const isLoading = ref(false);

const valid = computed(() => {
  return !(title.value && limit.value && limit.value > 99)
});

const limitCorrect = computed(() => {
  if (limit.value && limit.value <= 99) {
    return 'Минимальный лимит 100 ₽'
  }
})

async function handleSubmit() {
  try {
    isLoading.value = true
    await store.dispatch('category/createCategory', {
      title: title.value,
      limit: limit.value
    });
    title.value = null;
    limit.value = null;
  } catch (e) {
    console.error(e.message);
    sendAlert('Ошибка при добавлении категории, попробуйте позже', 'error')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>

  <h2>Создать</h2>
  <form @submit.prevent="handleSubmit">

    <label for="title">Введите название:</label>
    <input id="title" type="text" v-model.trim="title">

    <label for="limit">Введите лимит, ₽:</label>
    <input
        minlength="2"
        id="limit"
        type="number"
        v-model.trim="limit"
        min="0"
        step="25"
        @input="filterNonDigits">
    <small v-if="limitCorrect" class="hint">{{ limitCorrect }}</small>

    <button :disabled="valid || isLoading" type="submit">
      <template v-if="isLoading">
        <app-loader/>
      </template>
      <template v-else>
        Создать
      </template>
    </button>
  </form>

</template>

<style scoped lang="scss">
@import "../../assets/res";

form {
  width: 100%;
  @include flexbox(flex, unset, unset, column);
  gap: 5px;
  padding: $padding-small;
  border: 1px solid $color8;
  border-radius: $radius;

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
</style>