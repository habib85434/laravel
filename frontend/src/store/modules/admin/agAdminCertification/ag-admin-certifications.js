import axios from "axios";

export default {
  namespaced: true,

  state: {
    panel_certifications: {},
    panel_certification: null
  },

  getters: {
    getPannelCertifications(state) {
      return state.panel_certifications && state.panel_certifications;
    },
    getCertificationInfo(state) {
      return state.panel_certification && state.panel_certification;
    }
  },

  mutations: {
    SET_PANEL_CERTIFICATIONS(state, data) {
      state.panel_certifications = data;
    },
    SET_CERTIFICATION_INFO(state, data) {
      state.panel_certification = data;
    }
  },

  actions: {
    async getPanelCertificationsAction({ dispatch }, page = 1) {
      let response = await axios.get("admin/certification?page=" + page);

      dispatch("commitPanelCertifications", response.data.data);
      return response;
    },

    async commitPanelCertifications({ commit }, panelCertifications) {
      if (panelCertifications) {
        commit("SET_PANEL_CERTIFICATIONS", panelCertifications);
      }
    },

    async createCertification(_, formData) {
      let response = axios.post("admin/certification/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return response;
    },

    async getCertificationInfoAction({ dispatch }, id) {
      let response = await axios.get("admin/certification/show/" + id);

      dispatch("commitCertificationInfo", response.data.data);
      return response;
    },

    async commitCertificationInfo({ commit }, certificationInfo) {
      if (certificationInfo) {
        commit("SET_CERTIFICATION_INFO", certificationInfo);
      }
    },

    async updateCertification(_, mydata) {
      //console.log(mydata);
      let response = axios.post(
        "admin/certification/" + mydata.id + "?_method=patch",
        mydata.formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      return response;
    },

    async deleteCertificate(_, id) {
      let response = await axios.delete("admin/certification/" + id);
      return response;
    }
  }
};
