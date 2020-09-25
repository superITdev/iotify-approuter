import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/app",
    component: () => import(/* webpackChunkName: "app" */ "./views/app"),
    redirect: "app/blank-page",
    children: [
      {
        path: "blank-page",
        name: "worker",
        component: () =>
          import(/* webpackChunkName: "blank-page" */ "./views/app/blank-page")
      },
      {
        path: "logger-page",
        component: () =>
          import(/* webpackChunkName: "logger-page" */ "./views/app/logger-page")
      },
      {
        path: "code-page",
        component: () =>
          import(/* webpackChunkName: "code-page" */ "./views/app/code-page")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "Login" */ "./views/auth/Login"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import(/* webpackChunkName: "Register" */ "./views/auth/Register"),
  },
  {
    path: "/",
    redirect: "/login"
  },
];

const router = new VueRouter({
  linkActiveClass: "active",
  routes,
  mode: "history"
});

export default router;
