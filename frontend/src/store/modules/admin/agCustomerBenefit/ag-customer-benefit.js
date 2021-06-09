import axios from "axios";

export default {
  namespaced: true,

  state: { customer_benefit_list: {} },

  getters: {
    getCustomerBenefitList(state) {
      return state.customer_benefit_list && state.customer_benefit_list;
    }
  },

  mutations: {
    SET_BENEFIT_LIST(state, data) {
      state.customer_benefit_list = data;
    }
  },

  actions: {
    async getCustomerBenefitListAction({ dispatch }, page = 1, record = 10) {
      let response = await axios.get(
        "admin/customer-benefit-application?page=" + page + "&record=" + record
      );

      dispatch("commitBenefitList", response.data.data.benefit_applications);
      return response;
    },

    async commitBenefitList({ commit }, benefitList) {
      if (benefitList) {
        commit("SET_BENEFIT_LIST", benefitList);
      }
    },

    async updateBenefitStatus(_, mydata) {
      let response = await axios.post(
        "admin/customer-benefit-application/update/" +
          mydata.id +
          "?_method=patch",
        mydata
      );
      return response;
    }
  }
};
