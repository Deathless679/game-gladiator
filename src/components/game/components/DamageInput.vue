<script lang="ts" setup>
const modelValue = defineModel<string>()
</script>

<template>
  <div class="d-input">
    <ui-input v-model="modelValue"  label="Damage" placeholder="damage" class="d-input__input" />
  </div>
</template>
