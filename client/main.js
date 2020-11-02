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

// alive_legacy
// import App from '/imports/_legacy/ui/App.vue';
// import routes from "/imports/_legacy/routes";
import App from '/imports/ui/App.vue';
import routes from "/imports/routes";

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes, // short for `routes: routes`
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});
const checkAuth = function(){
  return !!localStorage.getItem("Meteor.loginToken") && !!localStorage.getItem("Meteor.userId")
}
router.beforeResolve(function(to, from, next) {
  // app icon
  const link = document.querySelector("[rel='icon']")
  link.setAttribute('href', '/img/favicon.ico');

  if (to.matched.some( function(record) { return !record.meta.public })) {
    if (!router.app.authenticated && !checkAuth()) {
      next({path:"/"});
      return;
    }
  }
  next();
});

// alive_legacy
// import store from '/imports/_legacy/store';
// import login from '/imports/_legacy/methods/login'
// import globalMixin from '/imports/_legacy/methods/global'
// Vue.mixin(globalMixin);
// Meteor.login = login;
import store from '/imports/store';

Meteor.startup(() => {
  new Vue({
    vuetify,
    router,
    store,
    render: h => h(App),
  }).$mount('app');
});
