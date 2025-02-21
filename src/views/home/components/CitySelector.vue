<template>
  <v-row align="center" class="d-flex" justify="center">
    <!-- Dropdown voor bekende plaatsen -->
    <v-col cols="12" lg="4">
      <v-select
        v-model="selectedCity"
        item-title="name"
        item-value="id"
        :items="places"
        label="Kies een stad"
      />
    </v-col>

    <span class="seperator-text">of</span>

    <!-- Invoerveld voor stad -->
    <v-col cols="12" lg="4">
      <v-text-field
        v-model="cityName"
        clearable
        label="Voer een stad in"
        @click:clear="clearCity"
        @keyup.enter="onEnter"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'

  // Typen voor de 'places' array en geselecteerde stad
  interface Place {
    id: number;
    name: string;
  }

  // Props voor de stedenlijst en de geselecteerde stad
  const props = defineProps({
    places: {
      type: Array as () => Place[],
      required: true,
    },
    modelValue: {
      type: [Number, null],
      required: true,
    },
  })

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

  watch(cityName, newCityName => {
    if (!newCityName?.trim()) {
      selectedCity.value = null
      return
    }

    const matchedPlace = props.places.find(
      p => p.name.toLowerCase() === newCityName.trim().toLowerCase()
    )
    if (matchedPlace) {
      selectedCity.value = matchedPlace.id
      emit('update:modelValue', matchedPlace.id)
    }
  })

  const onEnter = () => {
    const trimmedName = cityName.value.trim()

    emit('cityChanged', trimmedName)
  }

  const place = props.places.find(p => p.id === props.modelValue)
  if (place) {
    cityName.value = place.name
  }

  const clearCity = () => {
    cityName.value = ''
    selectedCity.value = null
    emit('cityChanged', '')
  }

</script>

<style scoped>
.seperator-text {
  margin: 0 16px;
  font-size: 1rem;
  align-self: center;
}
</style>
