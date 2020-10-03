<template>
<div id="app-container" :class="getMenuType">
  <Sidebar v-bind:surface-id="surfaceId" selector="[node-item-id]" v-bind:data-generator="dataGenerator"></Sidebar>
  <main>
    <div class="work-canvas">
      <Controls v-bind:surface-id="surfaceId"></Controls>
      <!-- <Graph01 v-bind:surface-id="surfaceId"></Graph01> -->
      <Graph v-bind:surface-id="surfaceId"></Graph>
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

import Graph01 from '@/components/graph/v01/Flowchart.vue'
import Controls from '@/components/graph/common/Controls.vue'
import Graph from '@/components/graph/Graph.vue'

import nodeTemplates from '@/data/nodeTemplates'

export default {
  components: { Sidebar, Graph01, Controls, Graph },
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

      return {
        id: jsPlumbUtil.uuid(),
        type: nodeItem.categoryType,
        text: nodeItem.title,
        info: nodeItem,
        w: 180,
        h: 130,
      };
    }
  },
  mounted:function() {
    jsPlumbToolkit.ready(() => {
        Dialogs.initialize({selector: ".dlg"});
    });
  }
}
</script>
