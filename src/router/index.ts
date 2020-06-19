import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import Home from '@/views/Home.vue';
import MoreGreetings from '@/views/MoreGreetings.vue';

Vue.use(VueRouter);

export const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/more-greetings/:name',
    name: 'MoreGreetings',
    component: MoreGreetings,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
