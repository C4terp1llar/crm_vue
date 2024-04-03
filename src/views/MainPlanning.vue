<script setup>
import {useStore} from "vuex";
import {computed, onMounted, onUnmounted, ref} from "vue";
import {sendAlert} from "@/helpers/alertHelper";
import AppLoader from "@/components/AppLoader.vue";
import PlanningList from "@/components/planning/PlanningList.vue";

const store = useStore();

const isLoading = ref(false);

const entries = computed(() => store.getters["entries/getEntries"])

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
    <div v-if="!entries">Записей пока нет. <router-link to="/home/new">Новая запись</router-link></div>
    <div v-else class="block">
      <planning-list :entriesList="entries"/>
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
  }
}
</style>