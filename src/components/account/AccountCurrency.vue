<script setup>
import dateFilter from "@/helpers/dateFilter";
import {defineProps} from "vue";

defineProps({
  currency: Object,
  date: String
});

</script>

<template>
  <div class="currency-block">
    <h2>Актуальный курс валют:</h2>
    <table>
      <thead>
      <tr>
        <th>Валюта</th>
        <th>Курс</th>
        <th>Дата</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(cur, i) in currency" :key="i">
        <td>{{ i }}</td>
        <td>{{(1 / cur).toFixed(2) + ' ₽'}}</td>
        <td>{{dateFilter(date)}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
@import "../../assets/res";

.currency-block {
  width: 70%;
  @include flexbox(flex, unset,unset, column);
  gap: $gap-small;

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
    }
  }
}
</style>