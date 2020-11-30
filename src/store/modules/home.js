import { reqGetBaseList, reqGetBanners } from "@api/home";

export default {
  state: {
    categoryList: [],
    banners: []
  },
  getters: {},
  actions: {
    async getBaseList({ commit }) {
      const categoryList = await reqGetBaseList();
      commit("GET_CATEGORY_LIST", categoryList);
    },
    async getBanners({ commit }) {
      const banners = await reqGetBanners();
      commit("GET_BANNERS", banners);
    }
  },
  mutations: {
    GET_CATEGORY_LIST(state, categoryList) {
      state.categoryList = categoryList;
    },
    GET_BANNERS(state, banners) {
      state.banners = banners;
    }
  }
};
