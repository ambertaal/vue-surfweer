import axios from 'axios'

const apiKey = import.meta.env.VITE_API_KEY
const forecastApiUrl = import.meta.env.VITE_FORECAST_API_URL
const geoApiUrl = import.meta.env.VITE_GEO_API_URL

// Omzetting van wind m/s naar windkracht op de Windschaal van Beaufort
const mpsToBeaufort = (mps: number) => {
  if (mps < 0.5) return 0
  if (mps < 1.6) return 1
  if (mps < 3.4) return 2
  if (mps < 5.5) return 3
  if (mps < 8.0) return 4
  if (mps < 10.8) return 5
  if (mps < 13.9) return 6
  if (mps < 17.2) return 7
  if (mps < 20.8) return 8
  if (mps < 24.5) return 9
  if (mps < 28.5) return 10
  if (mps < 32.7) return 11
  return 12
}

// Haal coördinaten van een stad op
export const getCoordinates = async (cityName: string): Promise<{ lat: number, lon: number } | null> => {
  try {
    const response = await axios.get(geoApiUrl, {
      params: {
        q: cityName,
        limit: 1,
        appid: apiKey,
      },
    })

    if (response.data.length > 0) {
      const result = response.data[0]
      return { lat: result.lat, lon: result.lon }
    }

    return null
  } catch (error) {
    console.error('Error fetching coordinates:', error)
    return null
  }
}

// Haal 3-uurlijkse voorspellingen op
export const get3HourlyForecast = async (latitude: number, longitude: number): Promise<any[]> => {
  try {
    const response = await axios.get(forecastApiUrl, {
      params: {
        lat: latitude,
        lon: longitude,
        units: 'metric', // Gebruik metrische eenheden (Celsius)
        appid: apiKey,
      },
    })

    return response.data.list.map((entry: any) => ({
      dateTime: new Date(entry.dt * 1000).toLocaleString(),
      temp: entry.main.temp,
      rain: entry.rain ? entry.rain['3h'] || 0 : 0,
      wind: mpsToBeaufort(entry.wind.speed),
      description: entry.weather[0].description,
    }))
  } catch (error) {
    console.error('Error fetching 3-hourly forecast:', error)
    return []
  }
}
