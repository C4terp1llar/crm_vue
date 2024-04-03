<script setup>

import {useStore} from "vuex";
import {computed} from "vue";
import currencyFilter from "@/helpers/currencyFilter";

const props = defineProps({
  entryId: {
    type: String,
    required: true
  }
});

const store = useStore();

const entries = computed(() => store.getters["entries/getEntries"]);
const categories = computed(() => store.getters["category/getCategories"]);

const currentEntry = computed(() => {
  if (!entries.value || !entries.value[props.entryId]) return null

  return entries.value[props.entryId]
});

const currentType = computed(() => {
  if (!currentEntry || !currentEntry.value) return 0;

  if (currentEntry.value.type === 'income') {
    return 'income'
  }
  return 'expense'
});

const titleWith = (type) => {
  if (type === 'expense' && currentEntry) return categories.value[currentEntry.value.categoryId].title

  return ''
}

const currentEntryInfo = computed(() => {
  if (!currentEntry || !currentEntry.value) return 0;

  return {
    title: titleWith(currentType.value),
    type: currentEntry.value.type,
    sum: currencyFilter(currentEntry.value.val),
    date: currentEntry.value.date,
    description: currentEntry.value.description,
  }
})

</script>

<template>
  <div class="cont">
    <div class="block">

      <div class="route">
        <router-link to="/home/history">История</router-link>
        <span>&gt;</span>
        <span>{{ currentType === 'expense' ? currentEntryInfo.title : `Пополнение от ${currentEntryInfo.date}` }}</span>
      </div>

      <ul class="info">
        <li v-if="currentType === 'expense'" class="info-item">
          <strong>Категория :</strong>
          <span>{{ currentEntryInfo.title }}</span>
        </li>

        <li class="info-item">
          <strong>Тип записи:</strong>
          <span :class="currentEntryInfo.type === 'income' ? 'income' : 'expense' ">{{currentEntryInfo.type === 'income' ? 'Доход' : 'Расход' }}</span>
        </li>

        <li class="info-item">
          <strong>Сумма:</strong>
          <span>{{ currentEntryInfo.sum }}</span>
        </li>

        <li class="info-item">
          <strong>Дата выполнения:</strong>
          <span>{{ currentEntryInfo.date }}</span>
        </li>

        <li class="info-item">
          <strong>Описание:</strong>
          <span>{{ currentEntryInfo.description }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/res";

.cont {
  width: 100%;
  height: 100%;
  gap: $gap-medium;
  @include flexbox(flex, center, center, row);
  background-color: $color8;
  padding: $padding-large;

  .block {
    @include flexbox(flex, unset, center, column);
    gap: $gap-medium;
    width: 100%;
    background-color: $color10;
    border-radius: $radius;
    height: 100%;
    padding: $padding-medium;

    .route {
      align-self: start;
      @include flexbox(flex, center, center, row);
      gap: $gap-small;
    }

    .info {
      @include flexbox(flex, unset, unset, column);
      width: 100%;
      list-style-type: none;
      gap: $gap-medium;

      .info-item {
        @include flexbox(flex, unset, unset, row);
        gap: $gap-small;
      }

      .income {
        color: green;
      }

      .expense {
        color: darkred;
      }
    }
  }
}
</style>