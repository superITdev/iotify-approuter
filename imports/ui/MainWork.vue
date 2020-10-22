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
        <v-main>
          <Controls :surfaceId="surfaceId"/>
          <!-- <GraphV01 :surfaceId="surfaceId"/> -->
          <GraphV02 :surfaceId="surfaceId"/>
        </v-main>
      </v-row>
    </v-main>
  </v-row>
</v-card>
</template>

<script>
import NodeMajorTypes from '/common/NodeMajorTypes.js';
import NodePanels from '/imports/ui/nodePanels/NodePanels.vue';

import  { Dialogs, jsPlumbToolkit, jsPlumbUtil } from "jsplumbtoolkit"
import { jsPlumbToolkitEditableConnectors } from "jsplumbtoolkit-editable-connectors";

import Controls from '/imports/ui/argraph/common/Controls.vue'
// import GraphV01 from '/imports/ui/argraph/v01/Flowchart.vue'
import GraphV02 from '/imports/ui/argraph/v02/Graph.vue'

import debounce from 'lodash.debounce'

export default {
  components: {
    NodePanels,
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

      searchNodeItems: "",
      filterNodeItems: "", // debounced searchNodeItems
    }
  },
  computed: {
    majorCategories() {
      const majors = [ // data for major category
        {
          majorType: NodeMajorTypes.overallRecents,
          title: '',
          icon: 'IoT',
          color: 'indigo darken-4',
        },
        {
          majorType: NodeMajorTypes.deployment,
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
          majorType: NodeMajorTypes.protocol,
          title: 'Protocol',
          icon: 'protocol',
          color: 'green accent-4',
          nodeBaseInfo: {
            w1: 50,
            w2: 75,
          },
        },
        {
          majorType: NodeMajorTypes.database,
          title: 'Database',
          icon: 'memory',
          color: 'orange accent-4',
          nodeBaseInfo: {
            w1: 50,
            w2: 90,
          },
        },
        {
          majorType: NodeMajorTypes.function,
          title: 'Function',
          icon: 'control',
          color: 'cyan accent-4',
          nodeBaseInfo: {
            w1: 50,
            w2: 75,
          },
        },
        {
          majorType: NodeMajorTypes.staticAsset,
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
        let sub = subs.find((sub) => sub.subTitle==node.subTitle);
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
    onMajorCliick(majorType) {
      // when major-category is selected.
      // Open subBar if closed?
      this.majorVS.activeMajorType = majorType;
      this.searchNodeItems = "";
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
        // options
        extra: {
          saveStore: !recentlyUsed
        }
      }

      return v02;
    },
    doSearchNodeItems() {
      this.filterNodeItems = this.searchNodeItems==null ? "" : this.searchNodeItems;
    },
  },
  created() {
    this.debounceSearchNodeItems = debounce(this.doSearchNodeItems, 500);
  },
  mounted() {
    jsPlumbToolkit.ready(() => {
        Dialogs.initialize({selector: ".dlg"});
    });
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
</style>