<template>
<div id="app-container" :class="getMenuType">
  <Sidebar />
  <main>
    <div class="work-canvas">
      <Controls v-bind:surface-id="surfaceId"></Controls>
      <Flowchart v-bind:surface-id="surfaceId"></Flowchart>
    </div>
    <div class="container-fluid">
      <router-view />
    </div>
  </main>
</div>
</template>

<script>
import Sidebar from '../../containers/Sidebar'
import {mapGetters} from 'vuex'

import  { Dialogs, jsPlumbToolkit, jsPlumbUtil } from "jsplumbtoolkit"
import { jsPlumbToolkitEditableConnectors } from "jsplumbtoolkit-editable-connectors";

import Flowchart from '../../components/node/Flowchart.vue'
import Controls from '../../components/node/Controls.vue'

export default {
  components: { Sidebar, Flowchart, Controls },
  data() {
    return {
      surfaceId: "surface",
    }
  },
  computed: {
    ...mapGetters(['getMenuType'])
  },
  methods:{
      dataGenerator:function(el) {
          return {
              type:el.getAttribute("data-node-type"),
              w:120,
              h:80,
              id:jsPlumbUtil.uuid()
          };
      }
  },
  mounted:function() {
      jsPlumbToolkit.ready(() => {
          Dialogs.initialize({
              selector: ".dlg"
          });
      });
  }
}
</script>

<style scoped>
.work-canvas {
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  position: absolute;
}
</style>
