import axios from "axios";

export default {
  namespaced: true,

  state: {
    token: null,
    user: null,
    loggedData: null
  },

  getters: {
    authenticated(state) {
      return state.token && state.user;
    },
    user(state) {
      return state.user;
    },
    loggedInData(state) {
      return state.loggedData;
    }
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER_DATA(state, data) {
      state.loggedData = data;
    },

    SET_USER(state, user) {
      state.user = user;
    }
  },

  actions: {
    async signIn({ dispatch }, cradentials) {
      let response = await axios.post("auth/login", cradentials);

      if (response.data.success) {
        dispatch("attempt", response.data.data.token);
      }
      return response;
    },

    async attempt({ commit, state }, token) {
      if (token) {
        commit("SET_TOKEN", token);
      }

      if (!state.token) {
        return;
      }

      try {
        let response = await axios.post("auth/user/get");

        commit("SET_USER", response.data.user);
        commit("SET_USER_DATA", response.data);
      } catch (e) {
        commit("SET_TOKEN", null);
        commit("SET_USER", null);
      }
    },

    async resetPasswordAction(_, catData) {
      let response = await axios.patch("auth/rest-password", catData);
      return response;
    },

    async forgetPasswordEmailAction(_, data) {
      let response = await axios.post(
        "auth/forget-password/email-confirm",
        data
      );
      return response;
    },

    async forgetPasswordAction(_, catData) {
      let response = await axios.patch(
        "auth/forget-password?_method=patch",
        catData
      );
      return response;
    },

    async logout({ commit }) {
      let response = await axios.post("auth/logout");
      commit("SET_USER", null);
      commit("SET_USER_DATA", null);
      commit("SET_TOKEN", null);
      localStorage.removeItem("token");
      return response;
    },
    async ForgetPasswordUserInfo(_, token) {
      let response = await axios.get("auth/forget-password/user/" + token);
      return response;
    }
  }
};
