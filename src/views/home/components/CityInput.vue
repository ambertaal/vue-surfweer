<template>
  <v-text-field
    clearable
    label="Voer een stad in"
    :model-value="cityName"
    @input="updateCityName"
    @keyup.enter="emit('cityChanged', cityName.trim())"
  />
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'

  const props = defineProps<{ modelValue: string }>()
  const emit = defineEmits(['update:modelValue', 'cityChanged'])

  const cityName = ref(props.modelValue)

  // Zorg ervoor dat cityName synchroniseert met de parent wanneer deze verandert
  watch(() => props.modelValue, newValue => {
    cityName.value = newValue
  })

  const updateCityName = (event: Event) => {
    const input = (event.target as HTMLInputElement).value
    cityName.value = input
    emit('update:modelValue', input) // Hierdoor wordt de parent geüpdatet
  }

</script>
