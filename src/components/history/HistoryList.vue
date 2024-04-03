<script setup>
import currencyFilter from "@/helpers/currencyFilter";
import {computed} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

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
</script>

<template>
  <div class="block">
    <table>
      <thead>
      <tr>
        <th>#</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Подробнее</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(entry, id, i) in entries" :key="id">
        <td>{{i+=1}}</td>

        <td>{{currencyFilter(entry.val)}}</td>

        <td>{{entry.date}}</td>

        <td>{{getCategoryInfo(entry.categoryId)}}</td>

        <td
            :style="{color: entry.type === 'income' ? 'green' : 'darkred'}"
        >
          {{entry.type === 'income' ? 'Доход' : 'Расход'}}
        </td>
        <td><button @click="handleClick(id)">	&#128073;</button></td>
      </tr>
      </tbody>
    </table>
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