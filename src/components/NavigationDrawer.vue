<template>
  <v-app>
    <v-navigation-drawer
      v-model="localDrawer"
    >
      <v-list>
        <v-list-item
          subtitle="Best surfadvies ever!"
          title="Surfadvies"
        />
      </v-list>

      <v-divider />

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-bell-outline" title="Surfadvies" to="/" />
        <v-list-item prepend-icon="mdi-information-outline" title="Over" to="/about" />
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  const props = defineProps<{
    drawer: boolean
  }>()

  const emit = defineEmits(['update:drawer'])

  const localDrawer = computed({
    get: () => props.drawer,
    set: value => emit('update:drawer', value),
  })
</script>
