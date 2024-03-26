<script setup>
import { defineProps } from 'vue';
import currencyFilter from "@/helpers/currencyFilter";

defineProps({
  currency: Object,
  bill: Number
})
</script>

<template>
  <div class="balance-block">
    <h2>Баланс:</h2>
    <ul>
      <li v-for="(cur, i) in currency" :key="i">
        <h3>{{ currencyFilter(bill * cur, i) }}</h3>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import "../../assets/res";

.balance-block {
  width: 30%;
  @include flexbox(flex,unset,unset,column);
  gap: $gap-small;

  ul {
    @include flexbox(flex,unset,unset,column);
    gap: $gap-small;
    list-style: none;
    li{
      display: flex;
    }
    li::before {
      content: "•";
      color: $color8;
      margin-right: 10px;
    }
  }
}
</style>