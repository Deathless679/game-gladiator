<script lang="ts" setup>
import Gladiator from '~/components/game/gladiator/Gladiator.vue';
import MenuGame from '~/components/game/menu/MenuGame.vue';
import type { GOptions } from '~/components/game/gladiator';


const defaultOptions = {
  maxHealth: 20,
  health: 20,
  protection: 1,
  damage: 1,
};
const gladiatorOptions = ref<GOptions>(defaultOptions);

const enemyOptions = ref<GOptions>(defaultOptions);

const openMenu = ref(true);
const endGame = ref(false);

const playerRef = ref(null);
const enemyRef = ref(null);

function handlerAttack(initiator: 'player' | 'enemy') {
  if (!enemyRef.value || !playerRef.value) return;
  if (initiator === 'player') {
    const dmg = playerRef.value.character.dealDamage()
    playerRef.value.attackAnim();
    enemyRef.value.takeDamage(dmg);
  } else {
    const dmg = enemyRef.value.character.dealDamage()
    enemyRef.value.attackAnim();
    playerRef.value.takeDamage(dmg);
  }
}

function updateOptConfig(v) {
  return {
    protection: v?.armor.protection,
    damage: v?.weapon.damage,
    criticalChance: v?.weapon.criticalChance,
    criticalDamage: v?.weapon.criticalDamage
  }
}

provide('MENU_CONFIG', {
  setConfigPlayerOne: (v: Record<string, unknown>) => {
    gladiatorOptions.value = {
      ...defaultOptions,
      ...updateOptConfig(v)
    }
  },
  setConfigPlayerTwo: (v: Record<string, unknown>) => {
    enemyOptions.value = {
      ...defaultOptions,
      ...updateOptConfig(v)
    }
    openMenu.value = false;
  },
});
</script>

<template>
  <div class="w-g">
    <div v-if="openMenu" class="w-g__over">
      <menu-game />
    </div>
    <div v-show="!openMenu" class="w-g__content">
      <div class="w-g__container">
        <div class="w-g__container-item">
          <gladiator
            ref="playerRef"
            type="skeleton"
            name="Скелет (Игрок 1)"
            :options="gladiatorOptions"
            @take-dmg="() => handlerAttack('enemy')"
            @end="() => endGame = true"
          />
        </div>
        <div class="w-g__container-item">
          <gladiator
            ref="enemyRef"
            type="org"
            name="Орг (Игрок 2)"
            enemy
            :options="enemyOptions"
            @take-dmg="() => handlerAttack('player')"
            @end="() => endGame = true"
          />
        </div>
      </div>
    </div>
    <div v-if="endGame" class="w-g__end">
      Игра окончена !
      <ui-button @click="reloadNuxtApp">
        Рестарт
      </ui-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.w-g {
  position: relative;

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    animation: open 0.3s ease;
  }

  &__container {
    display: flex;
    align-items: flex-end;
    gap: 20rem;
    padding-top: 10rem;
  }

  &__container-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }


  &__end {
    overflow: hidden;
    position: absolute;
    top: -5rem;
    left: -5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    backdrop-filter: blur(0.5rem);
    width: calc(100% + 10rem);
    height: calc(100% + 10rem);;
    border-radius: 3rem;
    @include text(2rem, 120% , 500, $black);
    animation: open 0.3s ease;
  }

  @keyframes open {
    0% {
      opacity: 0
    }
    100% {
      opacity: 100%
    }
  }
}
</style>