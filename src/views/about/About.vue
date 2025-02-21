<template>
  <v-navigation-drawer
    v-model="drawer"
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

  const drawer = ref(true)

</script>
