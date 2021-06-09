import axios from 'axios';

export default {
  namespaced: true,

  state: {
    panel_categories: {},
    panel_category: null,
  },

  getters: {
    getPannelCategories(state) {
      return state.panel_categories && state.panel_categories;
    },
    getUserInfo(state) {
      return state.panel_category && state.panel_category;
    },
  },

  mutations: {
    SET_PANEL_CATEGORIES(state, data) {
      state.panel_categories = data;
    },
    SET_CATEGORY_INFO(state, data) {
      state.panel_category = data;
    },
  },

  actions: {
    async getPanelCategoryAction({ dispatch }) {
      let response = await axios.get('admin/category');
        
      dispatch('commitPanelCategories', response.data.data);
      return response;
    },

    async commitPanelCategories({ commit}, panelCategories) {
      if (panelCategories) {
        commit('SET_PANEL_CATEGORIES', panelCategories);
      }
    },

    async createCategory(_,catData) {
        let response = await axios.post('admin/category/create', catData);
        return response;
        //console.log(response.data);
    },
    
    async getCategoryInfoAction({ dispatch }, id) {
        let response = await axios.get('admin/category/'+id);
        
        dispatch('commitCategoryInfo', response.data.data);
        return response;
    },
  
    async commitCategoryInfo({ commit}, categoryInfo) {
        if (categoryInfo) {
          commit('SET_CATEGORY_INFO', categoryInfo);
        }
    },

    async updateCategory(_,catData) {
      let response = await axios.put('admin/category/'+catData.id, catData);
      return response;
      //console.log(response.data);
    },

    async deleteCategory(_,id) {
      let response = await axios.delete('admin/category/'+id);
      return response;
      //console.log(response.data);
    },
  },
};
