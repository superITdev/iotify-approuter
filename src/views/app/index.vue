<template>
<div id="app-container" :class="getMenuType">
  <Sidebar v-bind:surface-id="surfaceId" selector="[data-node-type]" v-bind:data-generator="dataGenerator"></Sidebar>
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
import Sidebar from '@/containers/Sidebar'
import {mapGetters} from 'vuex'

import  { Dialogs, jsPlumbToolkit, jsPlumbUtil } from "jsplumbtoolkit"
import { jsPlumbToolkitEditableConnectors } from "jsplumbtoolkit-editable-connectors";

import Flowchart from '@/components/node/Flowchart.vue'
import Controls from '@/components/node/Controls.vue'

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
        const nodeItem = el.getAttribute("node-item");
        console.log(nodeItem.title);
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
