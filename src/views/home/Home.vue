<template>
  <NavigationDrawer v-model:drawer="drawer" />
  <AppBar v-model:drawer="drawer" />

  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="900"
    >
      <div class="text-center">
        <h1>Wanneer kan ik surfen?</h1>
        <CitySelector
          v-model="selectedCityId"
          :places="places"
          @city-changed="handleCityChange"
          @update:model-value="updateCity"
        />
      </div>
      <v-divider class="mt-4 mb-4" />
      <ForecastTable
        :forecast="forecast"
        :formatted-city-name="formattedCityName"
      />
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref, watch } from 'vue'
  import CitySelector from '../home/components/CitySelector.vue'
  import ForecastTable from '../home/components/ForecastTable.vue'
  import NavigationDrawer from '../../components/NavigationDrawer.vue'
  import AppBar from '../../components/AppBar.vue'
  import { get3HourlyForecast, getCoordinates } from '../../api/WeatherService'

  // Controleert of er een stad is opgeslagen in localStorage.
  // Laadt de weersvoorspelling van die stad.
  onMounted(async () => {
    const savedCityId = localStorage.getItem('selectedCityId')
    const savedCityName = localStorage.getItem('selectedCityName')

    if (savedCityId) {
      selectedCityId.value = parseInt(savedCityId, 10)
      const place = places.find(p => p.id === selectedCityId.value)
      if (place) {
        cityName.value = place.name
        await getForecastForCity(place.name)
      }
    } else if (savedCityName) {
      cityName.value = savedCityName
      selectedCityId.value = null
      await getForecastForCity(savedCityName)
    }
  })

  // Definieer interfaces voor typecontrole
  interface Place {
    id: number
    name: string
    latitude: number
    longitude: number
  }

  interface ForecastEntry {
    dateTime: string
    temp: number
    rain: number
    wind: number
    description: string
    surfAdvice: string
  }

  // Reactieve variabelen
  const drawer = ref(true)
  const cityName = ref<string>('Scheveningen')
  const selectedCityId = ref<number | null>(null)
  const forecast = ref<ForecastEntry[]>([])
  const error = ref<string | null>(null)

  // Bekende plaatsen
  const places: Place[] = [
    { id: 1, name: 'Scheveningen', latitude: 52.1089, longitude: 4.2769 },
    { id: 2, name: 'Hoek van Holland', latitude: 51.9775, longitude: 4.1338 },
    { id: 3, name: 'Katwijk', latitude: 52.203, longitude: 4.3988 },
    { id: 4, name: 'Wijk aan Zee', latitude: 52.4936, longitude: 4.607 },
    { id: 5, name: 'Vlieland', latitude: 53.3037, longitude: 5.0667 },
    { id: 6, name: 'Porto, Portugal', latitude: 41.14961, longitude: -8.61099 },
    { id: 7, name: 'Los Angeles, CA, USA', latitude: 34.052235, longitude: -118.243683 },
  ]

  // Zorgt ervoor dat de stad altijd correct geformatteerd wordt (eerste letter hoofdletter).
  // computed() zorgt ervoor dat de waarde alleen opnieuw wordt berekend als selectedCityId of cityName verandert.
  const formattedCityName = computed(() => {
    const place = places.find(p => p.id === selectedCityId.value)
    const capitalize = (name: string): string => name.charAt(0).toUpperCase() + name.slice(1)
    return place ? place.name : capitalize(cityName.value) || ''
  })

  // Stap 1: Haal de coördinaten van een stad op met getCoordinates().
  // Stap 2: Als er geen resultaten zijn, toon een foutmelding.
  // Stap 3: Haal de weersvoorspelling op via get3HourlyForecast().
  // Stap 4: Bereken het surfadvies via determineSurfAdvice().
  const getForecastForCity = async (cityName: string) => {
    const coordinates = await getCoordinates(cityName)

    if (!coordinates) {
      error.value = `Geen resultaten gevonden voor "${cityName}".`
      return
    }

    const forecastData = await get3HourlyForecast(coordinates.lat, coordinates.lon)
    forecast.value = forecastData.map(entry => ({
      ...entry,
      surfAdvice: determineSurfAdvice(entry.temp, entry.wind, entry.rain),
    }))
  }

  // Controleert of de stad bekend is en haalt de weerdata op.
  // Slaat de stad op in localStorage, zodat deze onthouden wordt bij een volgende keer openen van de app.
  const handleCityChange = async (newCityName: string) => {
    const trimmedCityName = newCityName?.trim()

    if (!trimmedCityName) {
      error.value = 'Voer een geldige stad in.'
      return
    }

    cityName.value = trimmedCityName

    const matchedPlace = places.find(
      p => p.name.toLowerCase() === trimmedCityName.toLowerCase()
    )

    if (matchedPlace) {
      // Bekende stad
      selectedCityId.value = matchedPlace.id
      localStorage.setItem('selectedCityId', matchedPlace.id.toString())
      await getForecastForCity(matchedPlace.name) // Haalt coördinaten van bekende plaatsen op
    } else {
      // Onbekende stad, gebruik Geo API
      selectedCityId.value = null
      localStorage.setItem('selectedCityName', trimmedCityName)
      await getForecastForCity(trimmedCityName)
    }
  }

  // Update cityName bij selecteren uit de dropdown
  const updateCity = (newCityId: number) => {
    selectedCityId.value = newCityId
    const place = places.find(p => p.id === newCityId)
    if (place) {
      cityName.value = place.name
      getForecastForCity(place.name)
    }
  }

  // Functie om surfadvies te bepalen
  const determineSurfAdvice = (
    temp: number,
    wind: number,
    rain: number
  ): string => {
    if (temp >= 12 && wind >= 3 && wind <= 7 && rain < 2) {
      return 'Geschikt voor beginners'
    } else if (temp >= 12 && wind > 7 && wind <= 10 && rain < 2) {
      return 'Geschikt voor gevorderden'
    } else {
      return 'Niet geschikt'
    }
  }

  // Reactieve verandering: Als selectedCityId verandert, wordt deze direct opgeslagen in localStorage.
  watch(selectedCityId, newCityId => {
    if (newCityId !== null) {
      localStorage.setItem('selectedCityId', newCityId.toString())
    } else {
      localStorage.removeItem('selectedCityId') // Verwijder de waarde als geen stad geselecteerd is
    }
  })
</script>

<style lang="scss">
.h1-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh; /* Zorgt ervoor dat de h1 in het midden van de viewport staat */
  text-align: center;
}

/* Voor mobiele schermen */
@media (max-width: 600px) {
  .h1-container {
    height: 10vh; /* Op mobiel mag de h1 hoger staan */
  }

  h1 {
    font-size: 1.8rem !important;
  }
}

</style>
