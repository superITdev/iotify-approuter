<template>
<v-card class="fill-height d-flex" flat tile>
  <perfect-scrollbar class="indigo accent-4">
    <v-list dense dark flat tile class="pa-0 indigo accent-4" :width="majorVS.itemWidth">
      <v-list-item-group mandatory v-model="majorVS.activeMajorType">
        <v-list-item
          v-for="(major, majorIdx) in majorCategories" :key="majorIdx"
          class="pa-0"
          :color="major.color"
          active-class="white"
          :style="`height:${majorVS.itemHeight}px`"
          :value="major.majorType"
          @click="onMajorType(major.majorType)"
        >
          <template v-slot:default="{active}">
            <v-list-item-content>
              <svgicon :icon="major.icon" :color="active ? major.color : 'white'" :width="`${majorVS.itemIconSize}`" :height="`${majorVS.itemIconSize}`"/>
              <div class="text-center" :style="`font-size:${majorVS.itemFontSize}px`" v-text="major.title"/>
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </perfect-scrollbar>
  <perfect-scrollbar>
    <v-list flat tile class="iotar-subbar" width="255">
      <v-list-item>
        <v-list-item-title class="iotar-subbar-title">App Router</v-list-item-title>
        <v-list-item-action>
          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <v-list-item>
        <v-text-field dense outlined prepend-inner-icon="mdi-magnify" clearable v-model="searchNodeItems"/>
      </v-list-item>

      <NodePanels
        :surfaceId="surfaceId"
        selector="[nodeItemSelector]"
        :data-generator="nodeCreator"

        :subRecents="activeRecents"
        :subCategories="activeSubCategories"
        :nodeItemInfo="getNodeItemUIinfo"
      />
    </v-list>
  </perfect-scrollbar>
  <div class="flex-grow-1 iotar-graph-view pa-1">
    <!-- alive_graphV01 -->
    <!-- <Controls :surfaceId="surfaceId"/> -->
    <!-- <GraphV01 :surfaceId="surfaceId"/> -->
    <!-- toolbox -->
    <v-sheet class="iotar-graph-toolbox rounded-pill grey lighten-3 ma-3 d-flex">
      <v-btn icon :color="graphCS.setMode==='pan' ? graphCS.toolSelColor : graphCS.toolColor" title="Pan" v-on:click="onGraphSetMode('pan')">
        <v-icon>mdi-pan</v-icon>
      </v-btn>
      <v-btn icon :color="graphCS.setMode==='select' ? graphCS.toolSelColor : graphCS.toolColor" title="Select" v-on:click="onGraphSetMode('select')">
        <v-icon>mdi-image-size-select-small</v-icon>
      </v-btn>
      <v-btn icon :color="graphCS.toolColor" title="Zoom To Fit" v-on:click="onGraphZoomToFit">
        <v-icon>mdi-fit-to-page-outline</v-icon>
      </v-btn>
      <v-btn icon :color="graphCS.toolColor" title="Undo" v-on:click="onGraphUndo" :disabled="!graphCS.undoable">
        <v-icon>mdi-undo-variant</v-icon>
      </v-btn>
      <v-btn icon :color="graphCS.toolColor" title="Redo" v-on:click="onGraphRedo" :disabled="!graphCS.redoable">
        <v-icon>mdi-redo-variant</v-icon>
      </v-btn>
      <v-btn icon :color="graphCS.toolColor" title="Clear" v-on:click="onGraphClear">
        <v-icon>mdi-close-circle-multiple-outline</v-icon>
      </v-btn>
    </v-sheet>
    <v-sheet class="iotar-graph-toolbox rounded-pill grey lighten-3 ma-3 d-flex flex-column" style="left:0; bottom:0;">
      <v-btn icon :color="graphCS.toolColor" :title="fullScreen ? 'Exit full screen' : 'full screen'" v-on:click="onFullScreen">
        <v-icon>{{ fullScreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen' }}</v-icon>
      </v-btn>
      <v-btn icon :color="graphCS.toolColor" title="Zoom In" v-on:click="onNudgeZoom(true)">
        <v-icon>mdi-magnify-plus-outline</v-icon>
      </v-btn>
      <v-btn icon :color="graphCS.toolColor" title="Zoom Out" v-on:click="onNudgeZoom(false)">
        <v-icon>mdi-magnify-minus-outline</v-icon>
      </v-btn>
    </v-sheet>
    <v-sheet class="iotar-graph-toolbox rounded-pill grey lighten-3 ma-3 d-flex" style="right:0; bottom:0;">
      <v-btn icon :color="graphCS.toolColor"><v-icon>mdi-human-handsup</v-icon></v-btn>
      <v-btn icon :color="graphCS.toolColor"><v-icon>mdi-code-not-equal-variant</v-icon></v-btn>
      <v-btn icon :color="graphCS.toolColor"><v-icon>mdi-dots-horizontal</v-icon></v-btn>
    </v-sheet>
    <v-row class="iotar-graph-toolbox mr-3 mt-3" align="center" style="right:0; top:0;">
      <v-btn icon class="mr-2" @click="onLogOut">
        <v-avatar size="25"><v-img :src="!!meAvatar ? meAvatar : '/img/favicon.ico'" lazy-src="/img/favicon.ico"/></v-avatar>
      </v-btn>
      <v-btn class="iotar-graph-tool-btn" color="indigo accent-4" dark rounded small>Deploy</v-btn>
    </v-row>
    <GraphV02 :surfaceId="surfaceId" @onGraphSetModeChanged="onGraphSetModeChanged"/>
  </div>
</v-card>
</template>

<script>
import * as NodeTemplates from '/common/NodeTemplates.js';
import NodePanels from '/imports/ui/NodePanels/NodePanels.vue';
import * as NodeUtil from '/common/NodeUtil.js';

import  { Dialogs, jsPlumbToolkit, jsPlumbUtil, Surface } from "jsplumbtoolkit"
import { jsPlumbToolkitVue2 } from 'jsplumbtoolkit-vue2'
import { jsPlumbToolkitUndoRedo } from "jsplumbtoolkit-undo-redo";
import { jsPlumbToolkitEditableConnectors } from "jsplumbtoolkit-editable-connectors";

// alive_graphV01
// import Controls from '/imports/ui/argraph/v01/Controls.vue'
// import GraphV01 from '/imports/ui/argraph/v01/Flowchart.vue'
import GraphV02 from '/imports/ui/argraph/v02/Graph.vue'

import debounce from 'lodash.debounce'

let toolkit;
let surface;
let undoManager;

function isFullScreenMode() {
  const fullScreen =
    (document.fullscreenElement != null) ||
    (document.webkitFullscreenElement != null) ||
    (document.mozFullScreenElement != null) ||
    (document.msFullscreenElement != null)
  return fullScreen;
}

export default {
  components: {
    NodePanels,
    // alive_graphV01
    // Controls,
    // GraphV01,
    GraphV02,
  },
  data () {
    return {
      surfaceId: "surface",

      majorVS: { // vue-style for major-bar ui
        itemWidth: 90, // px
        itemHeight: 110, // px
        itemIconSize: 50, // px
        itemFontSize: 13, // px

        activeMajorType: ''
      },

      searchNodeItems: "",
      filterNodeItems: "", // debounced searchNodeItems

      graphCS: { // vue-style for controls on graph space
        toolColor: '',
        toolSelColor: 'indigo accent-4',
        setMode: 'pan',
        undoable: false,
        redoable: false,
      },

      fullScreen: false,
    }
  },
  computed: {
    majorCategories() { // major categories
      return NodeTemplates.majors;
    },
    allNodeItems() { // node items
      // filter by search
      const result = NodeTemplates.nodeItems.filter(nodeItem => nodeItem.itemTitle.toLowerCase().includes(this.filterNodeItems.toLowerCase()));
      return result;
    },
    activeSubCategories() {
      const subs = this.getSubCategories(this.majorVS.activeMajorType);
      return subs;
    },
    activeRecents() {
      const recents = this.$store.state.recentlyUsedNodeItems[this.majorVS.activeMajorType];
      return recents;
    }
  },
  methods: {
    onLogOut() {
      // Meteor.logout();
      this.$router.push("/");
    },
    getMajorCategory(majorType) {
      return this.majorCategories.find(mc => mc.majorType===majorType);
    },
    getSubCategories(majorType) {
      const major = this.getMajorCategory(majorType);

      // Filter nodeItems by majorType.
      const nodeItems = this.allNodeItems.filter(node => node.majorType===majorType);

      const subs = []; // [ {majorType, subTitle, nodeItems[ {} ]} ]
      nodeItems.forEach(node => {
        let sub = subs.find((sub) => NodeUtil.checkPartType(sub.subTitle, node.subTitle));
        if (sub) {
          // Register the node into sub category.
          sub.nodeItems.push(node);
        } else {
          // Create new sub cateogory.
          sub = {
            majorType: node.majorType,
            majorTitle: major.title,
            subTitle: node.subTitle,
            nodeItems: [],
          };
          sub.nodeItems.push(node);
          subs.push(sub);
        }
      });

      return subs;
    },
    getNodeItemUIinfo(nodeItem) {
      // get info to bind for UI item for nodeItem.
      const major = this.getMajorCategory(nodeItem.majorType);

      const info = {
        ...nodeItem,
        majorTitle: major.title,

        icon: nodeItem.icon ? nodeItem.icon : major.icon,
        title: nodeItem.itemTitle,
        color: major.color,
        isGroup: major.nodeBaseInfo.isGroup,
      }

      return info;
    },
    nodeCreator:function(el) {
      const recentlyUsed = el.getAttribute("recentlyUsed");
      const id = el.getAttribute("nodeItemSelector");
      let [majorType, subTitle, itemTitle] = id.split('/');
      if (!subTitle) subTitle = undefined;

      const nodeItem = this.allNodeItems.find(nodeItem => NodeUtil.checkTypeWithNode(nodeItem, {majorType, subTitle, itemTitle}));
      
      // alive_graphV01
      // const v01 = {
      //   id: jsPlumbUtil.uuid(),
      //   type: nodeItem.majorType,
      //   text: nodeItem.itemTitle,
      //   info: nodeItem,
      //   w: 180,
      //   h: 130,
      // }
      // return v01;

      const major = this.getMajorCategory(majorType);
      const v02 = {
        ...major.nodeBaseInfo, // base
        ...nodeItem, // self
        // customize
        majorTitle: major.title,
        type: nodeItem.majorType, // jsplumb's node-type to create
        itemTitle: nodeItem.itemTitle,

        id: jsPlumbUtil.uuid(),
        // options
        extra: {
          saveStore: !recentlyUsed
        }
      }
      v02.mw = v02.w; // min-width : initially
      v02.mcolor = major.color;

      return v02;
    },
    doSearchNodeItems() {
      this.filterNodeItems = this.searchNodeItems==null ? "" : this.searchNodeItems;
    },

    onMajorType(majorType) {
      // when major-category is selected.
      // Open subBar if closed?
      this.majorVS.activeMajorType = majorType;
      this.searchNodeItems = "";
    },
    onGraphSetMode(mode) {
      surface.setMode(mode);
    },
    onGraphSetModeChanged(mode) {
      this.graphCS.setMode = mode;
    },
    onGraphZoomToFit() {
      toolkit.clearSelection();
      surface.zoomToFit();
    },
    onGraphUndo() {
      undoManager.undo();
    },
    onGraphRedo() {
      undoManager.redo();
    },
    onGraphClear() {
      const isEmpty = toolkit.getNodeCount()===0 && toolkit.getGroupCount()===0;
      if (isEmpty || confirm("Clear canvas?")) toolkit.clear();
    },
    onFullScreen() {
      const fullScreen = isFullScreenMode();

      if (fullScreen) { // exit full screen
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else { // go to full screen
        const docElm = document.documentElement;
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen()
        } else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen()
        } else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen()
        } else if (docElm.msRequestFullscreen) {
          docElm.msRequestFullscreen()
        }
      }
    },
    onFullScreenChange() {
      this.fullScreen = isFullScreenMode();
    },
    onNudgeZoom(plus) {
      let nudge = 0.05;
      if (!plus) nudge *= -1;
      surface.nudgeZoom(nudge);
    },
  },
  mounted() {
    jsPlumbToolkit.ready(() => {
        Dialogs.initialize({selector: ".dlg"});
    });
    jsPlumbToolkitVue2.getSurface(this.surfaceId, (s) => {
        surface = s;
        toolkit = s.getToolkit();

        undoManager = new jsPlumbToolkitUndoRedo({
            surface:surface,
            compound:true,
            onChange:(mgr, undoSize, redoSize) => {
              this.graphCS.undoable = undoSize > 0;
              this.graphCS.redoable = redoSize > 0;
            }
        });
    });
  },
  created() {
    this.debounceSearchNodeItems = debounce(this.doSearchNodeItems, 500);

    document.addEventListener('fullscreenchange', this.onFullScreenChange);
    document.addEventListener('webkitfullscreenchange', this.onFullScreenChange);
    document.addEventListener('mozfullscreenchange', this.onFullScreenChange);
    document.addEventListener('MSFullscreenChange', this.onFullScreenChange);
  },
  destroyed() {
    document.removeEventListener('fullscreenchange', this.onFullScreenChange);
    document.removeEventListener('webkitfullscreenchange', this.onFullScreenChange);
    document.removeEventListener('mozfullscreenchange', this.onFullScreenChange);
    document.removeEventListener('MSFullscreenChange', this.onFullScreenChange);
  },
  watch: {
    searchNodeItems(/*newVal, oldVal*/) {
      this.debounceSearchNodeItems();
    }
  }
}
</script>

<style scoped>
.iotar-subbar {
  font-family: "Nunito", sans-serif;
}
.iotar-subbar-title {
  font-size:18px;
  font-weight:bold;
}
.iotar-graph-view {
  background: url(/img/graph-bg.jpg);
  position: relative;
  height: 100vh;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}
.iotar-graph-toolbox {
  position: absolute;
  z-index: 20;
}
.iotar-graph-tool-btn {
  text-transform:none !important;
}
</style>

<style>
.ps {
  /* perfect-scrollbar */
  height: 100vh;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}
.ps__rail-y {
  background-color: transparent !important;
}
.ps__thumb-y {
  background-color: transparent !important;
  width: 6px !important;
  right: 0 !important;
}
</style>