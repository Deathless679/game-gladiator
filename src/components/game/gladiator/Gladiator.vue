<script lang="ts" setup>
import { Gladiator, type GOptions } from '~/components/game/gladiator/index';

const props = defineProps<{
  name: string;
  type: 'skeleton' | 'org';
  options: GOptions;
  enemy?: boolean;
}>();

const emit = defineEmits(['takeDmg', 'attack', 'end']);

const character = new Gladiator(props.name);

watch(() => props.name, (v) => character.updateName(v));

const actions = ref('default');

const health = computed(() => character.getCurrentHealth());

const characterImage = computed(() => `media/${props.type}/${actions.value}.png`);

const handlerTakeDamage = () => emit('takeDmg');

function takeDamage(v?: number) {
  character.takeDamage(v ?? character.dealDamage());
  takeDamageAnimation();
}

function takeDamageAnimation() {
  new Promise((resolve) => {
    setTimeout(() => {
      actions.value = 'damage';
      resolve(null);
    }, 100);
  }).then(() => {
    if (health.value > 0) {
      setTimeout(() => {
        actions.value = 'default';
      }, 500);
    }
  });
}

function attackAnimation() {
  new Promise((resolve) => {
    setTimeout(() => {
      actions.value = 'attack_1';
      resolve(null);
    }, 200);
  }).then(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        actions.value = 'attack_2';
        resolve(null);
      }, 400);
    });
  }).then(() => {
    setTimeout(() => {
      actions.value = 'attack_3';
    }, 300);
  }).then(() => {
    setTimeout(() => {
      actions.value = 'default';
    }, 1000);
  });
}

defineExpose({
  character: computed(() => character),
  takeDamage: (v) => setTimeout(takeDamage.bind(null, v), 500),
  attackAnim: attackAnimation,
});

watch(() => props.options, (v) => {
  character.updateOptions(v)
})

onMounted(() => {
  character.updateOptions(props.options);
});
watch(health, (v) => {
  if (v <= 0) emit('end')
})
</script>

<template>
  <div class="gladiator" :class="{enemy: enemy}">
    <div class="gladiator__top" :class="{defeat: !health}">
      <div class="gladiator__name">
        {{ character.name }}
      </div>
      <div class="gladiator__health">
      <span
        v-for="(hp, key) in character.getMaxHealth()"
        :key
        class="gladiator__health-hp"
        :class="{active : hp <= health, broken: health < hp }"
      />
      </div>
    </div>

    <div class="gladiator__picture" :class="{defeat: !health}" @click="handlerTakeDamage">
      <ui-picture :src="characterImage" />
    </div>
    <ui-button class="gladiator__actions" :class="{defeat: !health}" @click="handlerTakeDamage">
      <ui-icon name="swords" :size="2" />
      Attack
    </ui-button>
    <div class="gladiator__options" :class="{defeat: !health}">
      <div v-for="option of Object.keys(options)" class="gladiator__options-row">
        {{ option }}:
        <span>{{ options[option] }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.gladiator {
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;

  &.enemy {
    .gladiator__picture {
      transform: scale(-1, 1);
    }
  }

  &__top {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1rem;

    &.defeat {
      opacity: 0;
      animation: brokenAnim 1.5s ease;
    }
  }

  &__name {
    @include text(1.8rem, 120%, 500, $black);
  }

  &__health {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 0.2rem;
    padding: 0.2rem 0.5rem;
    border-radius: 0.5rem;
    border: 0.1rem solid $border;
  }

  &__health-hp {
    width: 1.25rem;
    height: 0.75rem;
    background: $border;

    &.active {
      background: $red;
    }

    &.broken {
      opacity: 0;
      animation: brokenAnim 1s ease;
    }
  }

  &__picture {
    height: 20rem;
    width: 20rem;
    object-fit: cover;

    -webkit-user-drag: none;

    @include hover {
      cursor: url("public/media/icons/sword-cursor.svg"), auto;
      opacity: 0.9;
    }

    &.defeat {
      opacity: 0;
      animation: defeatAnim 2s ease;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
    color: $black;

    &.defeat {
      opacity: 0;
      animation: brokenAnim 1.5s ease;
    }
  }

  &__options {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
    width: 100%;

    &.defeat {
      opacity: 0;
      animation: defeatAnim 2s ease;
    }
  }

  &__options-row {
    display: flex;
    justify-content: space-between;
    @include text(1.4rem, 120%, 400, $black);

    span {
      color: $purple;
    }
  }
}


@keyframes brokenAnim {
  0% {
    max-width: 100%;
    opacity: 1;
  }
  50% {
    max-width: 50%;
    opacity: 0.7;
  }
  100% {
    max-width: 0;
    opacity: 0;
    font-size: 0;
  }
}

@keyframes defeatAnim {
  0% {
    opacity: 1
  }
  50% {
    transform: translateY(-5rem);
    opacity: 0.7
  }
  100% {
    transform: translateY(-10rem);
    opacity: 0;
  }
}
</style>