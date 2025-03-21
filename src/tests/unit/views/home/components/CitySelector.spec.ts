import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import CitySelector from '../../../../../views/home/components/CitySelector.vue'

describe('CitySelector.vue', () => {
  it('rendert zonder fouten', () => {
    const wrapper = mount(CitySelector)
    expect(wrapper.exists()).toBe(true)
  })

  it('leegt cityName en emit update:modelValue bij null', async () => {
    const wrapper = mount(CitySelector, {
      props: {
        places: [{ id: 1, name: 'Scheveningen' }],
        modelValue: 1,
      },
    })

    wrapper.vm.selectedCity = null
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.cityName).toBe('')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')!.pop()).toEqual([null])
  })

  it('zet cityName bij geldige selectedCity en emit update:modelValue', async () => {
    const wrapper = mount(CitySelector, {
      props: {
        places: [{ id: 1, name: 'Scheveningen' }],
        modelValue: null,
      },
    })

    wrapper.vm.selectedCity = 1
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.cityName).toBe('Scheveningen')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')!.pop()).toEqual([1])
  })

  it('emit cityChanged met getrimde cityName bij onEnter', async () => {
    const wrapper = mount(CitySelector, {
      props: {
        places: [],
        modelValue: null,
      },
    })

    wrapper.vm.cityName = 'Zandvoort'
    wrapper.vm.onEnter()

    expect(wrapper.emitted('cityChanged')).toBeTruthy()
    expect(wrapper.emitted('cityChanged')![0]).toEqual(['Zandvoort'])
  })

  it('verandert selectedCity via CityDropdown', async () => {
    const wrapper = mount(CitySelector, {
      props: {
        places: [{ id: 1, name: 'Scheveningen' }],
        modelValue: null,
      },
      global: {
        stubs: ['CityDropdown', 'CityInput'], // als je geen echte componenten gebruikt
      },
    })

    // Simuleer dat CityDropdown iets terugstuurt via v-model
    await wrapper.findComponent({ name: 'CityDropdown' }).vm.$emit('update:modelValue', 1)

    // check of selectedCity is aangepast en emit is gebeurd
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([1])
  })

  it('roept onEnter aan bij city-changed event vanuit CityInput', async () => {
    const wrapper = mount(CitySelector, {
      props: {
        places: [],
        modelValue: null,
      },
      global: {
        stubs: ['CityDropdown', 'CityInput'], // als je niet de echte componenten gebruikt
      },
    })

    // Set vooraf een cityName (zoals een gebruiker die iets invult)
    wrapper.vm.cityName = 'Domburg'

    // Emit event vanuit CityInput-component
    await wrapper.findComponent({ name: 'CityInput' }).vm.$emit('cityChanged')

    expect(wrapper.emitted('cityChanged')).toBeTruthy()
    expect(wrapper.emitted('cityChanged')![0]).toEqual(['Domburg'])
  })

  it('selectedCity is gelijk aan modelValue bij mount (maar cityName nog niet gezet)', () => {
    const wrapper = mount(CitySelector, {
      props: {
        places: [{ id: 1, name: 'Domburg' }],
        modelValue: 1,
      },
    })

    expect(wrapper.vm.selectedCity).toBe(1)
    expect(wrapper.vm.cityName).toBe('')
  })
})
