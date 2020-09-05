import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import(/* webpackChunkName: "app" */ "./views/app"),
    redirect: "app/blank-page",
    children: [
      {
        path: "app/blank-page",
        component: () =>
          import(/* webpackChunkName: "blank-page" */ "./views/app/blank-page")
      },
      {
        path: "app/logger-page",
        component: () =>
          import(/* webpackChunkName: "blank-page" */ "./views/app/logger-page")
      }
    ]
  }
];

const router = new VueRouter({
  linkActiveClass: "active",
  routes,
  mode: "history"
});

export default router;
