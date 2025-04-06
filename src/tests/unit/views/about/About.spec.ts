import { nextTick } from 'vue'
import { mount, VueWrapper } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import About from '../../../../views/about/About.vue'
import NavigationDrawer from '../../../../components/NavigationDrawer.vue'
import AppBar from '../../../../components/AppBar.vue'

global.ResizeObserver = class {
  observe () {}
  unobserve () {}
  disconnect () {}
}

const vuetify = createVuetify({ components, directives })

describe('About.vue', () => {
  let wrapper: VueWrapper

  const mountAbout = () => {
    return mount(About, {
      global: {
        plugins: [vuetify],
        stubs: {
          VApp: true,
        },
      },
    })
  }

  beforeEach(() => {
    wrapper = mountAbout()
  })

  afterEach(() => {
    if (wrapper) wrapper.unmount()
  })

  it('rendert zonder fouten', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('bevat de NavigationDrawer component', () => {
    expect(wrapper.findComponent(NavigationDrawer).exists()).toBe(true)
  })

  it('bevat de AppBar component', () => {
    expect(wrapper.findComponent(AppBar).exists()).toBe(true)
  })

  it('bevat de juiste tekst', async () => {
    await nextTick()
    expect(wrapper.text()).toContain('Over Surfadvies')
    expect(wrapper.text()).toContain('Dit is een side project van Amber om wat dingen te oefenen en leren.')
  })
})
