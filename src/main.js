import Vue from "vue";
import App from "./App.vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import x2js from 'x2js'

import router from "./routers";
import store from "./stores";

Vue.use(ElementUI)

Vue.prototype.$x2js = new x2js()
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
