import Home from '/imports/ui_/home/Home.vue'
import Profile from '/imports/ui_/profile/Profile.vue'
import About from '/imports/ui_/about/About.vue'
import SetAuth0 from '/imports/ui_/SetAuth0.vue'
import PageNotFound from '/imports/ui_/PageNotFound.vue';

export default [
 {
   path:"/",
   name:"home",
   meta: { public: true },
   component: Home
 },
 {
   path:"/profile",
   name:"profile",
   meta: { public: false },
   component: Profile
 },
 {
   path:"/about",
   name:"about",
   meta: { public: true },
   component: About
 },
 {
   path:"/setauth0",
   name:"setauth0",
   meta: { public: true },
   component: SetAuth0
 },
 {
   path: '*',
   component: PageNotFound,
   meta: { public: true }
 }
];
