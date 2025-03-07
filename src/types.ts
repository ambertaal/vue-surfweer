export interface ForecastEntry {
  dateTime: string
  temp: number
  rain: number
  wind: number
  description: string
  surfAdvice: string
}

export interface Place {
  id: number;
  name: string;
}

export interface PlaceWithCoordinates extends Place {
  latitude: number
  longitude: number
}
