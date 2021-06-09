<template>
  <div class="home">
    <AgHeader></AgHeader>
    <AgNavbar></AgNavbar>

    <!-- Main Content -->
    <section class="main-part">
      <!-- <AgTopbar className="whitebg"></AgTopbar> -->
      <div class="container">
        <div class="row d-flex justify-content-center">
          <div class="col-md-6 hide-mobile">
            <img
              src="../../../assets/images/hero-dog.png"
              alt=""
              style="max-width: 100%; margin-top: 30px;"
            />
          </div>
          <div class="col-md-5 mt-5 mc-content">
            <div class="page-title">
              {{ fpeTitle }}
            </div>
            <p>{{ fpeDetails }}</p>
            <ValidationObserver v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(onSubmit)">
                <div class="col-md-12">
                  <div class="text-danger" style="font-style:italic;">
                    {{ loginError }}
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-md-12">
                    <label for="emailAddress" class="control-label">{{
                      femail
                    }}</label>
                    <ValidationProvider
                      :name="femail"
                      rules="required|email"
                      v-slot="{ errors }"
                    >
                      <input
                        v-model="form.email"
                        class="form-control"
                        type="email"
                      />
                      <span class="text-danger validation-error">{{
                        errors[0]
                      }}</span>
                    </ValidationProvider>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-md-12">
                    <button
                      :disabled="validated == 1"
                      type="submit"
                      class="btn btn-purple btn-block btn-lg"
                    >
                      {{ fsubmit }}
                    </button>
                    <br />
                  </div>
                </div>
              </form>
            </ValidationObserver>
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
import { mapActions } from "vuex";
// import AgTopbar from "@/components/composit/ag-admin/Ag-topbar";
// import AgSitebar from "@/components/composit/ag-admin/Ag-sitebar";
import AgHeader from "@/components/business/ag-layout/ag-header";
import AgNavbar from "@/components/business/ag-layout/ag-navbar";
import AgFooterTop from "@/components/business/ag-layout/ag-footer-top";
import AgFooter from "@/components/business/ag-layout/ag-footer";
import { Form } from "vform";

import {
  fpeTitle,
  femail,
  rspcSuccessMessage,
  fpeDetails
} from "@/utils/trans/ag-auth.js";

import {
  eTopBack,
  fsubmit,
  eCancel,
  uSuccessTitle,
  uErrorTitle,
  uErrorMessage
} from "@/utils/trans/ag-common.js";

export default {
  name: "AgForgetPasswordEmail",
  data() {
    return {
      eTopBack: eTopBack,
      fsubmit: fsubmit,
      eCancel: eCancel,
      uSuccessTitle: uSuccessTitle,
      uErrorTitle: uErrorTitle,
      uErrorMessage: uErrorMessage,
      rspcSuccessMessage: rspcSuccessMessage,

      fpeTitle: fpeTitle,
      femail: femail,
      fpeDetails: fpeDetails,

      loginError: "",

      form: new Form({
        email: ""
      }),
      validated: false
    };
  },
  components: { AgHeader, AgNavbar, AgFooterTop, AgFooter },
  //computed: {},
  //created() {},
  // watch: {},
  // mounted: {},
  methods: {
    ...mapActions({
      forgetPasswordEmailAction: "auth/forgetPasswordEmailAction"
    }),

    onSubmit() {
      this.validated = true;
      this.forgetPasswordEmailAction(this.form)
        .then(res => {
          if (res.data.success) {
            this.loginError = "";
            this.validated = false;

            this.$bvToast.toast(this.rspcSuccessMessage, {
              title: this.uSuccessTitle,
              variant: "success",
              toaster: "b-toaster-top-center",
              solid: true,
              autoHideDelay: 5000
            });
          } else {
            this.validated = false;
            this.loginError = res.data.message;
          }
        })
        .catch(err => {
          this.validated = false;
          this.uErrorMessage = err.response.data.message;
          this.$bvToast.toast(this.uErrorMessage, {
            title: this.uErrorTitle,
            variant: "danger",
            toaster: "b-toaster-top-center",
            solid: true,
            autoHideDelay: 5000
          });
        });
    }
  }
};
</script>

<style scoped>
.mc-content {
  margin-top: 2em;
}
p {
  font-size: 0.5em;
  margin: 0;
}
</style>
