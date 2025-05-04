<script lang="ts" setup>
import { type AType, getConfigAByType } from '~/components/game/armor/index';

const props = defineProps<{
  type: AType;
  active?: boolean;
}>();

const armor = computed(() => getConfigAByType(props.type));
</script>

<template>
  <div class="a" :class="{'active': active}">
    <div class="a-wrapper">
      <div class="a__name">
        {{ armor?.type }}
      </div>
      <div class="a__container">
        <ui-icon :name="armor?.type" :size="9" class="a__icon" />
      </div>
    </div>
    <div class="a-info">
      <div class="a-info__row">
        <div class="a-info__row-name">Protection:</div>
        <div class="a-info__row-value">{{ armor?.protection }}%</div>
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">
.a {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.3s ease;

  @include hover {
    cursor: pointer;
    transform: rotateX(20deg) rotateY(-15deg);
    .a__container {
      box-shadow: 0 0.5rem 1rem 0.2rem rgba(255, 142, 38, 0.4);
    }
    .a__name {
      display: block;
    }
    .a-info {
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

    .a__container {
      box-shadow: 0 0.5rem 1rem 0.2rem rgba(255, 142, 38, 0.4);
    }

    .a__name {
      display: block;
      color: $orange;
    }

    .a-info {
      display: flex;
    }
  }
}

.a-info {
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
    color: $orange;
  }
}

.a-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  transition: all 0.3s ease;
}

</style>
