<script lang="ts" setup>
import Weapon from '~/components/game/weapon/Weapon.vue';
import Armor from '~/components/game/armor/Armor.vue';
import { type AType, getConfigAByType } from '~/components/game/armor';
import { getConfigWByType, type WType } from '~/components/game/weapon';

defineProps<{
  title: string
}>()

const emit = defineEmits(['save'])

const configWeapons = ['knife', 'sword', 'mace', 'fist'];
const configArmors = ['shield', 'armor']

const activeWeapon = ref<string | null>(null);
const activeArmor = ref<string | null>(null);

function handlerSetWeapon(type: string): void {
  if (activeWeapon.value === type) activeWeapon.value = null;
  else activeWeapon.value = type;
}

function handlerSetArmor(type: string): void {
  if (activeArmor.value === type) activeArmor.value = null;
  else activeArmor.value = type;
}

function handlerSave() {
  emit('save', {
    armor: getConfigAByType(activeArmor.value as AType),
    weapon: getConfigWByType(activeWeapon.value as WType)
  })
}
</script>

<template>
  <div class="m-choose">
    <div class="m-choose__head">
      <div class="m-choose__title">
        {{ title }}
      </div>
      <transition name="default">
        <div v-if="activeArmor && activeWeapon" class="m-choose__save">
          <ui-button @click="handlerSave">
            Сохранить
          </ui-button>
        </div>
      </transition>
    </div>
    <div class="m-choose__weapon">
      <weapon
        v-for="weaponType in configWeapons"
        :key="weaponType" :type="weaponType"
        :active="activeWeapon === weaponType"
        @click="handlerSetWeapon(weaponType)"
      />
    </div>
    <div class="m-choose__armor">
      <armor
        v-for="armorType in configArmors"
        :key="armorType" :type="armorType"
        :active="activeArmor === armorType"
        @click="handlerSetArmor(armorType)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.m-choose {
  display: flex;
  flex-direction: column;

  animation: open 0.7s ease;

  @keyframes open {
    0% {
      opacity: 0
    }
    100% {
      opacity: 100%
    }
  }

  &__title {
    @include text(1.8rem, 120%, 500, $black);
  }

  &__head {
    @include flex(center, space-between);
    height: 4rem;
  }

  &__weapon {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    height: 20rem;
  }

  &__armor {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    height: 13rem;
  }

}
</style>