// Dependencies
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      // route level code-splitting
      // this generate a separate chunk ([route-name].[hash].js) for this route
      // which is lazy-loaded when the route is visited
      component: () => import("@/views/Home")
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generate a separate chunk ([route-name].[hash].js) for this route
      // which is lazy-loaded when the route is visited
      component: () => import("@/views/About")
    },
    {
      path: "*",
      name: "error",
      // route level code-splitting
      // this generate a separate chunk ([route-name].[hash].js) for this route
      // which is lazy-loaded when the route is visited
      component: () => import("@/views/Error")
    }
  ]
});
