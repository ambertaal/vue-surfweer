<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="900"
    >
      <div class="text-center">
        <h1 class="text-h2 font-weight-bold">Wanneer kan ik surfen?</h1>
        <v-text-field
          v-model="newSearchPlace"
          append-inner-icon="mdi-magnify"
          clearable
          label="Zoek op plaats"
          @click:append-inner="addSearch"
          @keydown.enter="addSearch"
        />
      </div>

      <h2 class="mt-4 mb-4">Weer in placeholder</h2>
      <div v-for="search in searches" :key="search.id">
        {{ search }}
      </div>
      <v-row class="mt-8 mb-8" no-gutters>
        <span>Overzicht van dagen</span>
      </v-row>
      <v-divider />
      <h2 class="mt-4 mb-4">Details</h2>
      <v-row no-gutters>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <v-card
              class="mx-auto my-8"
              elevation="16"
              max-width="344"
            >
              <v-card-item>
                <v-card-title>
                  Wind
                </v-card-title>

                <v-card-subtitle>
                  Card subtitle secondary text
                </v-card-subtitle>
              </v-card-item>

              <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </v-card-text>
            </v-card>
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <v-card
              class="mx-auto my-8"
              elevation="16"
              max-width="344"
            >
              <v-card-item>
                <v-card-title>
                  Temperatuur
                </v-card-title>

                <v-card-subtitle>
                  Card subtitle secondary text
                </v-card-subtitle>
              </v-card-item>

              <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </v-card-text>
            </v-card>
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="pa-2 ma-2">
            <v-card
              class="mx-auto my-8"
              elevation="16"
              max-width="344"
            >
              <v-card-item>
                <v-card-title>
                  Sunset
                </v-card-title>

                <v-card-subtitle>
                  Card subtitle secondary text
                </v-card-subtitle>
              </v-card-item>

              <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </v-card-text>
            </v-card>
          </v-sheet>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue'

  interface Search {
    id: number
    searchValue: string
  }
  const newSearchPlace = ref('')
  const searches = reactive<Search[]>([])

  const addSearch = () => {
    const newSearch: Search = { id: searches.length + 1, searchValue: newSearchPlace.value }
    searches.push(newSearch)
    newSearchPlace.value = ''
  }
</script>

<style lang="scss" scoped>
.text-h2 {
  margin-bottom: 16px;
}
</style>
