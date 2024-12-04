<template>
  <v-tooltip class="custom-tooltip" location="top">
    <template #activator="{ props }">
      <v-icon
        class="ml-2"
        color="info"
        style="cursor: pointer"
        v-bind="props"
      >
        mdi-information-outline
      </v-icon>
    </template>
    <span>
      <strong>Criteria voor surfadvies</strong>
      <p><strong>Windsnelheid:</strong></p>
      <p>Geschikt: 3-10 m/s.</p>
      <p>Beginners: 3-7 m/s.</p>
      <p>Gevorderden: 7-10 m/s.</p>
      <strong>Regen:</strong>
      <p>Regen &lt; 2mm/3 uur is aanvaardbaar.</p>
      <strong>Temperatuur:</strong>
      <p>Minimaal 12°C.</p>
    </span>
  </v-tooltip>
</template>

<style lang="scss">
  .custom-tooltip > .v-overlay__content {
    background-color: green !important;
    color: white !important;
    font-size: 14px !important;
    padding: 10px !important;
    border-radius: 8px;
  }
</style>
