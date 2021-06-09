import axios from "axios";

export default {
  namespaced: true,

  state: {
    payment_methods: {},
    payment_method: null
  },

  getters: {
    getPaymentMethod(state) {
      return state.payment_methods && state.payment_methods;
    },
    getPaymentMethodInfo(state) {
      return state.payment_method && state.payment_method;
    }
  },

  mutations: {
    SET_PAYMENT_METHOD(state, data) {
      state.payment_methods = data;
    },
    SET_PAYMENT_METHOD_INFO(state, data) {
      state.payment_method = data;
    }
  },

  actions: {
    async getPaymentMethodsAction({ dispatch }, page = 1, record = 10) {
      let response = await axios.get(
        "admin/payment-method?page=" + page + "&record=" + record
      );

      dispatch("commitPaymentMethods", response.data.data);
      return response;
    },

    async commitPaymentMethods({ commit }, paymentMethods) {
      if (paymentMethods) {
        commit("SET_PAYMENT_METHOD", paymentMethods);
      }
    },

    async createPaymentMethod(_, catData) {
      let response = await axios.post("admin/payment-method/create", catData);
      return response;
    },

    async getPaymentMethodInfoAction({ dispatch }, id) {
      let response = await axios.get("admin/payment-method/" + id);

      dispatch("commitPaymentMethodInfo", response.data.data);
      //console.log(dispatch)
      return response;
    },

    async commitPaymentMethodInfo({ commit }, pmInfo) {
      if (pmInfo) {
        commit("SET_PAYMENT_METHOD_INFO", pmInfo);
      }
    },

    async paymentMethodUpdate(_, catData) {
      let response = await axios.patch(
        "admin/payment-method/" + catData.id,
        catData
      );
      return response;
    },

    async deletePaymentMethod(_, id) {
      let response = await axios.delete("admin/payment-method/" + id);
      return response;
    }
  }
};
