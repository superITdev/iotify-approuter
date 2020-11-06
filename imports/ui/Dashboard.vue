<template>
  <v-card height="100%" class="pa-5 grey darken-4" tile dark>
    <v-row style="height:30%;" dense no-gutters align="start">
      <v-list-item class="pa-0">
        <div class="indigo accent-4 pa-1 d-flex" style="border-radius:5px;">
          <svgicon icon="IoT" color="white" width="30" height="30"/>
        </div>
        <v-list-item-title class="ml-2">App Router</v-list-item-title>
        <v-spacer/>
        <v-btn small class="grey darken-3 text-none" to="/profile">
          <v-avatar v-if="!!meAvatar" size="20"><v-img :src="meAvatar" lazy-src="/img/favicon.ico"/></v-avatar>
          <v-icon v-else>mdi-account-outline</v-icon>
          <span class="ml-1">Profile</span>
        </v-btn>
        <v-btn small class="grey darken-3 text-none ml-2" @click.stop="onAuthenticate">
          <v-icon>{{!!authenticated ? 'mdi-logout' : 'mdi-login'}}</v-icon>
          <span class="ml-1">{{!!authenticated ? 'Log Out' : 'Log In'}}</span>
        </v-btn>
      </v-list-item>
    </v-row>
    <v-row style="height:70%;" dense no-gutters justify="center" align="center">
      <v-container style="max-width:50%" class="text-center">
        <div class="body-2 grey--text text--darken-1">Your projects</div>
        <div class="headline pa-3">Welcome back{{!!meTitle ? `, ${meTitle}!` : ''}}</div>
        <template v-if="!!authenticated">
          <div class="body-2 grey--text text--lighten-1">Select the project you want to work on or create a new one.</div>
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
        </template>
        <template v-else>
          <div class="body-2 grey--text text--lighten-1">Please log in at first.</div>
        </template>
      </v-container>
    </v-row>
  </v-card>
</template>

<script>
import { AUTH0 } from '/imports/auth0-config.js'
const auth0Lock = new Auth0Lock(
  AUTH0.CLIENT_ID,
  AUTH0.DOMAIN,
  {
    autoclose: true,
    auth: {
      responseType: 'token id_token',
      redirectUrl: AUTH0.CALLBACK
    },
    theme: {
      logo: "/img/favicon.ico",
      primaryColor: '#31324F'
    }
  }
);

export default {
  watch: {
    user(n, o) {
      if (!!n != !!o) {
        this.$store.commit("authenticated", !!n);
      }
    },
  },
  methods: {
    onAuthenticate() {
      if (this.authenticated) {
        Meteor.logout();
        // this.$router.push("/");
      } else {
        this.$nextTick(() => auth0Lock.show());
      }
    },
    onGoWorkPage() {
      this.$router.push('/work');
    },
  },
  mounted() {
    this.$nextTick(() => {
      auth0Lock.on('authenticated', (authResult) => {
        auth0Lock.getUserInfo(authResult.accessToken, (error, profile) => {
          if (!error) Meteor.login(profile);
        });
      });
    });
  },
}
</script>

<style>
.auth0-lock-badge-bottom {
  display: none;
}
.auth0-lock-name {
  display: none;
}
</style>