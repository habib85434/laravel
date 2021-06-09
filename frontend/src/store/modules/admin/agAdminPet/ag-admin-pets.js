import axios from "axios";

export default {
  namespaced: true,

  state: {
    panel_pets: {},
    pet_parent_list: {},
    pet_types: {},
    panel_pet: null
  },

  getters: {
    getPannelPets(state) {
      return state.panel_pets && state.panel_pets;
    },
    getPetParentList(state) {
      return state.pet_parent_list && state.pet_parent_list;
    },
    getPetTypes(state) {
      return state.pet_types && state.pet_types;
    },
    getPetInfo(state) {
      return state.panel_pet && state.panel_pet;
    }
  },

  mutations: {
    SET_PANEL_PETS(state, data) {
      state.panel_pets = data;
    },
    SET_PET_PARENT_LIST(state, data) {
      state.pet_parent_list = data;
    },
    SET_PET_INFO(state, data) {
      state.panel_pet = data;
    },
    SET_PET_TYPES(state, data) {
      //con--------sole.log(data);
      state.pet_types = data;
      //console.log(state.panel_pet_types);
    }
  },

  actions: {
    async getPanelPetAction({ dispatch }, urlperam) {
      let response = await axios.get(
        "breeder/pet/" + urlperam.breederid + "?record=10&page=" + urlperam.page
      );

      dispatch("commitPanelPets", response.data.data);
      return response;
    },

    async getSearchPetAction(_, data) {
      let response = await axios.post(
        "breeder/pet/search?record=10&page=1",
        data
      );
      return response;
    },

    async commitPanelPets({ commit }, panelPets) {
      if (panelPets) {
        commit("SET_PANEL_PETS", panelPets);
      }
    },

    async getPetParentListAction({ dispatch }, data) {
      let response = await axios.get(
        "common/pet-parent/type/" + data.pet_type_id + "/" + data.breeder_id
      );
      dispatch("commitPetParentList", response.data.data);
      return response;
    },

    async commitPetParentList({ commit }, petParentList) {
      if (petParentList) {
        commit("SET_PET_PARENT_LIST", petParentList);
      }
    },

    async getPetTypeAction({ dispatch }) {
      let response = await axios.get("common/pet-type");
      dispatch("commitPetTypes", response.data.data);
      return response;
    },

    async commitPetTypes({ commit }, petTypes) {
      if (petTypes) {
        commit("SET_PET_TYPES", petTypes);
      }
    },

    async createPet(_, formData) {
      let response = axios.post("breeder/pet/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return response;
    },

    async getPetInfoAction({ dispatch }, id) {
      let response = await axios.get("breeder/pet/show/" + id);

      dispatch("commitPetInfo", response.data.data);
      return response;
    },

    async commitPetInfo({ commit }, petInfo) {
      if (petInfo) {
        commit("SET_PET_INFO", petInfo);
      }
    },

    async updatePet(_, mydata) {
      let response = axios.post(
        "breeder/pet/" + mydata.id + "?_method=patch",
        mydata.formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      return response;
    },

    async searchPet(_, searchData) {
      let response = await axios.post("breeder/pet/search", searchData);
      return response;
    },

    async fetchFile(_, fileUrl) {
      let response = await axios.get(fileUrl);
      return response;
    },

    async deletePet(_, id) {
      let response = await axios.delete("breeder/pet/" + id);
      return response;
    },

    async createReviewReply(_, formData) {
      let response = axios.post("breeder/review/reply/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return response;
    },

    async csvDownloadAction(_, id) {
      let response = await axios.get("breeder/export/pets/" + id);
      return response;
    },

    async petCsvImport(_, formData) {
      let response = axios.post("admin/import/pets", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return response;
    }
  }
};
