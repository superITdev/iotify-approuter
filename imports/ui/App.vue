<template>
  <v-app id="app">
    <router-view></router-view>
  </v-app>
</template>

<script>
import csStorage from '/common/CSStorage.js';

export default {
  metaInfo: {
    // app title
    title: 'IoTIFY',
    titleTemplate: '%s | App Router', // all titles will be injected into this template
  },
  mounted() {
    csStorage.init();
  }
}
</script>