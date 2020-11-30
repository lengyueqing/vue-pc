import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home";
import Login from "../views/Login";
import Register from "../views/Register";
import Search from "../views/Search";

Vue.use(VueRouter);
//重写push和replace
//解决编程式导航重复点击报错问题
const push = VueRouter.prototype.push;
const replace = VueRouter.prototype.replace;

VueRouter.prototype.push = function(location, onComplete, onAbort) {
  if (onComplete && onAbort) {
    return push.call(this, location, onComplete, onAbort);
  }
  return push.call(this, location, onComplete, () => {});
};
VueRouter.prototype.replace = function(location, onComplete, onAbort) {
  if (onComplete && onAbort) {
    return replace.call(this, location, onComplete, onAbort);
  }
  return replace.call(this, location, onComplete, () => {});
};

export default new VueRouter({
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: "/login",
      component: Login,
      meta: {
        isFooter: true
      }
    },
    {
      path: "/register",
      component: Register,
      meta: {
        isFooter: true
      }
    },
    {
      name: "search",
      path: "/search/:searName?",
      component: Search
    }
  ]
});
