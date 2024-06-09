<script setup>
import {computed, ref} from "vue";
import {useStore} from "vuex";
import {filterNonDigits} from "@/helpers/inputFilter";
import AppLoader from "@/components/AppLoader.vue";
import {sendAlert} from "@/helpers/alertHelper";
import dateFilter from "../../helpers/dateFilter";

const store = useStore();

const isLoading = ref(false);

const radio = ref(null);
const categoryId = ref(null);
const sum = ref(null);
const description = ref(null);

const categories = computed(() => store.getters["category/getCategories"]);

const limitCorrectTxt = computed(() => {
  if (sum.value && sum.value <= 99) {
    return 'Минимальный лимит 100 ₽'
  }
  if (radio.value === 'expense' && store.getters["info/getUserInfo"].bill < sum.value) {
    return `На вашем балансе не хватает ${sum.value - store.getters["info/getUserInfo"].bill} ₽`;
  }
  if(radio.value === 'expense' && store.getters["category/getCategories"][categoryId.value] && store.getters["category/getCategories"][categoryId.value].limit < sum.value){
    return `Лимит выбранной категории меньше на ${sum.value - store.getters["category/getCategories"][categoryId.value].limit} ₽`;
  }
});
const limitCorrectBool = computed(() => {
  return (
      !sum.value ||
      sum.value <= 99 ||
      radio.value === 'expense' && (store.getters["info/getUserInfo"].bill < sum.value ||
      store.getters["category/getCategories"][categoryId.value].limit < sum.value)
  )
});

const valid = computed(() => {
  return (limitCorrectBool.value || !radio.value || !description.value);
});
async function handleSubmit () {
  try {
    isLoading.value = true;

    await store.dispatch('entries/createEntry', {
      type: radio.value,
      manipulateBill: sum.value,
      description: description.value,
      categoryId: categoryId.value,
      date: dateFilter(new Date())
    })

  } catch (e) {
    console.error(e.message);
    sendAlert('Ошибка при добалении записи, попробуйте позже', 'error');
  }finally {
    isLoading.value = false;

    description.value = null;
    radio.value = null;
    sum.value = null;
    categoryId.value = null;
  }
}
</script>

<template>
  <div class="block">
    <h2>Новая запись</h2>
    <form @submit.prevent="handleSubmit">

      <label for="radio-group">Выберите тип операции:</label>
      <fieldset id="radio-group">
        <div class="radio-block">
          <span>Доход</span>
          <input id="income-radio-btn" type="radio" value="income" v-model="radio">
        </div>

        <div class="radio-block" v-if="categories">
          <span>Расход</span>
          <input id="expense-radio-btn" type="radio" value="expense" v-model="radio">
        </div>
      </fieldset>

      <div class="expense-select" v-if="radio === 'expense'">
        <label for="title">Выберите категорию: </label>
        <select  id="title" v-model="categoryId">
          <option v-if="!categories" disabled selected>Категорий нет</option>
          <option v-else v-for="(cat, id) in categories" :key="id" :value="id">{{ cat.title }}</option>
        </select>
      </div>

      <label for="limit">Введите сумму, ₽:</label>
      <input
          minlength="2"
          id="limit"
          type="number"
          v-model.trim="sum"
          min="0"
          step="25"
          @input="filterNonDigits">
      <small v-if="limitCorrectTxt" class="hint">{{ limitCorrectTxt }}</small>

      <label for="description-field">Введите описание: </label>
      <input id="description-field" type="text" v-model.trim="description">

      <button :disabled="valid || isLoading " type="submit">
        <template v-if="isLoading">
          <app-loader/>
        </template>
        <template v-else>
          Создать
        </template>
      </button>

    </form>
  </div>
</template>

<style scoped lang="scss">
@import "../../assets/res";

form {
  width: 50%;
  @include flexbox(flex, unset, unset, column);
  gap: 5px;
  padding: $padding-small;
  border: 1px solid $color8;
  border-radius: $radius;
  @media (max-width: 859px) {
    width: 100%;
  }

  .radio-block {
    display: flex;
    gap: $gap-small;
  }

  fieldset {
    border: none;
  }

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

  .expense-select{
    @include flexbox(flex, unset, unset, column);
    gap: 5px;
  }
}
</style>