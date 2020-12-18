import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

/* import Home from "../views/Home";
import Login from "../views/Login";
import Register from "../views/Register";
import Search from "../views/Search";
import Detail from "../views/Detail";
import AddCartSuccess from "../views/AddCartSuccess";
import ShopCart from "../views/ShopCart";
import Trade from "../views/Trade";
import Pay from "../views/Pay";
import PaySuccess from "../views/PaySuccess";
import Center from "../views/Center"; */
const Home = () => import(/* webpackChunkName: "Home" */ "../views/Home");
const Login = () => import(/* webpackChunkName: "Login" */ "../views/Login");
const Register = () => import(/* webpackChunkName: "Register" */ "../views/Register");
const Search = () => import(/* webpackChunkName: "Search" */ "../views/Search");
const Detail = () => import(/* webpackChunkName: "Detail" */ "../views/Detail");
const AddCartSuccess = () => import(/* webpackChunkName: "AddCartSuccess" */ "../views/AddCartSuccess");
const ShopCart = () => import(/* webpackChunkName: "ShopCart" */ "../views/ShopCart");
const Trade = () => import(/* webpackChunkName: "Trade" */ "../views/Trade");
const Pay = () => import(/* webpackChunkName: "Pay" */ "../views/Pay");
const PaySuccess = () => import(/* webpackChunkName: "PaySuccess" */ "../views/PaySuccess");
const Center = () => import(/* webpackChunkName: "Center" */ "../views/Center");

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

const router = new VueRouter({
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
    },
    {
      name: "detail",
      path: "/detail/:id",
      component: Detail
    },
    {
      name: "addcartsuccess",
      path: "/addcartsuccess",
      component: AddCartSuccess
    },
    {
      name: "shopcart",
      path: "/shopcart",
      component: ShopCart
    },
    {
      // 命名路由
      name: "trade",
      path: "/trade",
      component: Trade
    },
    {
      // 命名路由
      name: "pay",
      path: "/pay",
      component: Pay
    },
    {
      // 命名路由
      name: "paysuccess",
      path: "/paysuccess",
      component: PaySuccess
    },
    {
      // 命名路由
      name: "center",
      path: "/center/myorder",
      component: Center
    }
  ],
  //每次切换路由，页面都在顶部
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});
//路由守卫
const permissionPaths = ["/trade", "/pay", "/center"];
router.beforeEach((to, from, next) => {
  if (permissionPaths.indexOf(to.path) > -1 && !store.state.user.token) {
    return next("/login");
  }
  return next();
});

export default router;
