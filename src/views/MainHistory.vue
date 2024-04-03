<script setup>
import {computed, onMounted, ref} from "vue";
import AppLoader from "@/components/AppLoader.vue";
import {useStore} from "vuex";
import {sendAlert} from "@/helpers/alertHelper";
import {useRoute} from "vue-router";
import HistoryList from "@/components/history/HistoryList.vue";
import HistoryChart from "@/components/history/HistoryChart.vue";

const store = useStore();
const route = useRoute();

const isLoading = ref(false);
const routerFlag = computed(() => !!Object.keys(route.params).length);

onMounted(async () => {
  try {
    isLoading.value = true;

    await store.dispatch('entries/getEntriesFromDb');
  }catch (e){
    console.error(e.message);
    sendAlert('Ошибка при получении записей, попробуйте позже', 'error');
  }finally {
    isLoading.value = false;
  }
})
</script>

<template>
  <app-loader v-if="isLoading"/>
  <div class="cont" v-else-if="!store.getters['entries/getEntries']">
    <div>Истории пока нет. <router-link to="/home/new">Новая запись</router-link></div>
  </div>
  <div v-else>
    <router-view v-if="routerFlag"/>
    <div v-else class="cont">
      <history-chart />
      <history-list />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/res";

.cont {
  width: 100%;
  height: 100%;
  gap: $gap-medium;
  @include flexbox(flex, center, center, column);
  background-color: $color8;
  padding: $padding-large;
  border-radius: $radius;

}
</style>