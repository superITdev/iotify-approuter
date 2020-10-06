<template>
  <div class="h-100">
    <router-view />
  </div>
</template>

<script>
import { getDirection } from "./utils";

export default {
  components: {},
  beforeMount() {
    const direction = getDirection();
    if (direction.isRtl) {
      document.body.classList.add("rtl");
      document.dir = "rtl";
      document.body.classList.remove("ltr");
    } else {
      document.body.classList.add("ltr");
      document.dir = "ltr";
      document.body.classList.remove("rtl");
    }
  },
  mounted() {
    // used when saving / loading json data.
    window.URL = window.URL || window.webkitURL;
    window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
    Number.prototype.format = function() {
      return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    };
  }
};
</script>
