<template>
  <div>
    <AgTopbar className="whitebg"></AgTopbar>
    <div class="page-wrapper">
      <div class="page-sidebar">
        <AgSitebar></AgSitebar>
      </div>
      <div class="page-content">
        <div class="page-title">
          <h1>Not found 404</h1>
        </div>
        <div class="page-main-content"></div>
      </div>
    </div>
  </div>
</template>

<script>
//import { mapGetters } from "vuex"
// import { mapActions } from "vuex";
import AgTopbar from "@/components/composit/ag-admin/Ag-topbar";
import AgSitebar from "@/components/composit/ag-admin/Ag-sitebar";

export default {
  name: "notFound",
  data() {
    return {};
  },
  components: { AgTopbar, AgSitebar }
  //computed: {},
  //created() {},
  // watch: {},
  // mounted: {},
  // methods: {}
};
</script>

<style scoped></style>
