import { reqGetCartList, reqUpdateCartCount, reqUpdateCartCheck, reqDelCart } from "@api/shopcart";

export default {
  state: {
    cartList: [] //所有购物车数据
  },
  getters: {},
  actions: {
    async getCartList({ commit }) {
      const cartList = await reqGetCartList();
      commit("GIT_CART_LIST", cartList);
    },
    async updateCartCount({ commit }, { skuId, skuNum }) {
      await reqUpdateCartCount(skuId, skuNum);
      //手动更新vuex数据 页面就好重新渲染
      commit("UPDATE_CART_COUNT", { skuId, skuNum });
    },
    async updateCartCheck({ commit }, { skuId, isChecked }) {
      await reqUpdateCartCheck(skuId, isChecked);
      //手动更新vuex数据 页面就好重新渲染
      commit("UPDATAE_CART_CHECK", { skuId, isChecked });
    },
    async delCart({ commit }, skuId) {
      await reqDelCart(skuId);
      commit("DEL_CART", skuId);
    }
  },
  mutations: {
    GIT_CART_LIST(state, cartList) {
      state.cartList = cartList;
    },
    UPDATE_CART_COUNT(state, { skuId, skuNum }) {
      state.cartList = state.cartList.map(cart => {
        if (cart.skuId === skuId) {
          cart.skuNum += skuNum;
        }
        return cart;
      });
    },
    DEL_CART(state, skuId) {
      state.cartList.filter(cart => cart.skuId !== skuId);
    },
    UPDATAE_CART_CHECK(state, { skuId, isChecked }) {
      state.cartList = state.cartList.map(cart => {
        if (cart.skuId === skuId) {
          cart.isChecked = isChecked;
        }
        return cart;
      });
    }
  }
};
