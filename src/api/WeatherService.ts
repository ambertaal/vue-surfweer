import axios from 'axios'

const apiKey = import.meta.env.VITE_API_KEY
const forecastApiUrl = import.meta.env.VITE_FORECAST_API_URL
const geoApiUrl = import.meta.env.VITE_GEO_API_URL

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
      wind: entry.wind.speed,
      description: entry.weather[0].description,
    }))
  } catch (error) {
    console.error('Error fetching 3-hourly forecast:', error)
    return []
  }
}
