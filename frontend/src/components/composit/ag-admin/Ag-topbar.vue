<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white navbar-fixed-top">
    <div class="col-md-6">
      <a class="navbar-brand" href="#">
        <router-link to="/">
          <img src="@/assets/images/logo.png" alt="agrat" />
        </router-link>
      </a>
    </div>
    <div class="col-md-6">
      <span
        v-if="loggedInData && loggedInData.user"
        class="float-right wlc-text"
        >Welcome! {{ loggedInData.user.name }}</span
      >
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "AgTopbar",
  data() {
    return {
      notificationDetails: {
        data: {
          title: ""
        }
      },
      breederid: this.$route.params.breederid,
      userType: null
    };
  },
  // components: {  },
  // props: [],
  computed: {
    ...mapGetters({
      loggedInData: "auth/loggedInData"
    })
  },
  // created() {},
  methods: {
    ...mapActions({
      logout: "auth/logout"
    }),
    signout() {
      this.logout().then(res => {
        if (res.data.success) {
          localStorage.removeItem("token");
          this.$router.replace({
            name: "Home"
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.navbar-fixed-top {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10000;
}
a.user-icon {
  color: #666;
}
.dropdown-right {
  right: 0;
  left: auto;
}
.navbar {
  padding-top: 0;
  padding-bottom: 0;
}
.navbar img {
  max-height: 40px;
}
.notification-count {
  font-size: 12px;
  color: #650cb4;
}
.notification-item {
  border-bottom: 1px solid #ccc;
  font-weight: bold;
  color: #000;
  max-width: 100%;
  width: 260px;
}
.notification-item span {
  font-size: 12px;
  color: #999;
  font-weight: normal;
}
.wlc-text {
  font-size: 0.8em;
}
</style>
