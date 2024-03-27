<script setup>
import {computed, onMounted, ref} from "vue";
import {filterNonDigits} from "@/helpers/inputFilter";
import {useStore} from "vuex";

const store = useStore();

const categories = computed(() => store.getters["category/getCategories"]);

const title = ref(null);
const limit = ref(null);

const valid = computed(() => {
  return !(title.value && limit.value && limit.value > 99)
});

const limitCorrect = computed(() => {
  if (limit.value && limit.value <= 99){
    return 'Минимальный лимит 100 ₽'
  }
})
</script>

<template>
  <div class="block">
    <h2>Редактировать</h2>
    <form @submit.prevent="handleSubmit">

      <label for="title">Выберите категорию:</label>
      <select id="title" v-model.trim="title" >
        <option v-if="!categories" disabled selected>Категорий нет</option>
        <option v-else v-for="(cat, id) in categories" :key="id">{{cat.title}}</option>
      </select>

      <label for="limit">Введите лимит, ₽:</label>
      <input
          minlength="2"
          id="limit"
          type="number"
          v-model.trim="limit"
          min="0"
          step="25"
          @input="filterNonDigits">
      <small v-if="limitCorrect" class="hint">{{limitCorrect}}</small>

      <button :disabled="valid" type="submit">Обновить</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
@import "../../assets/res";

form {
  width: 100%;
  @include flexbox(flex, unset, unset, column);
  gap: 5px;

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
}
</style>