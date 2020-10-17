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
            v-for="(major, i) in majorCategories" :key="i"
            class="pa-0"
            :color="major.color"
            active-class="white"
            :style="`height:${majorVS.itemHeight}px`"
            :value="major.majorType"
            @click="onMajorCliick(major)"
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

          <v-expansion-panels accordion multiple>
            <v-expansion-panel>
              <v-expansion-panel-header class="iotar-subbar-subtitle">Recently Used</v-expansion-panel-header>
              <v-expansion-panel-content class="iotar-subbar-content">
                node1, node2, node3 ...
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header class="iotar-subbar-subtitle">Collection</v-expansion-panel-header>
              <v-expansion-panel-content class="iotar-subbar-content">
                node1, node2, node3 ...
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

          activeMajorType: ""
        },
        majorCategories: [ // data for major category
          { majorType:'', title: '', icon: 'IoT', color: 'indigo darken-4', globalRecent: true },
          { majorType:'deployment', title: 'Deployment', icon: 'deployment', color: 'blue accent-4' },
          { majorType:'protocol', title: 'Protocol', icon: 'protocol', color: 'green accent-4' },
          { majorType:'memory', title: 'Memory', icon: 'memory', color: 'orange accent-4' },
          { majorType:'control', title: 'Control', icon: 'control', color: 'cyan accent-4' },
          { majorType:'illustration', title: 'Illustration', icon: 'illustration', color: 'purple accent-4' },
        ],
        items: [
          { title: 'Home', icon: 'mdi-view-dashboard' },
          { title: 'About', icon: 'mdi-forum' },
        ],
      }
    },
    methods: {
      onMajorCliick(major) {
        // when major-category is selected.
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