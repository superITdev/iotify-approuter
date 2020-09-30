import Vue from 'vue'
import App from './App'

// BootstrapVue add
import BootstrapVue from 'bootstrap-vue'
// Router & Store add
import router from './router'
import store from './store'
// Multi Language Add
import en from './locales/en.json'
import es from './locales/es.json'
import VueI18n from 'vue-i18n'
import { defaultLocale, localeOptions, firebaseConfig } from './constants/config'
// Notification Component Add
import Notifications from './components/Common/Notification'
// Breadcrumb Component Add
import Breadcrumb from './components/Common/Breadcrumb'
// Colxx Component Add
import Colxx from './components/Common/Colxx'
// Perfect Scrollbar Add
import vuePerfectScrollbar from 'vue-perfect-scrollbar'
import contentmenu from 'v-contextmenu'
import VueLineClamp from 'vue-line-clamp'
import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'
import codemirror from 'vue-codemirror'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/lib/codemirror.css'
import VueScrollTo from 'vue-scrollto'
import firebase from 'firebase/app'
import 'firebase/auth'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import VueZoomer from 'vue-zoomer';

// jsplumb
// import 'jsplumb/dist/js/jsplumb.min.js';
// import 'jsplumb/css/jsplumbtoolkit-defaults.css';

//jquery ui
import 'jquery-ui-dist/jquery-ui'

// import Vuelidate from 'vuelidate'
// Vue.use(Vuelidate);


Vue.use(BootstrapVue);
Vue.use(VueI18n);
Vue.use(ElementUI);

const messages = { en: en, es: es };
const locale = (localStorage.getItem('currentLanguage') && localeOptions.filter(x => x.id === localStorage.getItem('currentLanguage')).length > 0) ? localStorage.getItem('currentLanguage') : defaultLocale;
const i18n = new VueI18n({
  locale: locale,
  fallbackLocale: 'en',
  messages
});

Vue.use(Notifications);
Vue.component('piaf-breadcrumb', Breadcrumb);
Vue.component('b-colxx', Colxx);
Vue.component('vue-perfect-scrollbar', vuePerfectScrollbar);
Vue.use(require('vue-shortkey'));
Vue.use(contentmenu);
Vue.use(codemirror);
Vue.use(VueZoomer);
Vue.use(VueLineClamp, {
  importCss: true
})
Vue.use(VCalendar, {
  firstDayOfWeek: 2, // ...other defaults,
  formats: {
    title: 'MMM YY',
    weekdays: 'WW',
    navMonths: 'MMMM',
    input: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD'],
    dayPopover: 'L'
  },
  datePickerShowDayPopover: false,
  popoverExpanded: true,
  popoverDirection: 'bottom'
});
Vue.use(VueScrollTo);

firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

// jsplumb-toolkit
import { JsPlumbToolkitVue2Plugin } from 'jsplumbtoolkit-vue2';

require('@/assets/jspcss/jsplumbtoolkit.css');
require('@/assets/jspcss/jsplumbtoolkit-demo-support.css');
require('@/assets/jspcss/jsplumbtoolkit-editable-connectors.css');
require('@/assets/jspcss/jspapp.css');

Vue.use(JsPlumbToolkitVue2Plugin);
//
export default new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')