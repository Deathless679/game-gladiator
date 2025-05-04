<script lang="ts" setup>
import WrapperGame from '~/components/game/WrapperGame.vue';
</script>

<template>
  <div class="game">
    <wrapper-game />
  </div>
</template>

<style scoped lang="scss">
.game {
  @include flex(center , center);
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: rgb(0, 0, 0, 0.04);
}
</style>