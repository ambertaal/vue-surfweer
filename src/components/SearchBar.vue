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
      <v-divider class="mt-4 mb-4" />
      <!-- Tabel voor 3-uurlijkse voorspelling -->
      <div v-if="forecast.length > 0">
        <p class="text-body-1">
          {{ surfAdvice }}
          <v-tooltip location="top">
            <template #activator="{ props }">
              <v-icon
                class="ml-2"
                color="info"
                style="cursor: pointer;"
                v-bind="props"
              >
                mdi-information-outline
              </v-icon>
            </template>
            <span>
              <strong>Criteria voor surfadvies</strong>
              <p>Windsnelheid:</p>
              <ul>
                <li>Geschikt: 3-10 m/s.</li>
                <li>Beginners: 3-7 m/s.</li>
                <li>Gevorderden: 7-10 m/s.</li>
              </ul>
              <p>Golfhoogte:</p>
              <ul>
                <li>Geschikt: 0.5m - 2m.</li>
                <li>Beginners: 0.5m - 1m.</li>
                <li>Gevorderden: 1m - 2m.</li>
              </ul>
              <p>Regen:</p>
              <p>Regen &lt; 2mm/3 uur is aanvaardbaar.</p>
              <p>Temperatuur:</p>
              <p>Minimaal 12°C.</p>
            </span>
          </v-tooltip>
        </p>
        <v-divider class="mt-4 mb-4" />
        <h2 class="mt-4 mb-4">Weer komende 5 dagen, per 3 uur in {{ formattedCityName }}</h2>
        <v-table>
          <thead>
            <tr>
              <th>Datum & Tijd</th>
              <th>Temp (°C)</th>
              <th>Neerslag (mm)</th>
              <th>Wind (m/s)</th>
              <th>Weer</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="entry in forecast" :key="entry.dateTime">
              <td>{{ entry.dateTime }}</td>
              <td>{{ entry.temp }}°C</td>
              <td>{{ entry.rain }} mm</td>
              <td>{{ entry.wind }} m/s</td>
              <td>{{ entry.description }}</td>
            </tr>
          </tbody>
        </v-table>
      </div>
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

  interface ForecastEntry {
    dateTime: string
    temp: number
    rain: number
    wind: number
    description: string
  }

  // Reactieve variabelen
  const cityName = ref<string>('')
  const selectedPlace = ref<number | null>(null)
  const forecast = reactive<ForecastEntry[]>([])
  const error = ref<string | null>(null)

  // Computed property voor cityName met hoofdletter
  const formattedCityName = computed(() => {
    if (!cityName.value) return ''
    return cityName.value.charAt(0).toUpperCase() + cityName.value.slice(1)
  })

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
  const forecastApiUrl = 'https://api.openweathermap.org/data/2.5/forecast'

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
      // Haal weer op na het toevoegen van de locatie
      if (result) {
        await get3HourlyForecast(result.lat, result.lon)
      }
    } catch (err) {
      error.value = 'Er is een fout opgetreden bij het ophalen van de gegevens.'
      console.error(err)
    }
  }

  const get3HourlyForecast = async (latitude: number, longitude: number) => {
    try {
      const response = await axios.get(forecastApiUrl, {
        params: {
          lat: latitude,
          lon: longitude,
          units: 'metric', // Gebruik metrische eenheden (Celsius)
          appid: apiKey, // API-sleutel
        },
      })

      const forecastData = response.data.list // 3-uurlijkse gegevens
      forecast.splice(
        0,
        forecast.length,
        ...forecastData.map((entry: any) => ({
          dateTime: new Date(entry.dt * 1000).toLocaleString(), // Datum en tijd
          temp: entry.main.temp, // Temperatuur
          rain: entry.rain ? entry.rain['3h'] || 0 : 0, // Neerslag in mm
          wind: entry.wind.speed, // Windsnelheid in m/s
          description: entry.weather[0].description, // Weersbeschrijving
        }))
      )
    } catch (error) {
      console.error('Error fetching 3-hourly forecast:', error)
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

  // Computed property voor surfadvies
  const surfAdvice = computed(() => {
    if (forecast.length === 0) return 'Geen gegevens beschikbaar voor surfadvies.'

    let beginnerFriendly = false
    let advancedFriendly = false

    for (const entry of forecast) {
      const { temp, wind, rain } = entry

      // Controleer of het geschikt is voor beginners
      if (temp >= 12 && wind >= 3 && wind <= 7 && (!rain || rain < 2)) {
        beginnerFriendly = true
      }

      // Controleer of het geschikt is voor gevorderden
      if (temp >= 12 && wind > 7 && wind <= 10 && (!rain || rain < 2)) {
        advancedFriendly = true
      }
    }

    if (beginnerFriendly && advancedFriendly) {
      return 'Het weer is geschikt om te surfen voor zowel beginners als gevorderden!'
    } else if (beginnerFriendly) {
      return 'Het weer is geschikt om te surfen voor beginners.'
    } else if (advancedFriendly) {
      return 'Het weer is geschikt om te surfen voor gevorderden.'
    } else {
      return 'Het weer is momenteel niet geschikt om te surfen.'
    }
  })
</script>

<style lang="scss">
.text-h2 {
  margin-bottom: 16px
}

.v-tooltip > .v-overlay__content {
  background-color: green !important;
  color: white !important;
  font-size: 14px !important;
  padding: 10px !important;
  border-radius: 8px;
}

</style>
