<template>
  <div class="sidebar collapse" id="navbarSupportedContent">
    <AgAdminSidebar></AgAdminSidebar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AgAdminSidebar from "@/components/composit/ag-admin/Ag-sidebar-admin";

export default {
  name: "AgSitebar",
  data() {
    return {};
  },
  components: { AgAdminSidebar },
  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  }
};
</script>
<style scoped>
.sidebar {
  background: #23282d;
  padding-top: 20px;
  width: 100%;
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
