import Home from '/imports/_legacy/ui/view/Home.vue'
import Profile from '/imports/_legacy/ui/view/Profile.vue'
import About from '/imports/_legacy/ui/view/About.vue'
import SetAuth0 from '/imports/_legacy/ui/view/SetAuth0.vue'
import PageNotFound from '/imports/ui/PageNotFound.vue'

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
