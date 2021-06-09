import axios from "axios";

export default {
  namespaced: true,

  state: {
    panel_customers: {},
    panel_customer: null
  },

  getters: {
    getPannelCustomers(state) {
      return state.panel_customers && state.panel_customers;
    },
    getUserInfo(state) {
      return state.panel_customer && state.panel_customer;
    }
  },

  mutations: {
    SET_PANEL_CUSTOMERS(state, data) {
      state.panel_customers = data;
    },
    SET_CUSTOMER_INFO(state, data) {
      state.panel_customer = data;
    }
  },

  actions: {
    async getPanelCustomerAction({ dispatch }, page = 1) {
      let response = await axios.get("admin/customer?page=" + page);

      dispatch("commitPanelCustomers", response.data.data);
      return response;
    },

    async commitPanelCustomers({ commit }, panelCustomers) {
      if (panelCustomers) {
        commit("SET_PANEL_CUSTOMERS", panelCustomers);
      }
    },

    async createCustomer(_, formData) {
      let response = axios.post("admin/customer/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return response;
    },

    async searchCustomer(_, searchData) {
      let response = await axios.post("admin/customer/search", searchData);
      return response;
    },

    async getCustomerInfoAction({ dispatch }, id) {
      let response = await axios.get("admin/customer/" + id);

      dispatch("commitCustomerInfo", response.data.data);
      return response;
    },

    async commitCustomerInfo({ commit }, customerInfo) {
      if (customerInfo) {
        commit("SET_CUSTOMER_INFO", customerInfo);
      }
    },
    async updateCustomer(_,customerData) {
      let response = await axios.post('admin/customer/'+customerData.id+'?_method=patch', customerData);
      return response;
    },
    
  }
};
