<template>
<div id="app-container" :class="getMenuType">
  <Sidebar v-bind:surface-id="surfaceId" selector="[node-item-id]" v-bind:data-generator="dataGenerator"></Sidebar>
  <main>
    <div class="work-canvas">
      <Controls v-bind:surface-id="surfaceId"></Controls>
      <!-- <GraphV01 v-bind:surface-id="surfaceId"></GraphV01> -->
      <GraphV02 v-bind:surface-id="surfaceId"></GraphV02>
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

import Controls from '@/components/argraph/common/Controls.vue'
// import GraphV01 from '@/components/argraph/v01/Flowchart.vue'
import GraphV02 from '@/components/argraph/v02/Graph.vue'

import nodeTemplates from '@/data/nodeTemplates'

export default {
  components: {
    Sidebar,
    Controls,
    // GraphV01,
    GraphV02,
  },
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
      const id = el.getAttribute("node-item-id");
      const nodeItem = nodeTemplates[id];

      // const v01 = {
      //   id: jsPlumbUtil.uuid(),
      //   type: nodeItem.categoryType,
      //   text: nodeItem.title,
      //   info: nodeItem,
      //   w: 180,
      //   h: 130,
      // }
      const v02 = {
        id: jsPlumbUtil.uuid(),
        type: nodeItem.categoryType,
        info: nodeItem,
      }
      return v02;
    }
  },
  mounted:function() {
    jsPlumbToolkit.ready(() => {
        Dialogs.initialize({selector: ".dlg"});
    });
  }
}
</script>
