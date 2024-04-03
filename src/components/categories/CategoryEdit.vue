<script setup>
import {computed, onMounted, ref} from "vue";
import {filterNonDigits} from "@/helpers/inputFilter";
import {useStore} from "vuex";
import AppLoader from "@/components/AppLoader.vue";
import {sendAlert} from "@/helpers/alertHelper";


const store = useStore();

const categories = computed(() => store.getters["category/getCategories"]);

const isLoading = ref(false);
const changeTitleFlag = ref(false);

const categoryId = ref(null);
const limit = ref(null);
const newTitle = ref(null);

const limitCorrect = computed(() => {
  if (limit.value && limit.value <= 99) {
    return 'Минимальный лимит 100 ₽'
  }
});

const valid = computed(() => {
  if (changeTitleFlag.value) {
    return !(categoryId.value && newTitle.value && limit.value && limit.value > 99)
  } else {
    return !(categoryId.value && limit.value && limit.value > 99)
  }
});

const isSelectedActual = (actualLimit, actualTitle) => {
  if (changeTitleFlag.value) {
    return actualLimit === limit.value || actualTitle === newTitle.value
  } else {
    return actualLimit === limit.value
  }
}

const handleChange = (actualLimit, actualTitle) => {
  if (changeTitleFlag.value) {
    limit.value = actualLimit;
    newTitle.value = actualTitle;
  } else {
    limit.value = actualLimit;
  }
}

async function handleSubmit(event) {
  try {
    isLoading.value = true;
    if (changeTitleFlag.value) {
      await store.dispatch('category/editCategory', {
        id: categoryId.value,
        newTitle: newTitle.value,
        newLimit: limit.value
      });
    } else {
      await store.dispatch('category/editCategory', {
        id: categoryId.value,
        newLimit: limit.value
      });
    }
  } catch (e) {
    console.error(e.message);
    sendAlert('Ошибка при редактировании категории, попробуйте позже', 'error');
  } finally {
    isLoading.value = false;

    categoryId.value = null;
    limit.value = null;
    newTitle.value = null;
    changeTitleFlag.value = false;
  }
}
</script>

<template>

  <h2>Редактировать</h2>
  <form @submit.prevent="handleSubmit">

    <label for="title">Выберите категорию:</label>

    <select id="title" v-model="categoryId"
            @change="handleChange(categories[categoryId].limit, categories[categoryId].title)">
      <option v-if="!categories" disabled selected>Категорий пока нет</option>
      <option v-else v-for="(cat, id) in categories" :key="id" :value="id">{{ cat.title }}</option>
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
    <small v-if="limitCorrect" class="hint">{{ limitCorrect }}</small>

    <div class="change-block" v-if="changeTitleFlag">
      <label for="new-title">Введите новое название: </label>
      <input id="new-title" type="text" v-model.trim="newTitle">
    </div>

    <div class="change-selector">
      <span>Изменить название</span>
      <input type="checkbox" id="change-title" v-model="changeTitleFlag">
    </div>

    <button
        :disabled="valid || isLoading || isSelectedActual(categories[categoryId].limit, categories[categoryId].title)"
        type="submit">
      <template v-if="isLoading">
        <app-loader/>
      </template>
      <template v-else>
        Обновить
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

  .change-selector {
    display: flex;
    gap: $gap-small;

    input {
      cursor: pointer;
    }
  }

  .change-block {
    width: 100%;

    input {
      width: inherit;
    }
  }
}
</style>