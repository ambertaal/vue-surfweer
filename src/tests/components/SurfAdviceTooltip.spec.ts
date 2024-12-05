import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SurfAdviceTooltip from '@/components/SurfAdviceTooltip.vue'

describe('SurfAdviceTooltip.vue', () => {
  it('rendert zonder fouten', () => {
    const wrapper = mount(SurfAdviceTooltip)
    expect(wrapper.exists()).toBe(true)
  })

  it('toont het icoon met de juiste klasse', () => {
    const wrapper = mount(SurfAdviceTooltip)
    const icon = wrapper.findComponent({ name: 'VIcon' })
    expect(icon.exists()).toBe(true)
    expect(icon.attributes('class')).toContain('mdi-information-outline')
  })

  it('toont de tooltip tekst bij hover', async () => {
    const wrapper = mount(SurfAdviceTooltip)
    const tooltip = wrapper.find('.custom-tooltip > .v-overlay__content')
    expect(tooltip.text()).toContain('Criteria voor surfadvies')
  })
})
