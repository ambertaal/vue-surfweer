<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="900"
    >
      <div class="text-center">
        <h1 class="text-h2 font-weight-bold">Wanneer kan ik surfen?</h1>
        <CitySelector
          v-model="selectedCity"
          :places="places"
          @city-changed="handleCityChange"
          @update:model-value="updateCity"
        />
      </div>
      <v-divider class="mt-4 mb-4" />
      <!-- Tabel voor 3-uurlijkse voorspelling -->
      <div v-if="forecast.length > 0">
        <h2 class="mt-4 mb-4">Weer komende 5 dagen, per 3 uur in {{ formattedCityName }}</h2>
        <v-table>
          <thead>
            <tr>
              <th>Datum & Tijd</th>
              <th>Temp (°C)</th>
              <th>Neerslag (mm)</th>
              <th>Wind (m/s)</th>
              <th>Weer</th>
              <th>Surfadvies
                <v-tooltip location="top">
                  <template #activator="{ props }">
                    <v-icon
                      class="ml-2"
                      color="info"
                      style="cursor: pointer"
                      v-bind="props"
                    >
                      mdi-information-outline
                    </v-icon>
                  </template>
                  <span>
                    <strong>Criteria voor surfadvies</strong>
                    <p><strong>Windsnelheid:</strong></p>
                    <p>Geschikt: 3-10 m/s.</p>
                    <p>Beginners: 3-7 m/s.</p>
                    <p>Gevorderden: 7-10 m/s.</p>
                    <strong>Regen:</strong>
                    <p>Regen &lt; 2mm/3 uur is aanvaardbaar.</p>
                    <strong>Temperatuur:</strong>
                    <p>Minimaal 12°C.</p>
                  </span>
                </v-tooltip>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="entry in forecast" :key="entry.dateTime">
              <td>{{ entry.dateTime }}</td>
              <td>{{ entry.temp }}°C</td>
              <td>{{ entry.rain }} mm</td>
              <td>{{ entry.wind }} m/s</td>
              <td>{{ entry.description }}</td>
              <td>{{ entry.surfAdvice }}</td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
  import { computed, onMounted, reactive, ref } from 'vue'
  import axios from 'axios'
  import CitySelector from './CitySelector.vue'

  onMounted(() => {
    const place = places.find(p => p.id === Number(selectedCity.value))
    if (place) {
      cityName.value = place.name
      getCoordinates()
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
  const cityName = ref<string>('Scheveningen')
  const selectedCity = ref<number | null>(null)
  const forecast = reactive<ForecastEntry[]>([])
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

  // Computed property voor cityName met hoofdletter
  const formattedCityName = computed(() => {
    const place = places.find(p => p.id === selectedCity.value)
    return place ? place.name : cityName.value || ''
  })

  // API details
  const apiKey = 'b41deb7dacc3ad8cec7aa9a0b07fa57f'
  const geoApiUrl = 'http://api.openweathermap.org/geo/1.0/direct'
  const forecastApiUrl = 'https://api.openweathermap.org/data/2.5/forecast'

  // Fetch coordinates
  const getCoordinates = async () => {
    const place = places.find(p => p.id === selectedCity.value)
    if (place) {
      // Coördinaten van een bekende plaats
      await get3HourlyForecast(place.latitude, place.longitude)
    }
  }

  // Haal 3-uurlijkse voorspellingen op
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
        ...forecastData.map((entry: any) => {
          const temp = entry.main.temp
          const wind = entry.wind.speed
          const rain = entry.rain ? entry.rain['3h'] || 0 : 0

          return {
            dateTime: new Date(entry.dt * 1000).toLocaleString(), // Datum en tijd
            temp, // Temperatuur
            rain, // Neerslag in mm
            wind, // Windsnelheid in m/s
            description: entry.weather[0].description, // Weersbeschrijving
            surfAdvice: determineSurfAdvice(temp, wind, rain), // Surfadvies per entry
          }
        })
      )
    } catch (error) {
      console.error('Error fetching 3-hourly forecast:', error)
    }
  }

  const handleCityChange = async (newCityName: string) => {
    cityName.value = newCityName.trim()

    if (!cityName.value) return

    const matchedPlace = places.find(
      p => p.name.toLowerCase() === cityName.value.toLowerCase()
    )

    if (matchedPlace) {
      // Bekende stad
      selectedCity.value = matchedPlace.id
      await getCoordinates() // Haalt coördinaten van bekende plaatsen op
    } else {
      // Onbekende stad, gebruik Geo API
      selectedCity.value = null
      try {
        const response = await axios.get(geoApiUrl, {
          params: {
            q: cityName.value,
            limit: 1,
            appid: apiKey,
          },
        })

        if (response.data.length > 0) {
          const result = response.data[0]
          await get3HourlyForecast(result.lat, result.lon)
        } else {
          error.value = `Geen resultaten gevonden voor "${cityName.value}".`
        }
      } catch (err) {
        error.value = 'Er is een fout opgetreden bij het ophalen van de gegevens.'
        console.error(err)
      }
    }
  }

  // Update cityName bij selecteren uit de dropdown
  const updateCity = (newCityId: number) => {
    selectedCity.value = newCityId
    const place = places.find(p => p.id === newCityId)
    if (place) cityName.value = place.name
    getCoordinates()
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
</script>

<style lang="scss">
.text-h2 {
  margin-bottom: 16px
}

.text-body-1 {
  white-space: pre-wrap; /* Zorgt dat \n wordt gerespecteerd */
}

.seperator-text {
  margin: 0 16px; /* Ruimte tussen de velden */
  font-size: 1rem;
  align-self: center;
}

.v-tooltip > .v-overlay__content {
  background-color: green !important;
  color: white !important;
  font-size: 14px !important;
  padding: 10px !important;
  border-radius: 8px;
}

</style>
