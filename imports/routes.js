import PageNotFound from '/imports/ui/PageNotFound.vue';
import MainWork from '/imports/ui/MainWork.vue'

export default [
  {
    path: '*',
    component: PageNotFound,
    meta: { public: true }
  },
  {
   path:"/",
   name:"MainWork",
   component: MainWork,
   meta: { public: true },
 },
];