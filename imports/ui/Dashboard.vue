<template>
  <v-card height="100%" class="pa-5 grey darken-4" tile dark>
    <v-row style="height:30%;" dense no-gutters align="start">
      <v-list-item class="pa-0">
        <div class="indigo accent-4 pa-1 d-flex" style="border-radius:5px;">
          <svgicon icon="IoT" color="white" width="30" height="30"/>
        </div>
        <v-list-item-title class="ml-2">App Router</v-list-item-title>
        <v-spacer/>
        <v-btn small class="grey darken-3 text-none"><v-icon>mdi-account-outline</v-icon><span class="ml-1">Profile</span></v-btn>
        <v-btn small class="grey darken-3 text-none ml-2"><v-icon>mdi-logout</v-icon><span class="ml-1">Log Out</span></v-btn>
      </v-list-item>
    </v-row>
    <v-row style="height:70%;" dense no-gutters justify="center" align="center">
      <v-container style="max-width:50%" class="text-center">
        <div class="body-2 grey--text text--darken-1">Your projects</div>
        <div class="headline pa-3">Welcome back, Akash!</div>
        <div class="body-2 grey--text text--lighten-1">Select the project you want to work on or</div>
        <div class="body-2 grey--text text--lighten-1">create a new one.</div>
        <v-row class="mt-15" no-gutters dense justify="space-around">
          <v-col>
            <v-btn color="blue darken-3 headline" fab depressed @click="onGoWorkPage">T</v-btn>
            <div class="body-2 grey--text text--darken-1">Test2</div>
          </v-col>
          <v-col>
            <v-btn color="blue darken-3 headline" fab depressed @click="onGoWorkPage">T</v-btn>
            <div class="body-2 grey--text text--darken-1">Test</div>
          </v-col>
          <v-col>
            <v-btn color="blue darken-3 headline" fab depressed @click="onGoWorkPage"><v-icon>mdi-fire</v-icon></v-btn>
            <div class="body-2 grey--text text--darken-1">Templates</div>
          </v-col>
          <v-col>
            <v-btn color="blue darken-3 headline" fab depressed @click="onGoWorkPage">+</v-btn>
            <div class="body-2 grey--text text--darken-1">Add Project</div>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
  </v-card>
</template>

<script>
export default {
  methods: {
    onGoWorkPage() {
      this.$router.push('/work');
    },
  }
}
</script>

<style scoped>
</style>