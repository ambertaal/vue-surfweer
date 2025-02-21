<template>
  <navigation v-model:drawer="drawer" />

  <v-app-bar
    color="primary"
  >
    <template #prepend>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
    </template>

    <v-app-bar-title>Surfadvies</v-app-bar-title>

    <v-spacer />
  </v-app-bar>

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
  import navigation from '@/components/navigation.vue'

  const drawer = ref(true)

</script>
