import { mount, VueWrapper } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import Home from '../../../../views/home/Home.vue'
import NavigationDrawer from '../../../../components/NavigationDrawer.vue'
import AppBar from '../../../../components/AppBar.vue'
import CitySelector from '../../../../views/home/components/CitySelector.vue'
import ForecastTable from '../../../../views/home/components/ForecastTable.vue'

const vuetify = createVuetify({ components, directives })

describe('Home.vue', () => {
  let wrapper: VueWrapper

  const mountHome = () => {
    return mount(Home, {
      global: {
        plugins: [vuetify],
        stubs: {
          VApp: true,
          VContainer: true,
          VResponsive: true,
          VDivider: true,
        },
      },
    })
  }

  afterEach(() => {
    if (wrapper) wrapper.unmount()
  })

  it('rendert zonder fouten', () => {
    wrapper = mountHome()
    expect(wrapper.exists()).toBe(true)
  })

  // it('shows h1', () => {
  //   wrapper = mountHome()
  //   expect(wrapper.find('h1').text()).toBe('Wanneer kan ik surfen?')
  // })

  // it('toont de NavigationDrawer, AppBar, CitySelector en ForecastTable in de DOM', () => {
  //   wrapper = mountHome()

  //   expect(wrapper.findComponent(NavigationDrawer).exists()).toBe(true)
  //   expect(wrapper.findComponent(AppBar).exists()).toBe(true)
  //   expect(wrapper.findComponent(CitySelector).exists()).toBe(true)
  //   expect(wrapper.findComponent(ForecastTable).exists()).toBe(true)
  // })
})
