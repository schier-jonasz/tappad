import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home/Home.vue";
import Metronome from "../views/Metronome/index.vue";
import Warmup from "../views/Warmup/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/metronome",
    name: "Metronome",
    component: Metronome
  },
  {
    path: "/warmup",
    name: "Warmup",
    component: Warmup,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
