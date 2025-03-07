<template>
  <v-row align="center" class="d-flex" justify="center">
    <v-col cols="5" md="5">
      <CityDropdown v-model="selectedCity" :places="places" />
    </v-col>
    <v-col cols="0" md="auto">
      <span class="seperator-text">of</span>
    </v-col>
    <v-col cols="5" md="5">
      <CityInput v-model="cityName" @city-changed="onEnter" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import CityDropdown from './CityDropdown.vue'
  import CityInput from './CityInput.vue'
  import { Place } from '@/types'

  const props = defineProps<{ places: Place[], modelValue: number | null }>()
  const emit = defineEmits(['update:modelValue', 'cityChanged'])

  const selectedCity = ref<number | null>(props.modelValue)
  const cityName = ref('')

  watch(selectedCity, newCityId => {
    if (newCityId === null) {
      cityName.value = ''
    } else {
      const matchedPlace = props.places.find(p => p.id === newCityId)
      if (matchedPlace) {
        cityName.value = matchedPlace.name
      }
    }
    emit('update:modelValue', newCityId)
  })

  const onEnter = () => {
    emit('cityChanged', cityName.value.trim())
  }
</script>
