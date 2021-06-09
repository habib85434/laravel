<template>
  <div>
    <AgTopbar className="whitebg"></AgTopbar>
    <div class="page-wrapper">
      <div class="page-sidebar">
        <AgSitebar></AgSitebar>
      </div>
      <div class="page-content">
        <div class="page-title">
          <h1 class="m-0">{{ eTtitle }}</h1>
          <div class="sub-title">
            <router-link class="" :to="{ name: 'AdminUsers' }">
              <IxButton
                className="btn btn-purple btn-sm btn-wide"
                btnType="button"
                >{{ eTopBack }}</IxButton
              >
            </router-link>
          </div>
        </div>
        <div class="page-main-content">
          <ValidationObserver v-slot="{ handleSubmit }">
            <form
              class="form-wrapper"
              @submit.prevent="handleSubmit(onSubmit)"
              enctype="multipart/form-data"
            >
              <div class="form-group row">
                <div class="col-lg-6">
                  <h5>{{ fKataKana }}</h5>
                  <div class="d-flex">
                    <div class="col-md-6 pl-0 pr-1">
                      <label for="kata_first_name" class="control-label">{{
                        kata_first_name
                      }}</label>
                      <ValidationProvider
                        :name="kata_first_name"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <IxInput
                          v-model="form.kata_first_name"
                          inputType="text"
                          className="form-control"
                          inputName="kata_first_name"
                        ></IxInput>
                        <span class="text-danger validation-error">{{
                          errors[0]
                        }}</span>
                      </ValidationProvider>
                    </div>
                    <div class="col-md-6 pr-0 pl-1">
                      <label for="kata_last_name" class="control-label">{{
                        kata_last_name
                      }}</label>
                      <ValidationProvider
                        :name="kata_last_name"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <IxInput
                          v-model="form.kata_last_name"
                          inputType="text"
                          className="form-control"
                          inputName="kata_last_name"
                        ></IxInput>
                        <span class="text-danger validation-error">{{
                          errors[0]
                        }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                </div>

                <div class="col-lg-6">
                  <h5>{{ fkanji }}</h5>
                  <div class="d-flex">
                    <div class="col-md-6 pl-0 pr-1">
                      <label for="kana_first_name" class="control-label">{{
                        kana_first_name
                      }}</label>
                      <ValidationProvider
                        :name="kana_first_name"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <IxInput
                          v-model="form.kana_first_name"
                          inputType="text"
                          className="form-control"
                          inputName="kana_first_name"
                        ></IxInput>
                        <span class="text-danger validation-error">{{
                          errors[0]
                        }}</span>
                      </ValidationProvider>
                    </div>
                    <div class="col-md-6 pr-0 pl-1">
                      <label for="kana_last_name" class="control-label">{{
                        kana_last_name
                      }}</label>
                      <ValidationProvider
                        :name="kana_last_name"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <IxInput
                          v-model="form.kana_last_name"
                          inputType="text"
                          className="form-control"
                          inputName="kana_last_name"
                        ></IxInput>
                        <span class="text-danger validation-error">{{
                          errors[0]
                        }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                </div>

                <div class="col-lg-6">
                  <label for="name" class="control-label">{{ name }}</label>
                  <ValidationProvider name="name" rules="" v-slot="{ errors }">
                    <IxInput
                      v-model="form.name"
                      inputType="text"
                      className="form-control"
                      inputName="name"
                    ></IxInput>
                    <span class="text-danger validation-error">{{
                      errors[0]
                    }}</span>
                  </ValidationProvider>
                </div>

                <div class="col-lg-6">
                  <div class="d-flex">
                    <div class="col-md-6 pl-0 pr-1">
                      <label for="email" class="control-label">{{
                        sEmail
                      }}</label>
                      <ValidationProvider
                        :name="sEmail"
                        rules="required|email"
                        v-slot="{ errors }"
                      >
                        <IxInput
                          v-model="form.email"
                          inputType="email"
                          className="form-control"
                          inputName="email"
                        ></IxInput>
                        <span class="text-danger validation-error">{{
                          errors[0]
                        }}</span>
                      </ValidationProvider>
                    </div>
                    <div class="col-md-6 pr-0 pl-1 max-half">
                      <label for="date_of_birth" class="control-label">{{
                        date_of_birth
                      }}</label>
                      <ValidationProvider
                        :name="date_of_birth"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <IxInput
                          v-model="form.date_of_birth"
                          inputType="date"
                          className="form-control"
                          inputName="date_of_birth"
                        ></IxInput>
                        <span class="text-danger validation-error">{{
                          errors[0]
                        }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                </div>

                <div class="col-lg-6">
                  <div class="d-flex">
                    <div class="col-md-6 pl-0 pr-1">
                      <label for="password" class="control-label">{{
                        fpassword
                      }}</label>
                      <ValidationProvider
                        :name="fpassword"
                        vid="password"
                        rules="required|min:8"
                        v-slot="{ errors }"
                      >
                        <IxInput
                          v-model="form.password"
                          inputType="password"
                          className="form-control"
                          inputName="password"
                        ></IxInput>
                        <span class="text-danger validation-error">{{
                          errors[0]
                        }}</span>
                      </ValidationProvider>
                    </div>
                    <div class="col-md-6 pr-0 pl-1">
                      <label for="confirmPassword" class="control-label">{{
                        cPassword
                      }}</label>
                      <ValidationProvider
                        :name="cPassword"
                        rules=""
                        v-slot="{ errors }"
                      >
                        <input
                          @keyup="confirmPassword()"
                          type="password"
                          class="form-control"
                          name="confirmPassword"
                          v-model="form.confirmPassword"
                        />

                        <span class="text-danger validation-error">{{
                          errors[0]
                        }}</span>
                        <span
                          v-if="passConfirmation"
                          class="text-danger validation-error"
                          >{{ passMissMatch }}</span
                        >
                      </ValidationProvider>
                    </div>
                  </div>
                </div>

                <div class="col-lg-6  pt-1">
                  <div class="d-flex">
                    <div class="col-md-6 pl-0 pr-1">
                      <ValidationProvider
                        :name="status"
                        rules=""
                        v-slot="{ errors }"
                        class="radio-container"
                      >
                        <b-form-group
                          :label="status"
                          class="mt-3 control-label"
                        >
                          <b-form-radio-group
                            id="status"
                            v-model="form.status"
                            name="status"
                          >
                            <b-form-radio value="ACTIVE">{{
                              active
                            }}</b-form-radio>
                            <b-form-radio value="INACTIVE">{{
                              inactive
                            }}</b-form-radio>
                          </b-form-radio-group>
                        </b-form-group>
                        <span class="text-danger validation-error">{{
                          errors[0]
                        }}</span>
                      </ValidationProvider>
                    </div>
                    <div class="col-md-6 pr-0 pl-1">
                      <ValidationProvider
                        :name="sex"
                        rules="required"
                        v-slot="{ errors }"
                        class="radio-container"
                      >
                        <b-form-group :label="sex" class="mt-3 control-label">
                          <b-form-radio-group
                            id="sex"
                            v-model="form.sex"
                            name="sex"
                          >
                            <b-form-radio value="MALE">{{ male }}</b-form-radio>
                            <b-form-radio value="FEMALE">{{
                              feMale
                            }}</b-form-radio>
                          </b-form-radio-group>
                        </b-form-group>
                        <span class="text-danger validation-error">{{
                          errors[0]
                        }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-group row mb-0 mt-5">
                <div class="col-md-12 text-right">
                  <router-link :to="{ name: 'AdminUsers' }">
                    <IxButton
                      className="btn btn-default btn-sm btn-wide btn-font mr-2"
                      btnType="button"
                      >{{ eCancel }}</IxButton
                    >
                  </router-link>
                  <IxButton
                    className="btn btn-purple btn-sm btn-wide"
                    btnType="submit"
                    >{{ fsubmit }}</IxButton
                  >
                </div>
              </div>
            </form>
          </ValidationObserver>

          <div v-if="procession" class="loader">
            <font-awesome-icon icon="spinner" spin />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import AgTopbar from "@/components/composit/ag-admin/Ag-topbar";
import AgSitebar from "@/components/composit/ag-admin/Ag-sitebar";

import IxButton from "@/components/basic/ix-admin/Ix-basic-button";
import IxInput from "@/components/basic/ix-admin/Ix-basic-input";
import { Form } from "vform";

export default {
  name: "AdminUserEdit",
  data() {
    return {
      form: new Form({
        id: this.$route.params.id,
        name: "",
        email: "",
        kata_first_name: "",
        kata_last_name: "",
        kana_first_name: "",
        kana_last_name: "",
        date_of_birth: "",
        sex: "",
        user_type: "",
        password: "",
        confirmPassword: "",
        status: ""
      }),
      passConfirmation: false,
      emailValidationError: false,
      procession: false
    };
  },
  components: { AgTopbar, AgSitebar, IxButton, IxInput },
  computed: {
    ...mapGetters({
      userInfo: "adminUser/getUserInfo"
    })
  },
  created() {
    this.getUserInfoAction(this.$route.params.id)
      .then(res => {
        if (res.data.success) {
          this.form = res.data.data.user;
        }
      })
      .catch(() => {});
  },
  // watch: {},
  // mounted: {},
  methods: {
    ...mapActions({
      getUserInfoAction: "adminUser/getUserInfoAction"
    }),
    ...mapActions({
      updateUser: "adminUser/updateUser"
    }),

    confirmPassword() {
      if (this.form.password == this.form.confirmPassword) {
        this.passConfirmation = false;
      } else {
        this.passConfirmation = true;
      }
    },

    onSubmit() {
      if (this.form.password == this.form.confirmPassword) {
        this.passConfirmation = false;
      } else {
        this.passConfirmation = true;
      }

      if (!this.passConfirmation) {
        this.procession = true;
        this.updateUser(this.form)

          .then(() => {
            this.$bvToast.toast(this.recordUpdated, {
              title: this.uSuccessTitle,
              variant: "success",
              toaster: "b-toaster-top-center",
              solid: true,
              autoHideDelay: 5000
            });
            this.procession = false;
            this.timeout = setTimeout(
              function() {
                this.$router.push({ path: "/admin/users/" });
              }.bind(this),
              3000
            );
          })
          .catch(err => {
            this.procession = false;
            if (err.response.data.data.email[0]) {
              this.emailValidationError = err.response.data.data.email[0];
            }
            this.uErrorMessage = err.response.data.data.message;
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
  }
};
</script>

<style scoped>
.control-label {
  margin-top: 15px;
}
</style>
