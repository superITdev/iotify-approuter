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
    // used when saving / loading json data.
    window.URL = window.URL || window.webkitURL;
    window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
    Number.prototype.format = function() {
      return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    };

    csStorage.init();
  }
}
</script>