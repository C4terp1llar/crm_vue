<script setup>
import {useStore} from "vuex";
import {computed, onMounted, onUnmounted, ref} from "vue";
import {sendAlert} from "@/helpers/alertHelper";
import AppLoader from "@/components/AppLoader.vue";
import currencyFilter from "../helpers/currencyFilter";

const store = useStore();

const isLoading = ref(false);
const showParagraph = ref([])

const categories = computed(() => store.getters["category/getCategories"]);
const entries = computed(() => store.getters["entries/getEntries"])

const currentBalance = store.getters["info/getUserInfo"].bill

const getSpentSum = (id) => {
  if (!entries.value) return 0;

  return Object.values(entries.value)
      .filter(entry => entry.categoryId === id)
      .reduce((total, entry) => total + entry.val, 0);
}

const getSpentPercent = (id) => {
  if (!entries.value) return 0;

  return Math.round(getSpentSum(id) / (categories.value[id].limit + getSpentSum(id)) * 100)
}

const toggleParagraph = (index) => {
  showParagraph.value[index] = !showParagraph.value[index];
}

onMounted(async () => {
  try {
    isLoading.value = true;

    await store.dispatch('entries/getEntriesFromDb');
  } catch (e) {
    console.error(e.message);
    sendAlert('Ошибка при загрузке записей, попробуйте позже', 'error')
  } finally {
    isLoading.value = false;
  }
})
</script>

<template>
  <app-loader v-if="isLoading"/>
  <div v-else class="cont">
    <div class="block">
      <div class="balance">
        <h2>Ваш баланс</h2>
        <h2>{{currencyFilter(currentBalance)}}</h2>
      </div>
      <ul v-for="(category, catIndex) in categories" :key="catIndex">
        <li>
          <h3 v-if="getSpentPercent(catIndex) === 100"  class="limit-ex">Лимит данной категории исчерпан</h3>

          <div class="dl">
            <strong>Категория: </strong>
            <span>{{ category.title }}</span>
          </div>

          <div class="dl">
            <strong>Прогресс: </strong>
            <div class="line-wrap"
                 :title="'Потрачено ' + getSpentPercent(catIndex) + '%' "
            >
              <div
                  :class="{
                line: true,
                green: getSpentPercent(catIndex) > 1,
                yellow: getSpentPercent(catIndex) > 50,
                red: getSpentPercent(catIndex) > 80
              }"
                  :style="{ width: `${getSpentPercent(catIndex )}% `,
                visibility: getSpentPercent(catIndex) < 1 ? 'hidden' : ''
              }"
              ></div>
            </div>
          </div>
          <button @click="toggleParagraph(catIndex)">Подробнее...</button>
          <p v-if="showParagraph[catIndex]">
            Потрачено: {{ currencyFilter(getSpentSum(catIndex)) }}
            из {{ currencyFilter(category.limit + getSpentSum(catIndex)) }} ({{ getSpentPercent(catIndex) }}%).
            Оставшийся лимит: {{ currencyFilter( category.limit)}}  ({{100 - getSpentPercent(catIndex) }}%)
          </p>
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
    gap: $gap-small;
    width: 100%;
    background-color: $color10;
    border-radius: $radius;
    height: 100%;
    padding: $padding-medium;
    .balance{
      width: 100%;
      @include flexbox(flex, space-between, center, row);
    }
    ul {
      width: 100%;
      list-style-type: none;
      li{
        @include flexbox(flex, unset, start, column);
        gap: $gap-small;
        padding: $padding-small;
        border: 1px solid $color8;
        border-radius: $radius;
        .dl{
          width: 100%;
          @include flexbox(flex, unset, center, row);
          gap: $gap-small;
        }
        .limit-ex{
          color:darkred;
          align-self: center;
        }
      }
    }
    button{
      background-color: $color10;
      cursor: pointer;
      border:none;
    }
    .line-wrap{
      width: 100%;
      background-color: $color8;
      padding: 4px;
      border-radius: $radius;
    }
    .line{
      border: 2px solid black;
      border-radius: $radius;
    }
    .green{
      border-color: green;
    }
    .yellow{
      border-color: yellow;
    }
    .red{
      border-color: darkred;
    }
  }
}
</style>