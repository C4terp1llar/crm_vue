<script setup>
import currencyFilter from "@/helpers/currencyFilter";
import {computed} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import usePagination from "@/helpers/paginationHelper";

const store = useStore();
const router = useRouter();

const entries = computed(() => store.getters["entries/getEntries"]);
const categories = computed(() => store.getters["category/getCategories"]);
const getCategoryInfo = (id) => {
  if (!categories.value[id]) return '-';

  return categories.value[id].title
}

const handleClick = (id = 'income') => {
  router.push({
    name: 'entryInfo',
    params: {
      entryId: id
    }
  });
}

const { currentPage, totalPages, paginatedData, nextPage, prevPage } = usePagination(entries, {
  pageSize: 5, // Настройка количества элементов на странице
});
</script>

<template>
  <div class="block">
    <table>
      <thead>
      <tr>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Подробнее</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in paginatedData" :key="item[0]">

        <td>{{currencyFilter(item[1].val)}}</td>

        <td>{{item[1].date}}</td>

        <td>{{getCategoryInfo(item[1].categoryId)}}</td>

        <td
            :style="{color: item[1].type === 'income' ? 'green' : 'darkred'}"
        >
          {{item[1].type === 'income' ? 'Доход' : 'Расход'}}
        </td>
        <td><button @click="handleClick(item[0])"> &#128073;</button></td>
      </tr>
      </tbody>
    </table>
    <div class="pagination-block">
      <button @click="prevPage" :disabled="currentPage === 1">&#8592;</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">&#8594;</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../assets/res";

.block {
  @include flexbox(flex, unset, center, column);
  gap: $gap-small;
  width: 100%;
  background-color: $color10;
  border-radius: $radius;
  height: 100%;
  padding: $padding-medium;
  .pagination-block{
    @include flexbox(flex, center, center, row);
    gap: $gap-small;
    button{
      background-color: $color10;
      cursor: pointer;
      border:none;
    }
  }
  table {
    width: 100%;
    border-collapse: collapse;

    th, td {
      padding: 10px;
      border: 2px solid $color8;
      text-align: center;

      &:first-child {
        border-left: none;
      }

      &:last-child {
        border-right: none;
      }
    }

    th {
      font-weight: bold;
      font-size: 16px;
    }

    td {
      font-size: 14px;
      button{
        background-color: $color10;
        border: none;
        cursor: pointer;
      }
    }
  }
}
</style>