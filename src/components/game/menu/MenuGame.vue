<script lang="ts" setup>
import MenuChoose from '~/components/game/menu/MenuChoose.vue';

const { setConfigPlayerOne, setConfigPlayerTwo } = inject('MENU_CONFIG');

const playerOne = ref(true);
</script>

<template>
  <menu-choose
    v-if="playerOne"
    title="Выбор снаряжения (Игрок 1)"
    @save="(v) => {
      setConfigPlayerOne(v);
      playerOne = false;
    }" />
  <menu-choose v-else title="Выбор снаряжения (Игрок 2)" @save="(v) => setConfigPlayerTwo(v)" />
</template>

