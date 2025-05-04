<script lang="ts" setup>
import { getConfigWByType, type WType } from '~/components/game/weapon/index';

const props = defineProps<{
  type: WType;
  active?: boolean;
}>();

const weapon = computed(() => getConfigWByType(props.type));
</script>

<template>
  <div class="w" :class="{'active': active}">
    <div class="w-wrapper">
      <div class="w__name">
        {{ weapon?.type }}
      </div>
      <div class="w__container">
        <ui-icon :name="weapon?.type" :size="9" class="w__icon" />
      </div>
    </div>
    <div class="w-info">
      <div class="w-info__row">
        <div class="w-info__row-name">Damage:</div>
        <div class="w-info__row-value">{{ weapon?.damage }}</div>
      </div>
      <div class="w-info__row">
        <div class="w-info__row-name">Crit. Chance:</div>
        <div class="w-info__row-value">{{ weapon?.criticalChance }}%</div>
      </div>
      <div class="w-info__row">
        <div class="w-info__row-name">Crit. Damage:</div>
        <div class="w-info__row-value">{{ weapon?.criticalDamage }}</div>
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">
.w {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.3s ease;

  @include hover {
    cursor: pointer;
    transform: rotateX(20deg) rotateY(-15deg);
    .w__container {
      box-shadow: 0 0.5rem 1rem 0.2rem rgba(106, 90, 205, 0.4);;
    }
    .w__name {
      display: block;
    }
    .w-info {
      display: flex;
    }
  }

  &__name {
    display: none;
    @include text(1.6rem, 120%, 400, $black);
    text-transform: uppercase;
  }

  &__container {
    border-radius: 0.5rem;
    padding: 0.5rem;
    background: rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(0.5rem);
  }

  &.active {
    cursor: pointer;
    transform: rotateX(20deg) rotateY(-15deg);

    .w__container {
      box-shadow: 0 0.5rem 1rem 0.2rem rgba(106, 90, 205, 0.4);;
    }

    .w__name {
      display: block;
      color: $purple;
    }

    .w-info {
      display: flex;
    }
  }
}

.w-info {
  position: relative;
  display: none;
  flex-direction: column;
  gap: 0.5rem;

  &__row {
    display: flex;
    justify-content: space-between;
    @include text(1.2rem)
  }

  &__row-value {
    font-size: 1.4rem;
    color: $purple;
  }
}

.w-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  transition: all 0.3s ease;
}

</style>
