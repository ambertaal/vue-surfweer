import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import AppWrapper from '../utils/AppWrapper'

const vuetify = createVuetify({ components, directives })

global.ResizeObserver = class {
  observe () {}
  unobserve () {}
  disconnect () {}
}

describe('AppBar.vue', () => {
  it('rendert zonder fouten', () => {
    const wrapper = mount(AppWrapper, {
      global: {
        plugins: [vuetify],
      },
      props: {
        drawer: false,
      },
    })
    expect(wrapper.findComponent({ name: 'AppBar' }).exists()).toBe(true)
  })

  it('emit update:drawer wanneer op nav-icon wordt geklikt', async () => {
    const wrapper = mount(AppWrapper, {
      global: {
        plugins: [vuetify],
      },
      props: {
        drawer: false,
      },
    })

    const navIcon = wrapper.find('button')
    await navIcon.trigger('click')

    const emitted = wrapper.findComponent({ name: 'AppBar' }).emitted('update:drawer')
    expect(emitted).toBeTruthy()
    expect(emitted![0]).toEqual([true])
  })
})
