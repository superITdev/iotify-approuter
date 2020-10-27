<template>
<v-card
  width="100%"
  height="100%"
  >
  <v-row
    class="fill-height"
    no-gutters
  >
    <v-navigation-drawer
      color="rgba(61, 99, 244, 0.9)"
      mini-variant
      dark
      :mini-variant-width="majorVS.itemWidth"
    >
      <v-list flat class="pa-0">
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
    </v-navigation-drawer>

    <v-main class="overflow-hidden iotar-graph-bg">
      <v-row
        class="fill-height"
        no-gutters
      >
        <v-navigation-drawer
          class="iotar-subbar"
        >
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
        </v-navigation-drawer>
        <v-main class="ma-1">
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
            <v-btn icon class="mr-2"><v-avatar size="30"><v-img src="/img/avatar.png"></v-img></v-avatar></v-btn>
            <v-btn class="iotar-graph-tool-btn" :color="graphCS.btnColor" dark rounded small>Deploy</v-btn>
          </v-row>
          <GraphV02 :surfaceId="surfaceId" @onGraphSetModeChanged="onGraphSetModeChanged"/>
        </v-main>
      </v-row>
    </v-main>
  </v-row>
</v-card>
</template>

<script>
import NodeMajorTypes from '/common/NodeMajorTypes.js';
import NodePanels from '/imports/ui/nodePanels/NodePanels.vue';
import * as NodeUtil from '/common/NodeUtil.js';

import  { Dialogs, jsPlumbToolkit, jsPlumbUtil, Surface } from "jsplumbtoolkit"
import { jsPlumbToolkitVue2 } from 'jsplumbtoolkit-vue2'
import { jsPlumbToolkitUndoRedo } from "jsplumbtoolkit-undo-redo";
import { jsPlumbToolkitEditableConnectors } from "jsplumbtoolkit-editable-connectors";

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
        toolSelColor: 'blue darken-1',
        btnColor: 'blue darken-1',
        setMode: 'pan',
        undoable: false,
        redoable: false,
      },

      fullScreen: false,
    }
  },
  computed: {
    majorCategories() {
      const majors = [ // data for major category
        {
          majorType: NodeMajorTypes.overallRecents,
          title: '',
          icon: 'IoT',
          color: '#1A237E', // indigo darken-4
        },
        {
          majorType: NodeMajorTypes.deployment,
          title: 'Deployment',
          icon: 'deployment',
          color: '#2962FF', // blue accent-4
          nodeBaseInfo: {
            isGroup: true,
            h: 450,
          },
        },
        {
          majorType: NodeMajorTypes.protocol,
          title: 'Protocol',
          icon: 'protocol',
          color: '#00C853', // green accent-4
          nodeBaseInfo: {
            w1: 50,
            w2: 75,
          },
        },
        {
          majorType: NodeMajorTypes.database,
          title: 'Database',
          icon: 'memory',
          color: '#FF6D00', // orange accent-4
          nodeBaseInfo: {
            w1: 50,
            w2: 90,
          },
        },
        {
          majorType: NodeMajorTypes.function,
          title: 'Function',
          icon: 'control',
          color: '#00B8D4', // cyan accent-4
          nodeBaseInfo: {
            w1: 50,
            w2: 75,
          },
        },
        {
          majorType: NodeMajorTypes.staticAsset,
          title: 'Static Asset',
          icon: 'illustration',
          color: '#AA00FF', // purple accent-4
          nodeBaseInfo: {
            w1: 50,
            w2: 100,
          },
        },
      ];
      return majors;
    },
    allNodeItems() {
      const nodeItems = [ // fetched from backend
        // deployment
        {
            majorType: NodeMajorTypes.deployment,
            itemTitle: "AWS",
            icon: 'deployment/AWS',
        },
        {
            majorType: NodeMajorTypes.deployment,
            itemTitle: "GCP",
            icon: 'deployment/GCP',
        },
        {
            majorType: NodeMajorTypes.deployment,
            itemTitle: "Edge",
            icon: 'deployment/edge',
        },
        // protocol
        // protocol/gateway
        {
            majorType: NodeMajorTypes.protocol,
            subTitle: 'Gateway',
            itemTitle: "HTTP",
            icon: 'protocol/gateway/http',
        },
        {
            majorType: NodeMajorTypes.protocol,
            subTitle: 'Gateway',
            itemTitle: "Websocket",
            icon: 'protocol/gateway/websocket',
        },
        {
            majorType: NodeMajorTypes.protocol,
            subTitle: 'Gateway',
            itemTitle: "MQTT",
            icon: 'protocol/gateway/MQTT',
        },
        // protocol/client
        {
            majorType: NodeMajorTypes.protocol,
            subTitle: 'Client',
            itemTitle: "HTTP",
            icon: 'protocol/client/http',
        },
        {
            majorType: NodeMajorTypes.protocol,
            subTitle: 'Client',
            itemTitle: "Websocket",
            icon: 'protocol/client/websocket',
        },
        {
            majorType: NodeMajorTypes.protocol,
            subTitle: 'Client',
            itemTitle: "MQTT",
            icon: 'protocol/client/MQTT',
        },
        {
            majorType: NodeMajorTypes.protocol,
            subTitle: 'Client',
            itemTitle: "NATS",
            icon: 'protocol/client/NATS',
        },
        {
            majorType: NodeMajorTypes.protocol,
            subTitle: 'Client',
            itemTitle: "TCP",
            icon: 'protocol/client/tcp',
        },
        {
            majorType: NodeMajorTypes.protocol,
            subTitle: 'Client',
            itemTitle: "UDP",
            icon: 'protocol/client/udp',
        },
        {
            majorType: NodeMajorTypes.protocol,
            subTitle: 'Client',
            itemTitle: "COAP",
            icon: 'protocol/client/COAP',
        },
        {
            majorType: NodeMajorTypes.protocol,
            subTitle: 'Client',
            itemTitle: "SSH",
            icon: 'protocol/client/ssh',
        },
        // database
        // database/client
        {
            majorType: NodeMajorTypes.database,
            subTitle: 'Client',
            itemTitle: "REDIS",
            icon: 'database/client/redis',
        },
        {
            majorType: NodeMajorTypes.database,
            subTitle: 'Client',
            itemTitle: "MongoDB",
            icon: 'database/client/mongodb',
        },
        {
            majorType: NodeMajorTypes.database,
            subTitle: 'Client',
            itemTitle: "Elastic search",
            icon: 'database/client/elasticSearch',
        },
        {
            majorType: NodeMajorTypes.database,
            subTitle: 'Client',
            itemTitle: "S3",
            icon: 'database/client/s3',
        },
        // database/server
        {
            majorType: NodeMajorTypes.database,
            subTitle: 'Server',
            itemTitle: "REDIS",
            icon: 'database/server/redis',
        },
        // function
        // function/custom
        {
            majorType: NodeMajorTypes.function,
            subTitle: 'Custom',
            itemTitle: "Javascript",
            icon: 'function/custom/javascript',
        },
        {
            majorType: NodeMajorTypes.function,
            subTitle: 'Custom',
            itemTitle: "Go",
            icon: 'function/custom/go',
        },
        // function/prebuilt
        {
            majorType: NodeMajorTypes.function,
            subTitle: 'Prebuilt',
            itemTitle: "Timer",
            icon: 'function/prebuilt/timer',
        },
        {
            majorType: NodeMajorTypes.function,
            subTitle: 'Prebuilt',
            itemTitle: "IETT",
            icon: 'function/prebuilt/IETT',
        },
        {
            majorType: NodeMajorTypes.function,
            subTitle: 'Prebuilt',
            itemTitle: "Zapier",
            icon: 'function/prebuilt/zapier',
        },
        {
            majorType: NodeMajorTypes.function,
            subTitle: 'Prebuilt',
            itemTitle: "Webhook",
            icon: 'function/prebuilt/webhook',
        },
        {
            majorType: NodeMajorTypes.function,
            subTitle: 'Prebuilt',
            itemTitle: "REST2Websocket",
            icon: 'function/prebuilt/REST2Websocket',
        },
        {
            majorType: NodeMajorTypes.function,
            subTitle: 'Prebuilt',
            itemTitle: "MQTT2HTTP",
            icon: 'function/prebuilt/MQTT2HTTP',
        },
        // staticAsset
        {
            majorType: NodeMajorTypes.staticAsset,
            itemTitle: "Web URL",
            icon: 'staticAsset/weburl',
        },
        {
            majorType: NodeMajorTypes.staticAsset,
            itemTitle: "Icon",
            icon: 'staticAsset/icon',
        },
        {
            majorType: NodeMajorTypes.staticAsset,
            itemTitle: "Github",
            icon: 'staticAsset/github',
        },
      ]
      // filter by search
      const result = nodeItems.filter(nodeItem => nodeItem.itemTitle.toLowerCase().includes(this.filterNodeItems.toLowerCase()));
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
      
      // const v01 = {
      //   id: jsPlumbUtil.uuid(),
      //   type: nodeItem.majorType,
      //   text: nodeItem.itemTitle,
      //   info: nodeItem,
      //   w: 180,
      //   h: 130,
      // }

      const major = this.getMajorCategory(majorType);
      const v02 = {
        ...major.nodeBaseInfo, // base
        ...nodeItem, // self
        // customize
        majorTitle: major.title,
        type: nodeItem.majorType, // jsplumb's node-type to create
        title: nodeItem.itemTitle,

        id: jsPlumbUtil.uuid(),
        // options
        extra: {
          saveStore: !recentlyUsed
        }
      }
      if (major.nodeBaseInfo.isGroup) v02.titleBgColor = major.color;
      else v02.color1 = major.color;

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
    document.removeEventListener('fullscreenchange', onFullScreenChange);
    document.removeEventListener('webkitfullscreenchange', onFullScreenChange);
    document.removeEventListener('mozfullscreenchange', onFullScreenChange);
    document.removeEventListener('MSFullscreenChange', onFullScreenChange);
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
  border-left: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
}
.iotar-subbar-title {
  font-size:18px;
  font-weight:bold;
}
.iotar-graph-bg {
  background: url(/img/graph-bg.jpg);
}
.iotar-graph-toolbox {
  position: absolute;
  z-index: 20;
}
.iotar-graph-tool-btn {
  text-transform:none !important;
}
</style>