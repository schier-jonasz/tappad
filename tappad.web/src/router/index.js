// import Vue from "vue";
// import VueRouter from "vue-router";

// import Home from "../views/Home/Home.vue";
// import Metronome from "../views/Metronome/index.vue";
// import Warmup from "../views/Warmup/index.vue";
// import Rudiments from "../views/Warmup/index.vue";

// Vue.use(VueRouter);

// const routes = [
//   {
//     path: "/",
//     name: "Home",
//     component: Home,
//   },
//   {
//     path: "/metronome",
//     name: "Metronome",
//     component: Metronome
//   },
//   {
//     path: "/warmup",
//     name: "Warmup",
//     component: Warmup,
//   },
//   {
//     path: "/rudiments",
//     name: "Rudiments",
//     component: Rudiments,
//   },
//   {
//     path: "/rudiments/:name",
//     name: "Rudiment",
//     component: Warmup,
//   },
// ];

// const router = new VueRouter({
//   routes,
// });

// export default router;


import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home/router";
import Metronome from "../views/Metronome/router";
import Warmup from "../views/Warmup/router";
import Rudiments from "../views/Rudiments/router";
import SingleStrokeRoll from "../views/Rudiments/compontents/SingleStrokeRoll/router";
import SingleStrokeFour from "../views/Rudiments/compontents/SingleStrokeFour/router";
import DoubleStrokeRoll from "../views/Rudiments/compontents/DoubleStrokeRoll/router";
import TripleStrokeRoll from "../views/Rudiments/compontents/TripleStrokeRoll/router";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    Home,
    Metronome,
    Warmup,
    Rudiments,
    SingleStrokeRoll,
    SingleStrokeFour,
    DoubleStrokeRoll,
    TripleStrokeRoll
  ],
});

export default router;