<template>
  <div class="block">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';
import { useStore } from 'vuex';

const store = useStore();
const entries = store.getters["entries/getEntries"];
const categories = store.getters["category/getCategories"];

const chartCanvas = ref(null);

// Создание объекта, в котором ключами будут названия категорий, а значениями - сумма затрат по каждой категории
const categoryTotalExpenses = {};

Object.values(categories).forEach(category => {
  categoryTotalExpenses[category.title] = 0;
});

// Вычисление общей суммы затрат по каждой категории
Object.values(entries).forEach(entry => {
  const categoryId = entry.categoryId;
  const category = categories[categoryId];
  if (category) {
    categoryTotalExpenses[category.title] += entry.val;
  }
});

const labels = Object.keys(categoryTotalExpenses);
const dataValues = Object.values(categoryTotalExpenses)

const data = ref({
  labels: labels,
  datasets: [{
    data: dataValues
  }]
});

onMounted(() => {
  const ctx = chartCanvas.value.getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: data.value
  });
});
</script>

<style scoped lang="scss">
@import "../../assets/res";

.block {
  @include flexbox(flex, unset, center, column);
  gap: $gap-small;
  width: 100%;
  background-color: $color10;
  border-radius: $radius;
  height: 50%;
  padding: $padding-medium;
}
</style>
