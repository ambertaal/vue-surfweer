import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import NavigationWrapper from '../../utils/NavigationWrapper'

const vuetify = createVuetify({ components, directives })

global.ResizeObserver = class {
  observe () {}
  unobserve () {}
  disconnect () {}
}

describe('NavigationDrawer.vue', () => {
  it('rendert zonder fouten', () => {
    const wrapper = mount(NavigationWrapper, {
      global: {
        plugins: [vuetify],
      },
      props: {
        drawer: false,
      },
    })
    expect(wrapper.findComponent({ name: 'NavigationDrawer' }).exists()).toBe(true)
  })

  it('emit update:drawer wanneer localDrawer verandert', async () => {
    const wrapper = mount(NavigationWrapper, {
      global: {
        plugins: [vuetify],
      },
      props: {
        drawer: true,
      },
    })

    const drawerComponent = wrapper.findComponent({ name: 'NavigationDrawer' })

    drawerComponent.vm.localDrawer = false

    await wrapper.vm.$nextTick()

    expect(drawerComponent.emitted('update:drawer')).toBeTruthy()
    expect(drawerComponent.emitted('update:drawer')![0]).toEqual([false])
  })
})
