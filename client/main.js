// Libs
import { Meteor } from 'meteor/meteor';
import Vue from 'vue';

// Vuetify Lib
import vuetify from '/imports/plugins/vuetify' // path to vuetify export

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueTracker from 'vue-meteor-tracker';
Vue.use(VueTracker);

import VueMeta from 'vue-meta';
Vue.use(VueMeta)

import Vuex from 'vuex'
Vue.use(Vuex)

// vue perfect scrollbar
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
Vue.use(PerfectScrollbar)

import VueSVGIcon from 'vue-svgicon';
Vue.use(VueSVGIcon);
// load all compiled svg-js icons.
import '/svgicon/icon/index.js';
import '/svgicon/icon/deployment/index.js';
import '/svgicon/icon/protocol/index.js';
import '/svgicon/icon/database/index.js';
import '/svgicon/icon/function/index.js';
import '/svgicon/icon/staticAsset/index.js';

// jsplumb-toolkit
import { JsPlumbToolkitVue2Plugin } from 'jsplumbtoolkit-vue2';

require('/imports/jsplumb/css/jsplumbtoolkit.css');
require('/imports/jsplumb/css/jsplumbtoolkit-demo-support.css');
require('/imports/jsplumb/css/jsplumbtoolkit-editable-connectors.css');
require('/imports/jsplumb/css/jspapp.css');

Vue.use(JsPlumbToolkitVue2Plugin);

import App from '/imports/ui/App.vue';
import routes from "/imports/routes.js";

import store from '/imports/store'

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes, // short for `routes: routes`
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});
router.beforeResolve((to, from, next) => {
  // app icon
  const link = document.querySelector("[rel='icon']")
  link.setAttribute('href', '/img/favicon.ico');

  if (to.matched.some(record => !record.meta.public)) {
    if (!router.app.authenticated) {
      const checkAuth = !!localStorage.getItem("Meteor.loginToken") && !!localStorage.getItem("Meteor.userId");
      if (!checkAuth) {
        next({path:"/"});
        return;
      }
    }
  }
  next();
});

import login from '/imports/methods/login.js'
Meteor.login = login;
import GlobalVue from '/imports/methods/GlobalVue.js'
Vue.mixin(GlobalVue);

Meteor.startup(() => {
  new Vue({
    vuetify,
    router,
    store,
    render: h => h(App),
  }).$mount('app');
});
