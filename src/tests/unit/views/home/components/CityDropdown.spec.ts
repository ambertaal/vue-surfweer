import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import CityDropdown from '../../../../../views/home/components/CityDropdown.vue'

const vuetify = createVuetify({ components, directives })

describe('CityDropdown.vue', () => {
  const places = [
    { id: 1, name: 'Amsterdam' },
    { id: 2, name: 'Rotterdam' },
  ]

  it('rendert zonder fouten', () => {
    const wrapper = mount(CityDropdown, {
      global: {
        plugins: [vuetify],
      },
      props: {
        places,
        modelValue: null,
      },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('toont het correcte dropdown label', async () => {
    const wrapper = mount(CityDropdown, {
      global: {
        plugins: [vuetify],
      },
      props: {
        places,
        modelValue: null,
      },
    })

    const label = wrapper.find('label')
    expect(label.text()).toBe('Kies een stad')
  })

  it('toont de naam van de geselecteerde stad', async () => {
    const wrapper = mount(CityDropdown, {
      global: { plugins: [vuetify] },
      props: {
        places,
        modelValue: 2,
      },
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toContain('Rotterdam')
  })

  it('laat geen items zien als places leeg is', () => {
    const wrapper = mount(CityDropdown, {
      global: { plugins: [vuetify] },
      props: {
        places: [],
        modelValue: null,
      },
    })

    const select = wrapper.findComponent({ name: 'VSelect' })
    expect(select.props('items')).toEqual([])
  })

  it('emit een update:modelValue bij selectie van andere stad', async () => {
    const wrapper = mount(CityDropdown, {
      global: { plugins: [vuetify] },
      props: {
        places,
        modelValue: 1,
      },
    })

    const select = wrapper.findComponent({ name: 'VSelect' })
    await select.vm.$emit('update:modelValue', 2)

    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([2])
  })
})
