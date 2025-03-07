import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import CityInput from '../../../../views/home/components/CityInput.vue'

describe('CityInput.vue', () => {
  it('rendert zonder fouten', () => {
    const wrapper = mount(CityInput)
    expect(wrapper.exists()).toBe(true)
  })
})
