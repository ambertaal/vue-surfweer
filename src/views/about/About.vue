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
      <v-list-item prepend-icon="mdi-information-outline" title="About" to="/about" />
    </v-list>
  </v-navigation-drawer>

  <v-app-bar
    color="primary"
    image="https://picsum.photos/1920/1080?random"
  >
    <template #image>
      <v-img
        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
      />
    </template>

    <template #prepend>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
    </template>

    <v-app-bar-title>Vuetify SurfAdvice App</v-app-bar-title>

    <v-spacer />
  </v-app-bar>

  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="900"
    >
      <div class="about pa-6">
        <h1>About Vuetify Surfadvice</h1>
        <p>This is a side project to practice and learn stuff.</p>
      </div>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const drawer = ref(true)

</script>
