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
                <v-avatar :size="majorVS.itemIconSize" tile>
                  <svgicon :icon="major.icon" :color="active ? major.color : 'white'"/>
                </v-avatar>
                <v-list-item-title class="text-center" :style="`font-size:${majorVS.itemTextSize}px`" v-text="major.title"/>
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

          <v-expansion-panels accordion multiple tile>
            <v-expansion-panel>
              <v-expansion-panel-header class="iotar-subbar-subtitle">Recently Used</v-expansion-panel-header>
              <v-expansion-panel-content class="iotar-subbar-content">
                node1, node2, node3 ...
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel v-for="(sub, subIdx) in activeSubCategories" :key="subIdx">
              <v-expansion-panel-header class="iotar-subbar-subtitle">{{sub.subTitle}}</v-expansion-panel-header>
              <v-expansion-panel-content class="iotar-subbar-content">
                <v-row>
                  <v-col>
                    Item 1
                  </v-col>
                  <v-col>
                    Item 1
                  </v-col>
                  <v-col>
                    Item 1
                  </v-col>
                  <v-col>
                    Item 1
                  </v-col>
                  <v-col>
                    Item 1
                  </v-col>
                  <v-col>
                    Item 1
                  </v-col>
                  <v-col>
                    Item 1
                  </v-col>

                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

        </v-navigation-drawer>
        <v-main>
        </v-main>
      </v-row>
    </v-main>
  </v-row>
</v-card>
</template>

<script>
  export default {
    data () {
      return {
        majorVS: { // vue-style for major-bar ui
          itemWidth: 90, // px
          itemHeight: 110, // px
          itemIconSize: 50, // px
          itemTextSize: 13, // px

          activeMajorType: ''
        },
      }
    },
    computed: {
      majorCategories() {
        const majors = [ // data for major category
          { majorType:'', title: '', icon: 'IoT', color: 'indigo darken-4', globalRecent: true },
          { majorType:'deployment', title: 'Deployment', icon: 'deployment', color: 'blue accent-4' },
          { majorType:'protocol', title: 'Protocol', icon: 'protocol', color: 'green accent-4' },
          { majorType:'database', title: 'Database', icon: 'memory', color: 'orange accent-4' },
          { majorType:'function', title: 'Function', icon: 'control', color: 'cyan accent-4' },
          { majorType:'staticAsset', title: 'Static Asset', icon: 'illustration', color: 'purple accent-4' },
        ];
        return majors;
      },
      allNodes() {
        const nodes = [ // fetched from backend
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
        return nodes;
      },
      activeSubCategories() {
        const subs = this.getSubCategories(this.majorVS.activeMajorType);
        return subs;
      }
    },
    methods: {
      getMajorCategory(majorType) {
        return this.majorCategories.find(mc => mc.majorType===majorType);
      },
      getSubCategories(majorType) {
        // Filter nodes by majorType.
        const nodes = this.allNodes.filter(node => node.majorType===majorType);

        const subs = []; // [ {majorType, subTitle, items[ {} ]} ]
        nodes.forEach(node => {
          let sub = subs.find((sub) => sub.subTitle==node.subTitle);
          if (sub) {
            // Register the node into sub category.
            sub.items.push(node);
          } else {
            // Create new sub cateogory.
            sub = {
              majorType: node.majorType,
              subTitle: node.subTitle,
              items: [],
            };
            sub.items.push(node);
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
.iotar-subbar-subtitle {
  font-size:14px;
}
.iotar-subbar-content {
  font-size:14px;
}
</style>