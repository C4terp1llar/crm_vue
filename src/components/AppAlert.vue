<script setup>
import {computed, ref} from "vue";
  import {useStore} from "vuex";

  const store = useStore();

  const track = computed(() => {
    return {
      visible: store.state.alert.isVisible,
      message: store.state.alert.message,
      type: store.state.alert.type
    };
  });
</script>

<template>
  <div class="alert-block" :class="[track.visible ? 'show' : '', track.type]">
    {{ track.message }}
  </div>
</template>

<style scoped lang="scss">
@import "../assets/res";

.alert-block {
  font-size: 18px;

  position: fixed;
  background-color: $color8;
  padding: $padding-medium;
  border-radius: $radius;
  border: 2px solid darken($color8,40%);

  bottom: 15px;
  right: -15px;

  visibility: hidden;
  opacity: 0;
  transition: .5s;
}
.show{
  right: 15px;
  visibility: visible;
  opacity: 1;
  transition: .5s;
}
.error{
  color: darkred;
  border: 2px solid darkred;
}
.success{
  color: green;
  border: 2px solid green;
}
</style>