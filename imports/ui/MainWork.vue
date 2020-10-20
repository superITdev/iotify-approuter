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
            @click="onMajorCliick(major.majorType)"
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

    <v-main class="overflow-hidden">
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
            <v-text-field dense outlined prepend-inner-icon="mdi-magnify" clearable/>
          </v-list-item>

          <v-expansion-panels accordion multiple tile v-model="subVS.openSubs">
            <v-expansion-panel>
              <v-expansion-panel-header class="iotar-subbar-subtitle">Recently Used</v-expansion-panel-header>
              <v-expansion-panel-content class="iotar-subbar-content">
                node1, node2, node3 ...
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel v-for="(sub, subIdx) in activeSubCategories" :key="subIdx">
              <v-expansion-panel-header class="iotar-subbar-subtitle">{{sub.subTitle}}</v-expansion-panel-header>
              <v-expansion-panel-content class="iotar-subbar-content">
                <v-row dense>
                  <v-col v-for="(nodeItem, nodeIdx) in sub.nodeItems" :key="nodeIdx" :cols="subVS.cols">
                    <NodeItem
                      :nodeItem="getNodeItemUIinfo(nodeItem)"
                      v-bind:surface-id="surfaceId"
                      selector="[node-item-selector]"
                      v-bind:data-generator="nodeCreator"                      
                    />
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-navigation-drawer>
        <v-main>
          <Controls v-bind:surface-id="surfaceId"/>
          <!-- <GraphV01 v-bind:surface-id="surfaceId"/> -->
          <GraphV02 v-bind:surface-id="surfaceId"/>
        </v-main>
      </v-row>
    </v-main>
  </v-row>
</v-card>
</template>

<script>
import NodeItem from '/imports/ui/NodeItem.vue';

import  { Dialogs, jsPlumbToolkit, jsPlumbUtil } from "jsplumbtoolkit"
import { jsPlumbToolkitEditableConnectors } from "jsplumbtoolkit-editable-connectors";

import Controls from '/imports/ui/argraph/common/Controls.vue'
// import GraphV01 from '/imports/ui/argraph/v01/Flowchart.vue'
import GraphV02 from '/imports/ui/argraph/v02/Graph.vue'

export default {
  components: {
    NodeItem,
    Controls,
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
      subVS: { // vue-style for sub-bar ui
        cols: 4,
        openSubs: [],
      }
    }
  },
  computed: {
    majorCategories() {
      const majors = [ // data for major category
        {
          majorType:'',
          title: '',
          icon: 'IoT',
          color: 'indigo darken-4',
          globalRecent: true
        },
        {
          majorType:'deployment',
          title: 'Deployment',
          icon: 'deployment',
          color: 'blue accent-4',
          nodeBaseInfo: {
            isGroup: true,
            titleBgColor: "#00BAFF",
            h: 450,
          },
        },
        {
          majorType:'protocol',
          title: 'Protocol',
          icon: 'protocol',
          color: 'green accent-4',
          nodeBaseInfo: {
            w1: 50,
            w2: 75,
          },
        },
        {
          majorType:'database',
          title: 'Database',
          icon: 'memory',
          color: 'orange accent-4',
          nodeBaseInfo: {
            w1: 50,
            w2: 90,
          },
        },
        {
          majorType:'function',
          title: 'Function',
          icon: 'control',
          color: 'cyan accent-4',
          nodeBaseInfo: {
            w1: 50,
            w2: 75,
          },
        },
        {
          majorType:'staticAsset',
          title: 'Static Asset',
          icon: 'illustration',
          color: 'purple accent-4',
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
            majorType: 'deployment',
            itemTitle: "AWS",
        },
        {
            majorType: 'deployment',
            itemTitle: "GCP",
        },
        {
            majorType: 'deployment',
            itemTitle: "Edge",
        },
        // protocol
        // protocol/gateway
        {
            majorType: 'protocol',
            subTitle: 'Gateway',
            itemTitle: "HTTP",
        },
        {
            majorType: 'protocol',
            subTitle: 'Gateway',
            itemTitle: "Websocket",
        },
        {
            majorType: 'protocol',
            subTitle: 'Gateway',
            itemTitle: "MQTT",
        },
        // protocol/client
        {
            majorType: 'protocol',
            subTitle: 'Client',
            itemTitle: "HTTP",
        },
        {
            majorType: 'protocol',
            subTitle: 'Client',
            itemTitle: "Websocket",
        },
        {
            majorType: 'protocol',
            subTitle: 'Client',
            itemTitle: "MQTT",
        },
        {
            majorType: 'protocol',
            subTitle: 'Client',
            itemTitle: "NATS",
        },
        {
            majorType: 'protocol',
            subTitle: 'Client',
            itemTitle: "TCP",
        },
        {
            majorType: 'protocol',
            subTitle: 'Client',
            itemTitle: "UDP",
        },
        {
            majorType: 'protocol',
            subTitle: 'Client',
            itemTitle: "COAP",
        },
        {
            majorType: 'protocol',
            subTitle: 'Client',
            itemTitle: "SSH",
        },
        // database
        // database/client
        {
            majorType: 'database',
            subTitle: 'Client',
            itemTitle: "REDIS",
        },
        {
            majorType: 'database',
            subTitle: 'Client',
            itemTitle: "MongoDB",
        },
        {
            majorType: 'database',
            subTitle: 'Client',
            itemTitle: "Elastic search",
        },
        {
            majorType: 'database',
            subTitle: 'Client',
            itemTitle: "S3",
        },
        // database/server
        {
            majorType: 'database',
            subTitle: 'Server',
            itemTitle: "REDIS",
        },
        // function
        // function/custom
        {
            majorType: 'function',
            subTitle: 'Custom',
            itemTitle: "Javascript",
        },
        {
            majorType: 'function',
            subTitle: 'Custom',
            itemTitle: "Go",
        },
        // function/prebuilt
        {
            majorType: 'function',
            subTitle: 'Prebuilt',
            itemTitle: "Timer",
        },
        {
            majorType: 'function',
            subTitle: 'Prebuilt',
            itemTitle: "IETTT",
        },
        {
            majorType: 'function',
            subTitle: 'Prebuilt',
            itemTitle: "Zapier",
        },
        {
            majorType: 'function',
            subTitle: 'Prebuilt',
            itemTitle: "Webhook",
        },
        {
            majorType: 'function',
            subTitle: 'Prebuilt',
            itemTitle: "REST2Websocket",
        },
        {
            majorType: 'function',
            subTitle: 'Prebuilt',
            itemTitle: "MQTT2HTTP",
        },
        // staticAsset
        {
            majorType: 'staticAsset',
            itemTitle: "Web URL",
        },
        {
            majorType: 'staticAsset',
            itemTitle: "Icon",
        },
        {
            majorType: 'staticAsset',
            itemTitle: "Github",
        },
      ]
      return nodeItems;
    },
    activeSubCategories() {
      const subs = this.getSubCategories(this.majorVS.activeMajorType);

      // opens all pannels including 'Recentely Used'.
      const n = subs.length + 1;
      this.subVS.openSubs = [...Array(n).keys()];

      return subs;
    }
  },
  methods: {
    getMajorCategory(majorType) {
      return this.majorCategories.find(mc => mc.majorType===majorType);
    },
    getSubCategories(majorType) {
      // Filter nodeItems by majorType.
      const nodeItems = this.allNodeItems.filter(node => node.majorType===majorType);

      const subs = []; // [ {majorType, subTitle, nodeItems[ {} ]} ]
      nodeItems.forEach(node => {
        let sub = subs.find((sub) => sub.subTitle==node.subTitle);
        if (sub) {
          // Register the node into sub category.
          sub.nodeItems.push(node);
        } else {
          // Create new sub cateogory.
          sub = {
            majorType: node.majorType,
            subTitle: node.subTitle,
            nodeItems: [],
          };
          sub.nodeItems.push(node);
          subs.push(sub);
        }
      });
      
      // default subTitle
      const defaultSub = subs.find(sub => !sub.subTitle);
      if (defaultSub) {
        if (subs.length==1) {
          defaultSub.subTitle = this.getMajorCategory(majorType).title;
        } else {
          defaultSub.subTitle = 'etc';
        }
      }
      
      return subs;
    },
    onMajorCliick(majorType) {
      // when major-category is selected.
      // Open subBar if closed?
      this.majorVS.activeMajorType = majorType;
    },
    getNodeItemUIinfo(nodeItem) {
      // get info to bind for UI item for nodeItem.
      const major = this.getMajorCategory(nodeItem.majorType);

      const info = {
        icon: nodeItem.icon ? nodeItem.icon : major.icon,
        title: nodeItem.itemTitle,
        color: major.color,
        isGroup: major.nodeBaseInfo.isGroup,
        selector: [nodeItem.majorType, nodeItem.subTitle, nodeItem.itemTitle].join('/'),
      }

      return info;
    },
    nodeCreator:function(el) {
      const id = el.getAttribute("node-item-selector");
      let [majorType, subTitle, itemTitle] = id.split('/');
      if (!subTitle) subTitle = undefined;

      const nodeItem = this.allNodeItems.find(nodeItem => nodeItem.majorType==majorType && nodeItem.subTitle==subTitle && nodeItem.itemTitle==itemTitle);
      
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
        type: nodeItem.majorType, // jsplumb's node-type to create
        title: nodeItem.itemTitle,

        id: jsPlumbUtil.uuid(),
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
.iotar-subbar-subtitle {
  font-size:14px;
}
.iotar-subbar-content {
  font-size:14px;
}
</style>