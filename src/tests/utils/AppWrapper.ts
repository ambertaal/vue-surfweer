import { defineComponent, h } from 'vue'
import { VApp } from 'vuetify/components'
import AppBar from '../../components/AppBar.vue'

const AppWrapper = defineComponent({
  name: 'AppWrapper',
  props: {
    drawer: {
      type: Boolean,
      required: true,
    },
  },
  setup (props) {
    return () =>
      h(VApp, null, {
        default: () => h(AppBar, { drawer: props.drawer }),
      })
  },
})

export default AppWrapper
