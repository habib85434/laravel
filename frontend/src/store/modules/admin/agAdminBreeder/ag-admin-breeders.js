import axios from "axios";

export default {
  namespaced: true,

  state: {
    panel_breeders: {},
    common_data: {},
    panel_breeder: null
  },

  getters: {
    getPannelBreeders(state) {
      return state.panel_breeders && state.panel_breeders;
    },
    getCommonData(state) {
      return state.common_data && state.common_data;
    },
    getBreederInfo(state) {
      return state.panel_breeder && state.panel_breeder;
    }
  },

  mutations: {
    SET_PANEL_BREEDERS(state, data) {
      state.panel_breeders = data;
    },
    SET_COMMON_DATA(state, data) {
      state.common_data = data;
    },
    SET_BREEDER_INFO(state, data) {
      state.panel_breeder = data;
    }
  },

  actions: {
    async getPanelBreederAction({ dispatch }, page = 1) {
      let response = await axios.get("admin/breeder?page=" + page);

      dispatch("commitPanelBreeders", response.data.data);
      return response;
    },

    async commitPanelBreeders({ commit }, panelBreeders) {
      if (panelBreeders) {
        commit("SET_PANEL_BREEDERS", panelBreeders);
      }
    },

    async getCommonDataAction({ dispatch }) {
      let response = await axios.get("common/tour-area");

      dispatch("commitCommonData", response.data.data);
      return response;
    },

    async commitCommonData({ commit }, commonData) {
      if (commonData) {
        //console.log(commonData);
        commit("SET_COMMON_DATA", commonData);
      }
    },

    async createBreeder(_, formData) {
      let response = axios.post("admin/breeder/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return response;
    },

    async getBreederInfoAction({ dispatch }, id) {
      let response = await axios.get("admin/breeder/" + id);

      dispatch("commitBreederInfo", response.data.data);
      return response;
    },

    async commitBreederInfo({ commit }, breederInfo) {
      if (breederInfo) {
        commit("SET_BREEDER_INFO", breederInfo);
      }
    },

    async updateBreeder(_, mydata) {
      let response = axios.post(
        "admin/breeder/" + mydata.id + "?_method=patch",
        mydata.formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      return response;
    },

    async getSearchListAction(_, data) {
      let response = axios.post("admin/breeder/search", data);
      return response;
    },

    async getBreederRegistrationRequestListAction(_, page = 1) {
      let response = await axios.get(
        "admin/breeder-registration-request?page=" + page
      );
      return response;
    },

    async updateRegistrationRequestAction(_, data) {

      let response = await axios.patch(
        "admin/breeder-registration-request/update/" + data.id,
        data
      );
      return response;
    },

    async csvDownloadAction() {
      let response = await axios.get("admin/export/breeders");
      return response;
    },

    async breederCsvImport(_, formData) {
      let response = axios.post("admin/import/breeders", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return response;
    },
  }
};
