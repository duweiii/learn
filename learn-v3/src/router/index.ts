import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    // return savedPosition;
    // return {
    //   top: 1000,
    // };
    if (to.hash) {
      // return {
      //   el: to.hash,
      //   behavior: "smooth",
      // };
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            el: to.hash,
            behavior: "smooth",
          });
        }, 2000);
      });
    }
  },
});

export default router;
