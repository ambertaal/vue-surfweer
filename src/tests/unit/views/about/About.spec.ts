import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import About from '../../../../views/about/About.vue'
import NavigationDrawer from '../../../../components/NavigationDrawer.vue'
import AppBar from '../../../../components/AppBar.vue'

describe('About.vue', () => {
  it('rendert zonder fouten', () => {
    const wrapper = mount(About)
    expect(wrapper.exists()).toBe(true)
  })

  it('bevat de NavigationDrawer component', () => {
    const wrapper = mount(About, {
      global: {
        stubs: {
          NavigationDrawer: true,
        },
      },
    })
    expect(wrapper.findComponent(NavigationDrawer).exists()).toBe(true)
  })

  it('bevat de AppBar component', () => {
    const wrapper = mount(About, {
      global: {
        stubs: {
          AppBar: true,
        },
      },
    })
    expect(wrapper.findComponent(AppBar).exists()).toBe(true)
  })

  it('bevat de juiste tekst', () => {
    const wrapper = mount(About)
    expect(wrapper.text()).toContain('Over Surfadvies')
    expect(wrapper.text()).toContain('Dit is een side project van Amber om wat dingen te oefenen en leren.')
  })
})
