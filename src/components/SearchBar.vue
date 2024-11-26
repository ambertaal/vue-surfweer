<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="900"
    >
      <div class="text-center">
        <h1 class="text-h2 font-weight-bold">Wanneer kan ik surfen?</h1>
        <!-- Dropdown voor bekende plaatsen -->
        <v-select
          v-model="selectedPlace"
          item-title="name"
          item-value="id"
          :items="places"
          label="Kies een plaats"
          @update:model-value="updateCityName"
        />
        <!-- Invoerveld voor stad -->
        <v-text-field
          v-model="cityName"
          label="Voer een stad in"
          @change="getCoordinates"
        />
      </div>
      <!-- Weerdata -->
      <div v-for="search in searches" :key="search.id">
        <h2 class="mt-4 mb-4">Weer in {{ search.name }}</h2>
        <p>Latitude: {{ search.latitude }}</p>
        <p>Longitude: {{ search.longitude }}</p>
        <p>Temperatuur: {{ search.weather.temp }}°C</p>
        <p>Weeromschrijving: {{ search.weather.description }}</p>
      </div>
      <v-row class="mt-8 mb-8" no-gutters>
        <span>Overzicht van dagen</span>
      </v-row>
      <v-divider />
      <h2 class="mt-4 mb-4">Details</h2>
      <v-row no-gutters>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <v-card
              class="mx-auto my-8"
              elevation="16"
              max-width="344"
            >
              <v-card-item>
                <v-card-title>
                  Wind
                </v-card-title>

                <v-card-subtitle>
                  Card subtitle secondary text
                </v-card-subtitle>
              </v-card-item>

              <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </v-card-text>
            </v-card>
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <v-card
              class="mx-auto my-8"
              elevation="16"
              max-width="344"
            >
              <v-card-item>
                <v-card-title>
                  Temperatuur
                </v-card-title>

                <v-card-subtitle>
                  Card subtitle secondary text
                </v-card-subtitle>
              </v-card-item>

              <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </v-card-text>
            </v-card>
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <v-card
              class="mx-auto my-8"
              elevation="16"
              max-width="344"
            >
              <v-card-item>
                <v-card-title>
                  Sunset
                </v-card-title>

                <v-card-subtitle>
                  Card subtitle secondary text
                </v-card-subtitle>
              </v-card-item>

              <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </v-card-text>
            </v-card>
          </v-sheet>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue'
  import axios from 'axios'

  // Definieer interfaces voor typecontrole
  interface Place {
    id: number
    name: string
    latitude: number
    longitude: number
  }

  interface Weather {
    temp: number
    description: string
  }

  interface Search extends Place {
    weather: Weather
  }

  // Reactieve variabelen
  const cityName = ref<string>('')
  const selectedPlace = ref<number | null>(null)
  const searches = reactive<Search[]>([])
  const error = ref<string | null>(null)

  // Bekende plaatsen
  const places: Place[] = [
    { id: 1, name: 'Scheveningen', latitude: 52.1089, longitude: 4.2769 },
    { id: 2, name: 'Hoek van Holland', latitude: 51.9775, longitude: 4.1338 },
    { id: 3, name: 'Katwijk', latitude: 52.203, longitude: 4.3988 },
    { id: 4, name: 'Wijk aan Zee', latitude: 52.4936, longitude: 4.607 },
    { id: 5, name: 'Vlieland', latitude: 53.3037, longitude: 5.0667 },
  ]

  // API details
  const apiKey = 'b41deb7dacc3ad8cec7aa9a0b07fa57f'
  const geoApiUrl = 'http://api.openweathermap.org/geo/1.0/direct'
  const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather'

  // Fetch coordinates
  const getCoordinates = async () => {
    if (!cityName.value) return
    try {
      const response = await axios.get(geoApiUrl, {
        params: {
          q: cityName.value,
          limit: 1,
          appid: apiKey,
        },
      })

      const result = response.data[0] // Eerste resultaat van de API
      if (result) {
        const { name, lat, lon } = result
        const newSearch: Search = {
          id: Date.now(),
          name,
          latitude: lat,
          longitude: lon,
          weather: {
            temp: 0, // Dummydata totdat we het echte weer ophalen
            description: '',
          },
        }
        searches.push(newSearch)

        // Haal weer op na het toevoegen van de locatie
        await getWeather(lat, lon, newSearch.id)
      }
    } catch (err) {
      error.value = 'Er is een fout opgetreden bij het ophalen van de gegevens.'
      console.error(err)
    }
  }

  const getWeather = async (latitude: number, longitude: number, searchId: number) => {
    try {
      const response = await axios.get(weatherApiUrl, {
        params: {
          lat: latitude,
          lon: longitude,
          units: 'metric', // Voeg metrische eenheden toe voor Celsius
          appid: apiKey,
        },
      })

      const { main, weather } = response.data

      // Zoek de juiste zoekopdracht en werk deze bij
      const search = searches.find(s => s.id === searchId)
      if (search) {
        search.weather.temp = main.temp
        search.weather.description = weather[0].description
      }
    } catch (err) {
      error.value = 'Er is een fout opgetreden bij het ophalen van het weer.'
      console.error(err)
    }
  }

  // Update cityName bij selecteren uit de dropdown
  const updateCityName = () => {
    if (!selectedPlace.value) return

    const place = places.find(p => p.id === selectedPlace.value)
    if (place) {
      cityName.value = place.name
      getCoordinates()
    }
  }

</script>

<style lang="scss" scoped>
.text-h2 {
  margin-bottom: 16px
}
</style>
