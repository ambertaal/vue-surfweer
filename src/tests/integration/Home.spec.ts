import { mount, VueWrapper } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import Home from '../../views/home/Home.vue'

export const vuetify = createVuetify({
  components,
  directives,
})

describe('Home.vue', () => {
  let wrapper: VueWrapper

  const mountHome = () => {
    return mount(Home, {
      global: {
        plugins: [vuetify],
        stubs: {
          VApp: true,
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
})
