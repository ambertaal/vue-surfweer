import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Home from '../../../views/home/Home.vue'

describe('Home.vue', () => {
  it('rendert zonder fouten', () => {
    const wrapper = mount(Home)
    expect(wrapper.exists()).toBe(true)
  })
})
