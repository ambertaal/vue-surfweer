import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ForecastTable from '../../../../../views/home/components/ForecastTable.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import { ForecastEntry } from '@/types'

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

const vuetify = createVuetify({ components, directives })

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
  })

  it('toont de juiste koptekst met de stadsnaam', () => {
    const wrapper = mount(ForecastTable, {
      global: { plugins: [vuetify] },
      props: { formattedCityName: 'Scheveningen', forecast: forecastMock },
    })

    expect(wrapper.text()).toContain('Weer komende 5 dagen, per 3 uur in Scheveningen')
  })

  it('rendert geen tabel als er geen forecast data is', () => {
    const wrapper = mount(ForecastTable, {
      global: { plugins: [vuetify] },
      props: { formattedCityName: 'Scheveningen', forecast: [] },
    })

    expect(wrapper.find('table').exists()).toBe(false)
    expect(wrapper.text()).not.toContain('Datum & Tijd')
  })

  it('toont de juiste aantal rijen op basis van de forecast data', () => {
    const wrapper = mount(ForecastTable, {
      global: { plugins: [vuetify] },
      props: { formattedCityName: 'Scheveningen', forecast: forecastMock },
    })

    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(forecastMock.length)
  })

  // it('toont correcte weerdata in de tabel', () => {
  //   const wrapper = mount(ForecastTable, {
  //     global: { plugins: [vuetify] },
  //     props: { formattedCityName: 'Scheveningen', forecast: forecastMock },
  //   })

  //   forecastMock.forEach(entry => {
  //     expect(wrapper.text()).toContain(entry.dateTime)
  //     expect(wrapper.text()).toContain(`${entry.temp}°C`)
  //     expect(wrapper.text()).toContain(`${entry.rain} mm`)
  //     expect(wrapper.text()).toContain(`${entry.wind} m/s`)
  //     expect(wrapper.text()).toContain(entry.description)
  //     expect(wrapper.text()).toContain(entry.surfAdvice)
  //   })
  // })

  // it('bevat een SurfAdviceTooltip in de tabelkop', () => {
  //   const wrapper = mount(ForecastTable, {
  //     global: { plugins: [vuetify] },
  //     props: { formattedCityName: 'Scheveningen', forecast: forecastMock },
  //   })

  //   expect(wrapper.findComponent({ name: 'SurfAdviceTooltip' }).exists()).toBe(true)
  // })
})
