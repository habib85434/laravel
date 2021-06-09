import axios from "axios";

export default {
  namespaced: true,

  state: {
    requestd_information: null
  },

  getters: {
    getRequestedInfo(state) {
      return state.requestd_information && state.requestd_information;
    }
  },

  mutations: {
    SET_REQUESTED_INFORMATION(state, data) {
      state.requestd_information = data;
    }
  },

  actions: {
    async getRequestedInfoAction({ dispatch }, email) {
      let response = await axios.get(
        "common/breeder-registration-request/" + email
      );
      dispatch("commitRequestedInfo", response.data.data);
      return response;
    },

    async commitRequestedInfo({ commit }, data) {
      if (data) {
        commit("SET_REQUESTED_INFORMATION", data);
      }
    },

    async createBreederAction(_, formData) {
      let response = axios.post("auth/registration/breeder/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return response;
    },
    async createCustomerAction(_, formData) {
      let response = axios.post("auth/registration/customer/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return response;
    },
    async getRequestedCustomerInfoAction(_, email) {
      let response = await axios.get("auth/registration/process-info/" + email);
      return response;
    }
  }
};
