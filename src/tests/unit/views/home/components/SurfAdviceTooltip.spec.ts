import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import SurfAdviceTooltip from '../../../../../views/home/components/SurfAdviceTooltip.vue'

const vuetify = createVuetify({ components, directives })

describe('SurfAdviceTooltip.vue', () => {
  const mountSurfAdviceTooltip = () => {
    return mount(SurfAdviceTooltip, {
      global: {
        plugins: [vuetify],
      },
    })
  }
  it('rendert zonder fouten', () => {
    const wrapper = mountSurfAdviceTooltip()
    expect(wrapper.exists()).toBe(true)
  })
})
