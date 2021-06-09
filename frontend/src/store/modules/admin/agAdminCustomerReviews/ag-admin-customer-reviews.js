import axios from "axios";

export default {
  namespaced: true,

  state: {
    panel_announcements: {}
  },

  getters: {
    getPannelCustomerReviews(state) {
      return state.panel_announcements && state.panel_announcements;
    }
  },

  mutations: {
    SET_PANEL_CUSTOMER_REVIEWS(state, data) {
      state.panel_customer_reviews = data;
    }
  },

  actions: {
    async getPanelCustomerReviewsAction({ dispatch }, page = 1) {
      let response = await axios.get("admin/review?record=10&page=" + page);

      dispatch("commitPanelCustomerReviews", response.data.data);
      return response;
    },

    async commitPanelCustomerReviews({ commit }, panelCustomerReviews) {
      if (panelCustomerReviews) {
        commit("SET_PANEL_CUSTOMER_REVIEWS", panelCustomerReviews);
      }
    },

    async updateCustomerReview(_, data) {
      let response = await axios.patch("admin/review/" + data.id, data);
      return response;
    },

    async customerVoiceCreate(_, data) {
      let response = await axios.post("admin/customer-voice/create", data);
      return response;
    },
    async customerVoiceDelete(_, data) {
      let response = await axios.delete("admin/customer-voice/" + data);
      return response;
    }
  }
};
