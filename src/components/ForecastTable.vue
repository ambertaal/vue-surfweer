<template>
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
</template>

<script setup lang="ts">
  import { defineProps } from 'vue'

  interface ForecastEntry {
    dateTime: string
    temp: number
    rain: number
    wind: number
    description: string
    surfAdvice: string
  }

  const props = defineProps({
    formattedCityName: String,
    forecast: {
      type: Array as () => ForecastEntry[],
      required: true,
    },
  })

</script>
