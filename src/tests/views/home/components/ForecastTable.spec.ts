import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ForecastTable from '../../../../views/home/components/ForecastTable.vue'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import { ForecastEntry } from '@/types'

// Mock data voor de forecast prop
const forecastMock: ForecastEntry[] = [
  {
    dateTime: '2025-03-07 12:00',
    temp: 15,
    rain: 0.5,
    wind: 5,
    description: 'Licht bewolkt',
    surfAdvice: 'Goede condities',
  },
  {
    dateTime: '2025-03-07 15:00',
    temp: 16,
    rain: 0,
    wind: 6,
    description: 'Zonnig',
    surfAdvice: 'Uitstekend',
  },
]

const vuetify = createVuetify()

describe('ForecastTable.vue', () => {
  it('rendert zonder fouten met props', () => {
    const wrapper = mount(ForecastTable, {
      global: {
        plugins: [vuetify],
      },
      props: {
        formattedCityName: 'Scheveningen',
        forecast: forecastMock,
      },
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('Weer komende 5 dagen, per 3 uur in Scheveningen')
    expect(wrapper.text()).toContain('Licht bewolkt')
    expect(wrapper.text()).toContain('Goede condities')
  })
})
