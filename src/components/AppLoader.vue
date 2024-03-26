<template>
  <div class="loader-container">
    <div class="loader"></div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/res";

.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.loader {
  border: 3px solid $color8;
  border-top: 3px solid $color10;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  animation: spin .8s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
