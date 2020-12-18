import Vue from "vue";
import store from "./store";
import App from "./App.vue";
import router from "./router";

import "./mock/mockServer";
import "./style/reset.css";
import "./style/iconfont.css";
import "./plugins/lazyload";
import "./plugins/element.js";
import "swiper/swiper-bundle.min.css";
Vue.config.productionTip = false;

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  router,
  store,
  render: h => h(App)
}).$mount("#app");
