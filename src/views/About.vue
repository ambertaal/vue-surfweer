<template>
  <v-navigation-drawer
    v-model="drawer"
  >
    <v-list>
      <v-list-item
        subtitle="Best SurfAdvice Ever!"
        title="Vuetify SurfAdvice"
      />
    </v-list>

    <v-divider />

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-bell-outline" title="SurfAdvice" to="/" />
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
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nunc elit, consequat at magna vitae, iaculis semper magna. Nam cursus metus lacus, a dignissim turpis volutpat nec. Vivamus quis sem tempor, rhoncus metus ac, semper tellus. Cras commodo, nulla id lacinia tincidunt, ligula elit posuere nunc, ac efficitur leo sapien eget metus. Quisque lacinia velit sed consequat viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris sodales ullamcorper odio vitae hendrerit. Ut tristique mattis magna vel convallis. Quisque vestibulum pharetra nunc, at scelerisque ex facilisis ut. Donec eu felis semper nulla aliquam volutpat.</p>
        <p>Sed sed suscipit elit. Maecenas tincidunt ex sit amet tortor feugiat, eget rhoncus enim lobortis. Phasellus id nunc aliquet, semper libero id, sodales mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed vitae dui mattis, rhoncus lorem at, aliquam orci. In hac habitasse platea dictumst. Phasellus in lorem sed neque viverra feugiat sollicitudin nec lacus. Sed blandit justo nec posuere dignissim. In in quam quis nunc blandit ornare. Quisque eget ante dignissim, imperdiet neque quis, varius nisi. Vestibulum vestibulum justo id metus vestibulum auctor. Cras laoreet tellus vitae augue luctus, vel molestie mi convallis. Cras et elit sed tortor ultricies viverra. Mauris vitae turpis a justo volutpat pellentesque. Phasellus iaculis ac ipsum a interdum.</p>
        <p>Etiam et lectus felis. Proin sollicitudin, turpis sed auctor dapibus, enim arcu luctus nulla, ut varius ante orci in mauris. Donec mattis feugiat augue, et egestas nibh faucibus a. Suspendisse quis magna at ante ultricies interdum. Nulla facilisi. Curabitur mi ex, tincidunt sit amet mauris et, bibendum fringilla nulla. Curabitur dictum laoreet interdum. Nulla in ligula dignissim, tincidunt felis ut, iaculis elit. Donec pulvinar volutpat efficitur. Etiam enim mauris, efficitur a augue sit amet, dictum bibendum urna. Morbi mattis dui in quam egestas, quis tristique metus mollis.</p>
      </div>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const drawer = ref(null)

</script>
