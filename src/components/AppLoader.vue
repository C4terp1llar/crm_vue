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
  border: 2px solid $color10;
  border-top: 2px solid $color8;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
