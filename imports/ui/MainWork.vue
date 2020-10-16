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
            active-class="white deep-purple--text"
            :style="`height:${majorVS.itemHeight}px`"
            :value="major.type"
            @click="onMajorCliick(major)"
          >
            <v-list-item-content>
              <v-avatar :size="majorVS.itemIconSize" tile>
                <v-img :src="major.icon" contain></v-img>
              </v-avatar>
              <v-list-item-title class="text-center" :style="`font-size:${majorVS.itemTextSize}px`" v-text="major.title"/>
            </v-list-item-content>
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
          dark
          mini-variant
        >
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img src="https://randomuser.me/api/portraits/women/75.jpg"></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-divider></v-divider>

          <v-list
            dense
            nav
          >
            <v-list-item
              v-for="item in items"
              :key="item.title"
            >
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
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
          { type:'', title: '', icon: '/icon/IoT.svg', color: 'indigo darken-1', globalRecent: true },
          { type:'deployment', title: 'Deployment', icon: '/icon/deployment.svg', color: 'indigo accent-4' },
          { type:'protocol', title: 'Protocol', icon: '/icon/protocol.svg', color: 'green accent-4' },
          { type:'memory', title: 'Memory', icon: '/icon/memory.svg', color: 'orange accent-4' },
          { type:'control', title: 'Control', icon: '/icon/control.svg', color: 'cyan accent-4' },
          { type:'illustration', title: 'Illustration', icon: '/icon/illustration.svg', color: 'purple accent-4' },
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
</style>