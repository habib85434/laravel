<template>
  <div>
    <AgTopbar className="whitebg"></AgTopbar>
    <div class="page-wrapper">
      <div class="page-sidebar">
        <AgSitebar></AgSitebar>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AgTopbar from "@/components/composit/ag-admin/Ag-topbar";
import AgSitebar from "@/components/composit/ag-admin/Ag-sitebar";

export default {
  name: "AdminDashboard",
  data() {
    return {};
  },
  components: {
    AgTopbar,
    AgSitebar
  },
  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  }
  // created() {
  // },
  // watch: {},
  // mounted: {},
  // methods: {}
};
</script>

<style scoped></style>
