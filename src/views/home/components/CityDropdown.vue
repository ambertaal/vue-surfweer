<template>
  <v-select
    v-model="selectedCity"
    item-title="name"
    item-value="id"
    :items="places"
    label="Kies een stad"
    @update:model-value="emit('update:modelValue', $event)"
  />
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'

  interface Place {
    id: number;
    name: string;
  }

  const props = defineProps<{
    places: Place[];
    modelValue: number | null;
  }>()

  const emit = defineEmits(['update:modelValue'])

  const selectedCity = ref<number | null>(props.modelValue)

  watch(selectedCity, newCityId => {
    emit('update:modelValue', newCityId)
  })
</script>
