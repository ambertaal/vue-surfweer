import { mount, VueWrapper } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import NavigationDrawer from '../../../components/NavigationDrawer.vue'

const vuetify = createVuetify({ components, directives })

global.ResizeObserver = class {
  observe () {}
  unobserve () {}
  disconnect () {}
}

describe('NavigationDrawer.vue', () => {
  let wrapper: VueWrapper

  const mountNavigationDrawer = () => {
    return mount(NavigationDrawer, {
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
    wrapper = mountNavigationDrawer()
    expect(wrapper.findComponent({ name: 'NavigationDrawer' }).exists()).toBe(true)
  })

  // it('emit update:drawer wanneer localDrawer verandert', async () => {
  //   const wrapper = mount(NavigationDrawer, {
  //     global: {
  //       plugins: [vuetify],
  //     },
  //     props: {
  //       drawer: true,
  //     },
  //   })

  //   const drawerComponent = wrapper.findComponent({ name: 'NavigationDrawer' })

  //   drawerComponent.vm.localDrawer = false

  //   await wrapper.vm.$nextTick()

  //   expect(drawerComponent.emitted('update:drawer')).toBeTruthy()
  //   expect(drawerComponent.emitted('update:drawer')![0]).toEqual([false])
  // })
})
