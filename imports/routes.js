// import PageNotFound from '/imports/ui/PageNotFound.vue';
import Dashboard from '/imports/ui/Dashboard.vue'
import MainWork from '/imports/ui/MainWork.vue'

export default [
  {
    path: '*',
    // component: PageNotFound,
    redirect: '/',
    meta: { public: true }
  },
  {
    path:"/",
    name:"Dashboard",
    component: Dashboard,
    meta: { public: true },
  },
  {
    path:"/work",
    name:"MainWork",
    component: MainWork,
    meta: { public: false },
  },
];