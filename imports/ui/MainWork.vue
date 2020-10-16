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
      color="rgba(61, 99, 244, 0.5)"
      mini-variant
      mini-variant-width="100"
      class="lighten-1"
    >
      <v-row
        v-for="n in 6" :key="n"
        no-gutters justify="center"
        :class="(n==1 ? 'pt-4 pb-2' : 'py-2')"
      >
        <v-col cols="auto">
          <v-avatar tile size="50">
            <v-img src="/icon/IoT.svg"></v-img>
          </v-avatar>
        </v-col>
        <v-responsive width="100%"></v-responsive>
        <v-col cols="auto">
          <v-card-title class="pa-0 white--text" style="font-size:12px">Deployment</v-card-title>
        </v-col>
      </v-row>
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
        items: [
          { title: 'Home', icon: 'mdi-view-dashboard' },
          { title: 'About', icon: 'mdi-forum' },
        ],
        links: ['Home', 'Contacts', 'Settings'],
      }
    },
  }
</script>