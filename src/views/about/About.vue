<template>
  <NavigationDrawer v-model:drawer="drawer" />
  <AppBar v-model:drawer="drawer" />

  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="900"
    >
      <div class="about pa-6">
        <h1>Over Surfadvies</h1>
        <p>Dit is een side project van Amber om wat dingen te oefenen en leren.</p>
      </div>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import NavigationDrawer from '../../components/NavigationDrawer.vue'
  import AppBar from '../../components/AppBar.vue'

  const drawer = ref(true)

</script>
