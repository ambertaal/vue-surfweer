import { mount, VueWrapper } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import AppBar from '../../../components/AppBar.vue'

const vuetify = createVuetify({ components, directives })

global.ResizeObserver = class {
  observe () {}
  unobserve () {}
  disconnect () {}
}

describe('AppBar.vue', () => {
  let wrapper: VueWrapper

  const mountAppBar = () => {
    return mount(AppBar, {
      global: {
        plugins: [vuetify],
      },
      props: {
        drawer: false,
      },
    })
  }

  afterEach(() => {
    if (wrapper) wrapper.unmount()
  })

  it('rendert zonder fouten', () => {
    wrapper = mountAppBar()
    expect(wrapper.findComponent({ name: 'AppBar' }).exists()).toBe(true)
  })

  // it('emit update:drawer wanneer op nav-icon wordt geklikt', async () => {
  //   const wrapper = mount(AppBar, {
  //     global: {
  //       plugins: [vuetify],
  //     },
  //     props: {
  //       drawer: false,
  //     },
  //   })

  //   const navIcon = wrapper.find('button')
  //   await navIcon.trigger('click')

  //   const emitted = wrapper.findComponent({ name: 'AppBar' }).emitted('update:drawer')
  //   expect(emitted).toBeTruthy()
  //   expect(emitted![0]).toEqual([true])
  // })
})
