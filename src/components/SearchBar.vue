<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="900"
    >
      <div class="text-center">
        <h1 class="text-h2 font-weight-bold">Wanneer kan ik surfen?</h1>
        <v-select
          v-model="selectedPlace"
          item-title="name"
          item-value="id"
          :items="places"
          label="Kies een plaats"
          @update:menu="getCoordinates"
        />
      </div>
      <div v-for="search in searches" :key="search.id">
        <h2 class="mt-4 mb-4">Weer in {{ search.name }}</h2>
        <p>Latitude: {{ search.latitude }}</p>
        <p>Longitude: {{ search.longitude }}</p>
        <p>Temperatuur: {{ search.weather.temp }}°C</p>
        <p>Weertype: {{ search.weather.description }}</p>
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
  <div>
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue'
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

  const places: Place[] = [
    { id: 1, name: 'Scheveningen', latitude: 52.1089, longitude: 4.2769 },
    { id: 2, name: 'Hoek van Holland', latitude: 51.9775, longitude: 4.1338 },
    { id: 3, name: 'Katwijk', latitude: 52.203, longitude: 4.3988 },
    { id: 4, name: 'Wijk aan Zee', latitude: 52.4936, longitude: 4.607 },
    { id: 5, name: 'Vlieland', latitude: 53.3037, longitude: 5.0667 },
  ]

  // Reactieve variabelen
  const selectedPlace = ref<number | null>(null)
  const searches = reactive<Search[]>([])

  // Methods
  const items = ref<any[]>([])

  // API details
  const apiKey = 'b41deb7dacc3ad8cec7aa9a0b07fa57f'
  const geoApiUrl = 'http://api.openweathermap.org/geo/1.0/direct'

  // State variables
  const error = ref<string | null>(null)
  const cityName = ref<string>('Amsterdam') // Voeg een standaardstad toe voor testdoeleinden

  // Fetch coordinates on component mount
  const getCoordinates = async () => {
    try {
      const response = await axios.get(`${geoApiUrl}`, {
        params: {
          q: cityName.value, // Gebruik cityName.value omdat het een ref is
          limit: 1,
          appid: apiKey,
        },
      })
      console.log(response.data) // Controleer de data in de respons
    } catch (err) {
      error.value = 'Er is een fout opgetreden bij het ophalen van de coördinaten.'
      console.error(err)
    }
  }

  // Use onMounted lifecycle hook
  onMounted(getCoordinates)
</script>

<style lang="scss" scoped>
.text-h2 {
  margin-bottom: 16px
}
</style>
