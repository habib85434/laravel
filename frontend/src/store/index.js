import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth/auth";
import adminUser from "./modules/admin/agAdminUser/ag-admin-users";
import registration from "./modules/auth/ag-registration";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth
  },

  mutations: {
    //
  },

  actions: {
    //
  },

  modules: {
    auth,
    registration,
    adminUser
  }
});
