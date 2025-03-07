import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import CitySelector from '../../../../views/home/components/CitySelector.vue'

describe('CitySelector.vue', () => {
  it('rendert zonder fouten', () => {
    const wrapper = mount(CitySelector)
    expect(wrapper.exists()).toBe(true)
  })
})
