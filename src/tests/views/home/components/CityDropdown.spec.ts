import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import CityDropdown from '../../../../views/home/components/CityDropdown.vue'

describe('CityDropdown.vue', () => {
  it('rendert zonder fouten', () => {
    const wrapper = mount(CityDropdown)
    expect(wrapper.exists()).toBe(true)
  })
})
