<template>
  <div class="home">
    <AgHeader></AgHeader>
    <AgNavbar></AgNavbar>

    <!-- Main Content -->
    <section class="main-part banner-part">
      <div class="login-main">
        <div class="container login-bg">
          <div class="row pt-5">
            <div class="col-md-6 hide-mobile">
              <img
                src="../../../../assets/images/hero-dog.png"
                alt=""
                style="max-width: 100%; margin-top: 30px;"
              />
            </div>
            <div class="col-md-6 pt-5">
              <ul class="nav nav-tabs">
                <li class="nav-item" @click="tabChange('CUSTOMER')">
                  <a :class="'nav-link header-title ' + cActive" href="#">{{
                    customer
                  }}</a>
                </li>
                <li class="nav-item" @click="tabChange('BREEDER')">
                  <a :class="'nav-link header-title ' + bActive" href="#">{{
                    breeder
                  }}</a>
                </li>
              </ul>
              <AgRegistrationApplyCustomer
                v-if="cActive == 'active'"
              ></AgRegistrationApplyCustomer>
              <AgRegistrationApplyBreeder
                v-if="bActive == 'active'"
              ></AgRegistrationApplyBreeder>
              <div class="btn-lg-container">
                <router-link
                  class="btn btn-purple btn-block btn-lg"
                  to="/admin"
                  >{{ login }}</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <AgFooterTop></AgFooterTop>
    <AgFooter></AgFooter>
  </div>
</template>

<script>
//import { mapGetters } from "vuex"
// import { mapActions } from "vuex";
import AgRegistrationApplyCustomer from "@/components/business/ag-registration-apply-customer";
import AgRegistrationApplyBreeder from "@/components/business/ag-registration-apply-breeder";
import AgHeader from "@/components/business/ag-layout/ag-header";
import AgNavbar from "@/components/business/ag-layout/ag-navbar";
import AgFooterTop from "@/components/business/ag-layout/ag-footer-top";
import AgFooter from "@/components/business/ag-layout/ag-footer";

import {
  breeder,
  customer,
  login
} from "@/utils/trans/ag-breeder-registration.js";

import { Form } from "vform";

export default {
  name: "AgRegistrationApply",
  data() {
    return {
      breeder: breeder,
      customer: customer,
      login: login,

      cActive: "active",
      bActive: "",
      form: new Form({
        name: ""
      })
    };
  },
  components: {
    AgRegistrationApplyCustomer,
    AgRegistrationApplyBreeder,
    AgHeader,
    AgNavbar,
    AgFooterTop,
    AgFooter
  },
  //computed: {},
  //created() {},
  // watch: {},
  // mounted: {},
  methods: {
    tabChange(val) {
      if (val == "BREEDER") {
        this.cActive = "";
        this.bActive = "active";
      } else {
        this.cActive = "active";
        this.bActive = "";
      }
    }
  }
};
</script>

<style scoped>
.nav-item .header-title {
  color: #650cb4;
  font-weight: bold;
  text-align: center;
}
li {
  width: 50%;
}
.nav-tabs li:hover a {
  border-width: 1px 2px 1px 2px;
  border-color: #650cb4;
  color: #650cb4;
}
.nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  color: #fff;
  background-color: #650cb4;
  border-color: #650cb4;
}

.nav-tabs {
  border-bottom: 2px solid #650cb4;
}
</style>
