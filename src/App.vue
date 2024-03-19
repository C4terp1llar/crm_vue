<template>
  <component :is="stage">
    <router-view

    />
  </component>
</template>

<script>
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import {useRoute} from "vue-router";
import {computed} from "vue";

export default {
  setup(){
    const route = useRoute();

    const stage = computed(() => {
      return (route.name || 'empty') + '-layout'
    });

    return{
      stage
    }
  },
  components: {EmptyLayout, MainLayout}
}
</script>

<style lang="scss">
@import "assets/res";

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html, body{
  width: 100%;
  height: 100%;
}
#app{
  width: 100%;
  height: 100%;
  background-color: $color10;
  @include flexbox(flex,center,center,row);
}
</style>
