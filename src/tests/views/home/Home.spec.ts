import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Home from '../../../views/home/Home.vue'
import NavigationDrawer from '../../../components/NavigationDrawer.vue'
import AppBar from '../../../components/AppBar.vue'
import CitySelector from '../../../views/home/components/CitySelector.vue'
import ForecastTable from '../../../views/home/components/ForecastTable.vue'

describe('Home.vue', () => {
  it('rendert zonder fouten', () => {
    const wrapper = mount(Home)
    expect(wrapper.exists()).toBe(true)
  })

  it('shows h1', () => {
    const wrapper = mount(Home)
    expect(wrapper.find('h1').text()).toBe('Wanneer kan ik surfen?')
  })

  it('toont de NavigationDrawer, AppBar, CitySelector en ForecastTable in de DOM', () => {
    const wrapper = mount(Home)
    expect(wrapper.findComponent(NavigationDrawer).exists()).toBe(true)
    expect(wrapper.findComponent(AppBar).exists()).toBe(true)
    expect(wrapper.findComponent(CitySelector).exists()).toBe(true)
    expect(wrapper.findComponent(ForecastTable).exists()).toBe(true)
  })
})
