import { defineComponent, h } from 'vue'
import { VApp } from 'vuetify/components'
import NavigationDrawer from '../../components/NavigationDrawer.vue'

const NavigationWrapper = defineComponent({
  name: 'NavigationWrapper',
  props: {
    drawer: {
      type: Boolean,
      required: true,
    },
  },
  setup (props) {
    return () =>
      h(VApp, null, {
        default: () => h(NavigationDrawer, { drawer: props.drawer }),
      })
  },
})

export default NavigationWrapper
