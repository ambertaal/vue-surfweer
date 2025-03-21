import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SurfAdviceTooltip from '../../../../../views/home/components/SurfAdviceTooltip.vue'

describe('SurfAdviceTooltip.vue', () => {
  it('rendert zonder fouten', () => {
    const wrapper = mount(SurfAdviceTooltip)
    expect(wrapper.exists()).toBe(true)
  })
})
