import axios from "axios";

export default {
  namespaced: true,

  state: {
    panel_users: {},
    panel_user: null
  },

  getters: {
    getPannelUsers(state) {
      return state.panel_users && state.panel_users;
    },
    getUserInfo(state) {
      return state.panel_user && state.panel_user;
    }
  },

  mutations: {
    SET_PANEL_USERS(state, data) {
      state.panel_users = data;
    },
    SET_USER_INFO(state, data) {
      state.panel_user = data;
    }
  },

  actions: {
    async getPanelUserAction({ dispatch }, page) {
      let response = await axios.get('admin/admin-user?record=10&page=' + page);

        
      dispatch('commitPanelUsers', response.data.data);

      return response;
    },

    async commitPanelUsers({ commit }, panelUsers) {
      if (panelUsers) {
        commit("SET_PANEL_USERS", panelUsers);
      }
    },

    async createUser(_, userData) {
      let response = await axios.post("admin/admin-user/create", userData);
      return response;
      //console.log(response.data);
    },

    async getUserInfoAction({ dispatch }, id) {
      let response = await axios.get("admin/admin-user/" + id);
      dispatch("commitUserInfo", response.data.data);
      return response;
    },

    async commitUserInfo({ commit }, userInfo) {
      if (userInfo) {
        commit("SET_USER_INFO", userInfo);
      }
    },

    async updateUser(_, userData) {
      let response = await axios.put(
        "admin/admin-user/" + userData.id,
        userData
      );
      return response;
      //console.log(response.data);
    },

    async deleteUser(_, id) {
      let response = await axios.delete("admin/admin-user/" + id);
      return response;
      //console.log(response.data);
    },

    async getSearchListAction(_, data) {
      let response = await axios.post("admin/admin-user/search", data);
      return response;
      //console.log(response.data);
    }
  }
};
