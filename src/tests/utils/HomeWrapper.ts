import { defineComponent, h } from 'vue'
import { VApp } from 'vuetify/components'
import Home from '../../views/home/Home.vue'

const HomeWrapper = defineComponent({
  name: 'HomeWrapper',
  setup () {
    return () =>
      h(VApp, null, {
        default: () => h(Home),
      })
  },
})

export default HomeWrapper
