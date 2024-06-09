<script setup>
import currencyFilter from "@/helpers/currencyFilter";
import {computed, ref} from "vue";
import {useStore} from "vuex";
import usePagination from "@/helpers/paginationHelper";

const props = defineProps({
  entriesList: {
    type: Object,
    required: true
  }
});

const store = useStore();

const showParagraph = ref([])

const categories = computed(() => store.getters["category/getCategories"]);
const entries = computed(() => props.entriesList)

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

const { currentPage, totalPages, paginatedData, nextPage, prevPage } = usePagination(categories, {
  pageSize: 5, // Настройка количества элементов на странице
});
</script>

<template>
  <div class="balance">
    <h2>Ваш баланс</h2>
    <h2>{{currencyFilter(currentBalance)}}</h2>
  </div>
  <ul>
    <li v-for="item in paginatedData" :key="item[0]">
      <h3 v-if="getSpentPercent(item[0]) === 100"  class="limit-ex">Лимит данной категории исчерпан</h3>

      <div class="dl">
        <strong>Категория: </strong>
        <span>{{ item[1].title }}</span>
      </div>

      <div class="dl">
        <strong>Прогресс: </strong>
        <div class="line-wrap"
             :title="'Потрачено ' + getSpentPercent(item[0]) + '%' "
        >
          <div
              :class="{
                line: true,
                green: getSpentPercent(item[0]) > 1,
                yellow: getSpentPercent(item[0]) > 50,
                red: getSpentPercent(item[0]) > 80
              }"
              :style="{ width: `${getSpentPercent(item[0] )}% `,
                visibility: getSpentPercent(item[0]) < 1 ? 'hidden' : ''
              }"
          ></div>
        </div>
      </div>
      <button @click="toggleParagraph(item[0])">&#128073;</button>
      <div class="paragraph" v-if="showParagraph[item[0]]">
        <span><strong>Потрачено: </strong> {{ currencyFilter(getSpentSum(item[0])) }} <strong> из </strong> {{ currencyFilter(item[1].limit + getSpentSum(item[0])) }} ({{ getSpentPercent(item[0]) }}%).</span>
        <span><strong>Оставшийся лимит: </strong> {{ currencyFilter( item[1].limit)}}  ({{100 - getSpentPercent(item[0]) }}%)</span>
      </div>
    </li>
  </ul>
  <div class="pagination-block">
    <button @click="prevPage" :disabled="currentPage === 1">&#8592;</button>
    <span>{{ currentPage }} / {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages">&#8594;</button>
  </div>
</template>

<style scoped lang="scss">
@import "../../assets/res";

.balance{
  width: 100%;
  @include flexbox(flex, space-between, center, row);
}
.paragraph{
  @include flexbox(flex, unset, unset, column);
}
ul {
  @include flexbox(flex, unset, unset, column);
  width: 100%;
  list-style-type: none;
  gap: $gap-small;
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
.pagination-block{
  @include flexbox(flex, center, center, row);
  gap: $gap-small;
}
button{
  background-color: $color10;
  cursor: pointer;
  border:none;
  @media (max-width: 859px) {
    font-size: 24px;
  }
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
</style>