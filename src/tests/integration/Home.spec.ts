import { fireEvent, render, screen, waitFor } from '@testing-library/vue'
import { describe, expect, it, vi } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import HomeWrapper from '../utils/HomeWrapper'

vi.mock('@/api/WeatherService', () => ({
  getCoordinates: vi.fn().mockResolvedValue({ lat: 52.1089, lon: 4.2769 }),
  get3HourlyForecast: vi.fn().mockResolvedValue([
    {
      dt: 1742569200,
      dateTime: '2025-03-21 12:00',
      temp: 19.4,
      wind: 6.65,
      rain: 0,
      description: 'broken clouds',
    },
    {
      dt: 1742580000,
      dateTime: '2025-03-21 15:00',
      temp: 17.5,
      wind: 6.88,
      rain: 0,
      description: 'broken clouds',
    },
  ]),
}))

global.ResizeObserver = class {
  observe () {}
  unobserve () {}
  disconnect () {}
}

export const vuetify = createVuetify({
  components,
  directives,
})

describe('Integratie: Locatie selecteren en weerdata tonen', () => {
  it('haalt weerdata op en toont deze wanneer een locatie is geselecteerd', async () => {
    render(HomeWrapper, {
      global: {
        plugins: [vuetify],
      },
    })

    // Vind het inputveld (tweede textbox = v-text-field)
    const textboxes = await screen.findAllByRole('textbox')
    const input = textboxes[1]

    // Simuleer input en enter
    await fireEvent.update(input, 'Scheveningen')
    await fireEvent.keyDown(input, { key: 'Enter' })

    // Controleer of forecast-data in de UI verschijnt
    await waitFor(() => {
      expect(screen.queryByText(/broken clouds/i)).not.toBeNull()
      expect(screen.queryByText('19.4')).not.toBeNull()
    })
  })
})
