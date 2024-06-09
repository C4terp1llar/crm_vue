<script setup>
import {onMounted, ref} from "vue";
import {sendAlert} from "@/helpers/alertHelper";
import {useStore} from "vuex";
import AccountBalance from "@/components/account/AccountBalance.vue";
import dateFilter from "../helpers/dateFilter";
import AppLoader from "@/components/AppLoader.vue";
import AccountCurrency from "@/components/account/AccountCurrency.vue";

const store = useStore();

const currency = ref(null);
const date = ref('');
const isLoading = ref(false);


const bill = store.getters["info/getUserInfo"].bill;

onMounted(async () => {
  try {
    isLoading.value = true;
    await store.dispatch('currency/uploadCurrency');
    currency.value = store.getters["currency/getCurrency"].rates;
    date.value = store.getters["currency/getCurrency"].date
  }catch (e){
    sendAlert('Возникла ошибка при получении данных о валютах, попробуйте позже');
    console.error(e.message);
  }finally {
    isLoading.value = false
  }
});
</script>

<template>

  <app-loader v-if="isLoading"/>
  <div v-else class="cont">
    <account-balance
        :currency="currency"
        :bill="bill"
    />
    <account-currency
        :currency="currency"
        :date="date"
    />
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
  @media (max-width: 859px) {
    @include flexbox(flex, center, center, column);
  }
  .currency-block, .balance-block {
    @include flexbox(flex,unset,center,column);
    gap: $gap-small;
    background-color: $color10;
    border-radius: $radius;
    height: 100%;
    padding: $padding-medium;
    @media (max-width: 859px) {
      width: 100%;
    }
  }
}
</style>