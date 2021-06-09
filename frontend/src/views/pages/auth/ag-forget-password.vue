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
          <div class="col-md-5 mc-content">
            <div class="page-title">
              {{ fpTitle }}
            </div>
            <ValidationObserver v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(onSubmit)">
                <div class="col-md-12">
                  <div class="text-danger" style="font-style:italic;">
                    {{ loginError }}
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-md-12">
                    <label :for="newPassword" class="control-label">{{
                      newPassword
                    }}</label>
                    <ValidationProvider
                      :name="newPassword"
                      rules="required|min:8"
                      v-slot="{ errors }"
                    >
                      <input
                        v-model="form.password"
                        class="form-control"
                        type="password"
                      />
                      <span class="text-danger validation-error">{{
                        errors[0]
                      }}</span>
                    </ValidationProvider>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-md-12">
                    <label :for="confirmPassword" class="control-label">{{
                      confirmPassword
                    }}</label>
                    <ValidationProvider
                      :name="confirmPassword"
                      rules="required|min:8"
                      v-slot="{ errors }"
                    >
                      <input
                        v-model="form.password_confirmation"
                        class="form-control"
                        type="password"
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
                      {{ fsubmit }}</button
                    ><br />
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
  fpTitle,
  fpSuccessMessage,
  newPassword,
  confirmPassword
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
  name: "AgForgetPassword",
  data() {
    return {
      eTopBack: eTopBack,
      fsubmit: fsubmit,
      eCancel: eCancel,
      uSuccessTitle: uSuccessTitle,
      uErrorTitle: uErrorTitle,
      uErrorMessage: uErrorMessage,
      fpSuccessMessage: fpSuccessMessage,

      fpTitle: fpTitle,
      newPassword: newPassword,
      confirmPassword: confirmPassword,

      loginError: "",

      form: new Form({
        password_confirmation: "",
        password: "",
        token: this.$route.params.token
      }),
      validated: false,
      userType: ""
    };
  },
  components: { AgHeader, AgNavbar, AgFooterTop, AgFooter },
  //computed: {},
  created() {
    this.ForgetPasswordUserInfo(this.$route.params.token).then(data => {
      if (data && data.data && data.data.data && data.data.data.info) {
        this.userType = data.data.data.info.user_type;
      }
    });
  },
  // watch: {},
  // mounted: {},
  methods: {
    ...mapActions({
      forgetPasswordAction: "auth/forgetPasswordAction"
    }),
    ...mapActions({
      ForgetPasswordUserInfo: "auth/ForgetPasswordUserInfo"
    }),
    onSubmit() {
      this.validated = true;
      this.forgetPasswordAction(this.form)
        .then(res => {
          if (res.data.success) {
            this.validated = false;
            //success
            this.$bvToast.toast(this.fpSuccessMessage, {
              title: this.uSuccessTitle,
              variant: "success",
              toaster: "b-toaster-top-center",
              solid: true,
              autoHideDelay: 5000
            });
            this.timeout = setTimeout(
              function() {
                if (this.userType == "CUSTOMER") {
                  this.$router.push({ name: "Customer" });
                } else if (this.userType == "ADMIN") {
                  this.$router.push({ name: "Admin" });
                } else if (this.userType == "BREEDER") {
                  this.$router.push({ name: "BreederAdmin" });
                }
              }.bind(this),
              3000
            );
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
</style>
