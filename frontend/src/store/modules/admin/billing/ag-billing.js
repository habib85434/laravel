import axios from "axios";

export default {
  namespaced: true,

  state: {
    billing_list: {},
    bill: null
  },

  getters: {
    getBillingList(state) {
      return state.billing_list && state.billing_list;
    },
    getBill(state) {
      return state.bill && state.bill.bill;
    }
  },

  mutations: {
    SET_BILLING_LIST(state, data) {
      state.billing_list = data;
    },
    SET_BILLING(state, data) {
      state.bill = data;
    }
  },

  actions: {
    async getBillingListAction({ dispatch }, page = 1, record = 10) {
      let response = await axios.get(
        "admin/bill?page=" + page + "&record=" + record
      );

      dispatch("commitBillingList", response.data.data);
      return response;
    },

    async commitBillingList({ commit }, billingLists) {
      if (billingLists) {
        commit("SET_BILLING_LIST", billingLists);
      }
    },

    async getBillingAction({ dispatch }, id) {
      let response = await axios.get("admin/bill/" + id);

      dispatch("commitBilling", response.data.data);
      return response;
    },

    async commitBilling({ commit }, bill) {
      if (bill) {
        commit("SET_BILLING", bill);
      }
    },

    async billStatusUpdateAction(_, data) {
      let response = await axios.patch("admin/bill/" + data.id, data);
      return response;
    },

    //BREEDER
    async getBreederBillingListAction({ dispatch }, id) {
      let page = 1,
        record = 10;
      let response = await axios.get(
        "breeder/bill/" + id + "?page=" + page + "&record=" + record
      );

      dispatch("commitBillingList", response.data.data);
      return response;
    },

    async getBreederBillingAction({ dispatch }, id) {
      let response = await axios.get("breeder/bill/show/" + id);

      dispatch("commitBreederBilling", response.data.data);
      return response;
    },

    async commitBreederBilling({ commit }, bill) {
      if (bill) {
        commit("SET_BILLING", bill);
      }
    },

    async getPanelBreederAction(_, data) {
      let response = await axios.get(
        "admin/breeder?page=" + data.page + "&record=" + data.record
      );
      return response;
    },

    async getBillSearchList(_, data) {
      let response = await axios.post(
        "admin/bill/search?page=" +
          data.filteredPage +
          "&record=" +
          data.filteredRecord,
        data
      );
      return response;
    }
  }
};
