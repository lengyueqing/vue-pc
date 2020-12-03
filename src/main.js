import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./mock/mockServer";
import "./style/reset.css";
import "./style/iconfont.css";
import "./plugins/element.js";
Vue.config.productionTip = false;

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  router,
  store,
  render: h => h(App)
}).$mount("#app");
