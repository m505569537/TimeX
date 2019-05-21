import Vue from "vue";
import Router from "vue-router";

import login from './login'
import register from './register'
import home from './home'

Vue.use(Router);

export default new Router({
  routes: [
    login,
    register,
    home,
    { path:'/', redirect: '/login' }
  ]
});
