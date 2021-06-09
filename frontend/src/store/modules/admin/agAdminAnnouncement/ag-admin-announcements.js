import axios from 'axios';

export default {
  namespaced: true,

  state: {
    panel_announcements: {},
    panel_announcement: null,
  },

  getters: {
    getPannelAnnouncements(state) {
      return state.panel_announcements && state.panel_announcements;
    },
    getAnnouncementInfo(state) {
      return state.panel_announcement && state.panel_announcement;
    },
  },

  mutations: {
    SET_PANEL_ANNOUNCEMENTS(state, data) {
      state.panel_announcements = data;
    },
    SET_ANNOUNCEMENT_INFO(state, data) {
      state.panel_announcement = data;
    },
  },

  actions: {
    async getPanelAnnouncementsAction({ dispatch }, page = 1) {
      let response = await axios.get('admin/announcement?page=' + page);
        
      dispatch('commitPanelAnnouncements', response.data.data);
      return response;
    },

    async commitPanelAnnouncements({ commit}, panelAnnouncements) {
      if (panelAnnouncements) {
        commit('SET_PANEL_ANNOUNCEMENTS', panelAnnouncements);
      }
    },

    async createAnnouncement(_,catData) {
        let response = await axios.post('admin/announcement/create', catData);
        return response;
        //console.log(response.data);
    },
    
    async getAnnouncementInfoAction({ dispatch }, id) {
        let response = await axios.get('admin/announcement/'+id);
        
        dispatch('commitAnnouncementInfo', response.data.data);
        return response;
    },
  
    async commitAnnouncementInfo({ commit}, announcementInfo) {
        if (announcementInfo) {
          commit('SET_ANNOUNCEMENT_INFO', announcementInfo);
        }
    },

    async updateAnnouncement(_,data) {
      let response = await axios.patch('admin/announcement/'+data.id, data);
      return response;
      //console.log(response.data);
    },

  },
};
