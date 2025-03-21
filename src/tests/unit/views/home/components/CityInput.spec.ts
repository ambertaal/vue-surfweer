import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import CityInput from '../../../../../views/home/components/CityInput.vue'

const vuetify = createVuetify({ components, directives })

describe('CityInput.vue', () => {
  it('rendert zonder fouten', () => {
    const wrapper = mount(CityInput, {
      global: { plugins: [vuetify] },
      props: { modelValue: '' },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('toont de juiste initiële waarde', () => {
    const wrapper = mount(CityInput, {
      global: { plugins: [vuetify] },
      props: { modelValue: 'Amsterdam' },
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('Amsterdam')
  })

  it('emit update:modelValue bij input', async () => {
    const wrapper = mount(CityInput, {
      global: { plugins: [vuetify] },
      props: { modelValue: '' },
    })

    const input = wrapper.find('input')
    await input.setValue('Rotterdam')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['Rotterdam'])
  })

  it('emit cityChanged bij enter', async () => {
    const wrapper = mount(CityInput, {
      global: { plugins: [vuetify] },
      props: { modelValue: 'Den Haag ' }, // met spatie
    })

    const input = wrapper.find('input')
    await input.trigger('keyup.enter')

    expect(wrapper.emitted('cityChanged')).toBeTruthy()
    expect(wrapper.emitted('cityChanged')![0]).toEqual(['Den Haag']) // getrimd
  })

  it('update input als modelValue verandert', async () => {
    const wrapper = mount(CityInput, {
      global: { plugins: [vuetify] },
      props: { modelValue: 'Utrecht' },
    })

    await wrapper.setProps({ modelValue: 'Leiden' })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('Leiden')
  })
})
