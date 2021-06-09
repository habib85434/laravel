import axios from "axios";

export default {
  namespaced: true,

  state: {
    panel_deals: {},
    panel_deal: null
  },

  getters: {
    getDealSummaries(state) {
      return state.panel_deals && state.panel_deals;
    },
    getDealSummary(state) {
      return state.panel_deal && state.panel_deal;
    }
  },

  mutations: {
    SET_PANEL_DEALS(state, data) {
      state.panel_deals = data;
    },
    SET_DEAL(state, data) {
      state.panel_deal = data;
    }
  },

  actions: {
    async getDealSummariesAction({ dispatch }, page = 1) {
      let response = await axios.get(
        "admin/deal-summary?record=10&page=" + page
      );

      dispatch("commitDealSummaries", response.data.data);
      return response;
    },

    async commitDealSummaries({ commit }, panelDeals) {
      if (panelDeals) {
        commit("SET_PANEL_DEALS", panelDeals);
      }
    },

    async getDealSummaryAction({ dispatch }, id) {
      let response = await axios.get("admin/deal-summary/" + id);

      dispatch("commitdealSummary", response.data.data);
      return response;
    },

    async commitdealSummary({ commit }, deal) {
      if (deal) {
        commit("SET_DEAL", deal);
      }
    }
  }
};
