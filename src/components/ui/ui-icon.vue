<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  name: string;
  size: number;
  color?: string;
}>();


const currentIcon = ref<any>('');

const iconSize = computed(() => `${props.size}rem`);
const iconColor = computed(() => props.color ?? 'inherit');

async function getIcon() {
  try {
    const iconsImport = import.meta.glob('public/media/icons/**/**.svg', {
      query: '?raw',
      import: 'default',
      eager: false,
    });
    const iconPath: string | undefined = Object.keys(iconsImport).find((el) => {
      return el.includes(`${props.name}.svg`);
    });

    if (!iconPath) {
      return new Error();
    }

    currentIcon.value = await iconsImport[iconPath]();

  } catch (e) {
    return e;
  }
}

const classes = computed(() => [
  'ui-icon',
  { 'ui-icon--size': props.size },
]);

watchEffect(getIcon)
</script>

<template>
  <div :class="classes" v-html="currentIcon" />
</template>

<style lang="scss" scoped>
.ui-icon {
  width: 100%;
  height: 100%;
  color: v-bind(iconColor);

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  &--size {
    width: v-bind(iconSize) !important;
    height: v-bind(iconSize) !important;
  }

}
</style>