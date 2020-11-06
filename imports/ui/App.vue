<template>
  <v-app id="app">
    <router-view/>
    <SnackBar/>
    <ConfirmDialog/>
  </v-app>
</template>

<script>
import csStorage from '/common/CSStorage.js'

import ConfirmDialog from '/imports/ui/component/ConfirmDialog.vue'
import SnackBar from '/imports/ui/component/SnackBar.vue'

export default {
  metaInfo: {
    // app title
    title: 'IoTIFY',
    titleTemplate: '%s | App Router', // all titles will be injected into this template
  },
  components: {
    ConfirmDialog,
    SnackBar,
  },
  mounted() {
    // used when saving / loading json data.
    window.URL = window.URL || window.webkitURL;
    window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
    Number.prototype.format = function() {
      return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    };

    csStorage.init();
  },
}
</script>

<style>
</style>