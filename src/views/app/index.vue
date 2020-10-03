<template>
<div id="app-container" :class="getMenuType">
  <Sidebar v-bind:surface-id="surfaceId" selector="[node-item-id]" v-bind:data-generator="dataGenerator"></Sidebar>
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

import Flowchart from '@/components/graph/Flowchart.vue'
import Controls from '@/components/graph/Controls.vue'

import nodeTemplates from '@/data/nodeTemplates'

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
