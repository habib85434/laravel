<template>
  <ul>
    <!-- <li>
      <router-link active-class="active" :to="{ name: 'AdminUsers' }">
        <font-awesome-icon icon="user" /> {{ Admin_User }}
      </router-link>
    </li> -->
    <li>
      <router-link active-class="active" :to="{ name: 'AdminDashboard' }">
        <font-awesome-icon icon="user-cog" /> Dashboard
      </router-link>
    </li>

    <li>
      <a href="#" active-class="active" @click="signout" exact>
        <font-awesome-icon icon="sign-out-alt" /> Signout
      </a>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "AgAdminSidebar",

  data() {
    return {};
  },

  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  },

  methods: {
    ...mapActions({
      logout: "auth/logout"
    }),

    signout() {
      this.logout().then(res => {
        if (res.data.success) {
          localStorage.removeItem("token");
          this.$router.push({
            name: "Home"
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.sidebar {
  background: #23282d;
  width: 100%;
  padding-top: 20px;
  min-height: 100%;
  float: left;
}
.sidebar ul {
  margin: 0;
  padding: 0;
  width: 100%;
  list-style: none;
  text-align: left;
}
.sidebar ul li {
  width: 100%;
}
.sidebar ul li a {
  width: 100%;
  text-decoration: none;
  color: #bcbebf;
  padding: 8px 15px;
  float: left;
}
.sidebar ul li a.active {
  background: #650cb4;
  color: #fff;
}
</style>
