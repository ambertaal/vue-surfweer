<template>
  <v-app-bar
    color="primary"
  >
    <template #prepend>
      <v-app-bar-nav-icon @click="toggleDrawer" />
    </template>

    <v-app-bar-title>Surfadvies</v-app-bar-title>

    <v-spacer />
  </v-app-bar>
</template>

<script setup lang="ts">
  const props = defineProps<{ drawer: boolean }>()
  const emit = defineEmits(['update:drawer'])

  const toggleDrawer = () => {
    emit('update:drawer', !props.drawer)
  }
</script>
