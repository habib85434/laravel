import axios from "axios";

export default {
  namespaced: true,

  state: {
    tour_areas: {}
  },

  getters: {
    getTourAreas(state) {
      return state.tour_areas && state.tour_areas;
    }
  },

  mutations: {
    SET_TOUR_AREAS(state, data) {
      state.tour_areas = data;
    }
  },

  actions: {
    async getTourAreassAction({ dispatch }) {
      let response = await axios.get("common/tour-area");

      //   console.log(response.data.data)

      dispatch("commitTourAreas", response.data.data);
      return response;
    },

    async commitTourAreas({ commit }, data) {
      if (data) {
        commit("SET_TOUR_AREAS", data);
      }
    },

    async applyBreederRegistration(_, data) {
      let response = await axios.post(
        "auth/registration/breeder/confirm-email",
        data
      );
      return response;
    },

    async applyCustomerRegistration(_, data) {
      let response = await axios.post(
        "auth/registration/customer/confirm-email",
        data
      );
      return response;
    },

    async breederInquiryToAgrat(_, data) {
      let response = await axios.post("breeder/inquiry", data);
      return response;
    },

    async getPetType() {
      let response = await axios.get("common/pet-type");
      return response;
    },

    async getPetCategory() {
      let response = await axios.get("common/category");
      return response;
    },

    async getPetParent() {
      let response = await axios.get("common/pet-parent");
      return response;
    },

    async getBeginnerGuide(_, type) {
      let response = await axios.get("top-page/content/type/" + type);
      return response;
    },
    async topPageInquiryToAgrat(_, data) {
      let response = await axios.post("top-page/agrat-inquery/create", data);
      return response;
    },
    async getCustomerVoiceList(_, page = 1) {
      let response = await axios.get(
        "top-page/customer-voice?page=" + page + "&record=10"
      );
      return response;
    },
    

    async deleteGalleryItem(_, galleryId) {
      let response = await axios.delete(
        "common/upload/file/delete/" + galleryId
      );
      return response;
    },
    async uploadGalleryItem(_, data) {
      let response = await axios.post("common/upload/file", data);
      return response;
    },
  }
};
