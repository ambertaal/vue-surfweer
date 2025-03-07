<template>
  <!-- Tabel voor 3-uurlijkse voorspelling -->
  <div v-if="forecast.length > 0">
    <h2 class="mt-4 mb-4">Weer komende 5 dagen, per 3 uur in {{ formattedCityName }}</h2>

    <div class="table-container">
      <v-table class="forecast-table">
        <thead>
          <tr>
            <th>Datum & Tijd</th>
            <th>Temp (°C)</th>
            <th>Neerslag (mm)</th>
            <th>Wind (m/s)</th>
            <th>Weer</th>
            <th>Surfadvies
              <SurfAdviceTooltip />
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
  </div>
</template>

<script setup lang="ts">
  import { ForecastEntry } from '@/types'
  import SurfAdviceTooltip from './SurfAdviceTooltip.vue'

  defineProps({
    formattedCityName: String,
    forecast: {
      type: Array as () => ForecastEntry[],
      required: true,
    },
  })

</script>

<style scoped>
/* Zorgt ervoor dat de tabel op mobiel horizontaal scrolbaar is */
.table-container {
  overflow-x: scroll; /* Forceert de scrollbar */
  max-width: 100%;
  white-space: nowrap; /* Voorkomt dat tekst afbreekt */
}

/* Beperkt de breedte van de tabel op mobiel */
@media (max-width: 600px) {
  .forecast-table {
    min-width: 800px; /* Zorgt ervoor dat maar 3,5 kolommen zichtbaar zijn */
  }

  /* Optioneel: maak de eerste kolommen smaller zodat 3,5 kolommen beter passen */
  .forecast-table th,
  .forecast-table td {
    white-space: nowrap; /* Voorkomt dat tekst afbreekt */
    padding: 8px 12px;
  }

  /* Maak de eerste drie kolommen breder zodat ze goed leesbaar zijn */
  .forecast-table th:nth-child(1),
  .forecast-table td:nth-child(1) { width: 180px; } /* Datum & Tijd */
  .forecast-table th:nth-child(2),
  .forecast-table td:nth-child(2) { width: 120px; } /* Temp */
  .forecast-table th:nth-child(3),
  .forecast-table td:nth-child(3) { width: 120px; } /* Neerslag */
  .forecast-table th:nth-child(4),
  .forecast-table td:nth-child(4) { width: 120px; } /* Wind */

  /* Zorg dat de rest van de kolommen flexibeler zijn */
  .forecast-table th:nth-child(5),
  .forecast-table td:nth-child(5) { width: 160px; } /* Weer */
  .forecast-table th:nth-child(6),
  .forecast-table td:nth-child(6) { width: 200px; } /* Surfadvies */
}
</style>
