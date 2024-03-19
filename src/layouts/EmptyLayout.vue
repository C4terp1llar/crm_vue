<script>
import Auth from "@/views/Auth.vue";
import Reg from "@/views/Reg.vue";
import {computed} from "vue";
import {useRoute} from "vue-router";

export default {
  setup(){
    const route = useRoute();

    const stage = computed(() => {
      return route.name || "auth"
    });

    return{
      stage
    }
  },
  components: {Auth, Reg}
}
</script>

<template>
  <div class="container">
    <component :is="stage">
      <router-view

      />
    </component>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/res";

.container {
  @include flexbox(flex, center, center, column);
  padding: $padding-large;
  background-color: $color5;
  border-radius: $radius;
}
</style>