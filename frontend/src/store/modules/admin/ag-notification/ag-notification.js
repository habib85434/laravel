import axios from "axios";

export default {
  namespaced: true,

  state: {
    notification: {},
    unread_notification: {}
  },

  getters: {
    getNotification(state) {
      return state.notification && state.notification;
    },
    getUnreadNotification(state) {
      return state.unread_notification && state.unread_notification;
    },
    getNotificationInfo(state) {
      return state.notification_info && state.notification_info;
    }
  },

  mutations: {
    SET_NOTIFICATION(state, data) {
      state.notification = data;
    },
    SET_UNREAD_NOTIFICATION(state, data) {
      state.unread_notification = data;
    },
    SET_NOTIFICATION_INFO(state, data) {
      state.notification_info = data;
    }
  },

  actions: {
    async getNotificationAction({ dispatch }, page = 1, record = 10) {
      let response = await axios.get(
        "common/notification?page=" + page + "&record=" + record
      );
      dispatch("commitNotification", response.data.data);
      return response;
    },

    async commitNotification({ commit }, notification) {
      if (notification) {
        commit("SET_NOTIFICATION", notification);
      }
    },

    async getUnreadNotificationAction({ dispatch }, page = 1, record = 5) {
      let response = await axios.get(
        "common/notification?page=" +
          page +
          "&record=" +
          record +
          "&status=unread"
      );
      dispatch("commitUnreadNotification", response.data.data);
      return response;
    },

    async commitUnreadNotification({ commit }, unread_notification) {
      if (unread_notification) {
        commit("SET_UNREAD_NOTIFICATION", unread_notification);
      }
    },

    async getNotificationInfoAction({ dispatch }, id) {
      let response = await axios.get("common/notification/show/" + id);

      dispatch("commitNotificationInfo", response.data.data);
      //console.log(dispatch)
      return response;
    },

    async commitNotificationInfo({ commit }, data) {
      if (data) {
        commit("SET_NOTIFICATION_INFO", data);
      }
    },

    async readNotification(_, id) {
      let response = axios.post(
        "common/app-notification/make-read/" + id + "?_method=patch",
        "",
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      return response;
    },
    async deleteNotification(_, id) {
      let response = await axios.delete("common/notification/delete/" + id);
      return response;
    }
  }
};
