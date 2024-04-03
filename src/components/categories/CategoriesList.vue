<script setup>
import {computed} from "vue";
import {useStore} from "vuex";
import currencyFilter from "../../helpers/currencyFilter";
import usePagination from "@/helpers/paginationHelper";

const store = useStore();

const categories = computed(() => store.getters["category/getCategories"]);

const { currentPage, totalPages, paginatedData, nextPage, prevPage } = usePagination(categories, {
  pageSize: 5, // Настройка количества элементов на странице
});
</script>

<template>
  <h2>Категории</h2>
  <div v-if="!categories">Категорий пока нет</div>
  <div v-else class="items">
    <div  class="item" v-for="item in paginatedData" :key="item[0]">
      <span><strong>Имя: </strong> {{ item[1].title }}</span>
      <span><strong>Лимит: </strong> {{ currencyFilter(item[1].limit) }}</span>
    </div>
    <div class="pagination-block">
      <button @click="prevPage" :disabled="currentPage === 1">&#8592;</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">&#8594;</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../assets/res";

.items{
  @include flexbox(flex, unset, unset, column);
  width: 100%;
  gap: $gap-small;
  h2{
    text-align: center;
  }
  .item{
    @include flexbox(flex, unset, unset, column);
    gap: $gap-small;
    padding: $padding-small;
    border: 1px solid $color8;
    border-radius: $radius;
  }
  .pagination-block{
    @include flexbox(flex, center, center, row);
    gap: $gap-small;
    button{
      background-color: $color10;
      cursor: pointer;
      border:none;
    }
  }
}
</style>