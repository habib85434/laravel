import axios from "axios";

export default {
  namespaced: true,

  state: {
    pages: {},
    page: null
  },

  getters: {
    getPages(state) {
      return state.pages && state.pages;
    },
    getPage(state) {
      return state.page && state.page;
    }
  },

  mutations: {
      SET_PAGES(state, data) {
      state.pages = data;
    },
    SET_PAGE(state, data) {
      state.page = data;
    }
  },

  actions: {
    async getPagesAction({ dispatch }) {
      let response = await axios.get(
        "admin/content");

      dispatch("commitPages", response.data.data);
      return response;
    },

    async commitPages({ commit }, pages) {
      if (pages) {
        commit("SET_PAGES", pages);
      }
    },

    async createPage(_,formData) {
      let response = await axios.post('admin/content/create', formData);
      return response;
    },


    async getPageAction({ dispatch }, id) {
      let response = await axios.get("admin/content/" + id);

      dispatch("commitPage", response.data.data);
      //console.log(dispatch)
      return response;
    },

    async commitPage({ commit }, data) {
      if (data) {
        commit("SET_PAGE", data);
      }
    },

    async updatePage(_, mydata) {
      let response = await axios.post('admin/content/'+mydata.id+'?_method=patch', mydata);
      return response;
    },

  }
};
