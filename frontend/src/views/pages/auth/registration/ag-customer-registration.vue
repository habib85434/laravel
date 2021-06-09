<template>
  <div class="login-main pb-3">
    <div class="container login-bg">
      <div class="row">
        <div class="page-main-content">
          <div class="page-title py-3">
            <h1>{{ rTitle }}</h1>
          </div>
          <ValidationObserver v-slot="{ handleSubmit }">
            <form
              class="form-wrapper"
              @submit.prevent="handleSubmit(onSubmit)"
              enctype="multipart/form-data"
            >
              <div class="form-group row">
                <div class="col-lg-6">
                  <h5>{{ katakana }}</h5>
                  <div class="d-flex">
                    <div class="col-md-6 pl-0 pr-1">
                      <label for="kata_first_name" class="control-label">{{
                        f_kata_first_name
                      }}</label>
                      <ValidationProvider
                        :name="f_kata_first_name"
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
                        f_kata_last_name
                      }}</label>
                      <ValidationProvider
                        :name="f_kata_last_name"
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
                  <h5>{{ kanji }}</h5>
                  <div class="d-flex">
                    <div class="col-md-6 pl-0 pr-1">
                      <label for="kana_first_name" class="control-label">{{
                        f_kana_first_name
                      }}</label>
                      <ValidationProvider
                        :name="f_kana_first_name"
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
                        f_kana_last_name
                      }}</label>
                      <ValidationProvider
                        :name="f_kana_last_name"
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
                  <label for="name" class="control-label">{{ f_name }}</label>
                  <ValidationProvider
                    :name="f_name"
                    rules=""
                    v-slot="{ errors }"
                  >
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
                  <div class="row m-0 align-items-baseline">
                    <div class="col-md-6 pl-0 pr-1 input-right-padding">
                      <label for="email" class="control-label">{{
                        f_email
                      }}</label>
                      <ValidationProvider
                        :name="f_email"
                        rules="required|email"
                        v-slot="{ errors }"
                      >
                        <IxInput
                          v-model="form.email"
                          inputType="email"
                          className="form-control"
                          inputName="email"
                          disabled
                        ></IxInput>
                        <span class="text-danger validation-error">{{
                          errors[0]
                        }}</span>
                      </ValidationProvider>
                    </div>
                    <div class="col-md-6 pr-0 pl-1 input-left-padding">
                      <div class="d-flex align-items-baseline">
                        <div class="col-md-6 pl-0 pr-1">
                          <label for="password" class="control-label">{{
                            fPassword
                          }}</label>
                          <ValidationProvider
                            :name="fPassword"
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
                          <label for="password" class="control-label">{{
                            fcPassword
                          }}</label>
                          <ValidationProvider
                            :name="fcPassword"
                            rules="required|min:8"
                            v-slot="{ errors }"
                          >
                            <IxInput
                              v-model="form.password_confirmation"
                              inputType="password"
                              className="form-control"
                              inputName="password"
                            ></IxInput>
                            <span class="text-danger validation-error">{{
                              errors[0]
                            }}</span>
                          </ValidationProvider>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-lg-6">
                  <div class="row m-0">
                    <div class="col-md-6 pl-0 pr-1 input-right-padding">
                      <label for="prefecture_id" class="control-label">{{
                        f_prefecture
                      }}</label>
                      <ValidationProvider
                        :name="f_prefecture"
                        rules=""
                        v-slot="{ errors }"
                      >
                        <Select2
                          v-model="form.prefecture_id"
                          :options="prefecture"
                        />
                        <span class="text-danger validation-error">{{
                          errors[0]
                        }}</span>
                      </ValidationProvider>
                    </div>
                    <div class="col-md-6 pr-0 pl-1 input-left-padding">
                      <label for="city_id" class="control-label">{{
                        f_city_id
                      }}</label>
                      <ValidationProvider
                        :name="f_city_id"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <Select2 v-model="form.city_id" :options="cities" />
                        <span class="text-danger validation-error">{{
                          errors[0]
                        }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                </div>

                <div class="col-lg-6">
                  <div class="row m-0">
                    <div class="col-md-6 pl-0 pr-1 input-right-padding">
                      <label for="date_of_birth" class="control-label">{{
                        f_date_of_birth
                      }}</label>
                      <ValidationProvider
                        :name="f_date_of_birth"
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
                    <div class="col-md-6 pr-0 pl-1 input-left-padding">
                      <label for="phone_number" class="control-label">{{
                        f_phone_number
                      }}</label>
                      <ValidationProvider
                        :name="f_phone_number"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <IxInput
                          v-model="form.phone_number"
                          inputType="text"
                          className="form-control"
                          inputName="phone_number"
                        ></IxInput>
                        <span class="text-danger validation-error">{{
                          errors[0]
                        }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                </div>

                <div class="col-lg-6">
                  <div class="row m-0">
                    <div class="col-md-6 pl-0 pr-1 input-right-padding">
                      <label for="address" class="control-label">{{
                        f_address1
                      }}</label>
                      <ValidationProvider
                        :name="f_address1"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <IxInput
                          v-model="form.address"
                          inputType="text"
                          className="form-control"
                          inputName="address"
                        ></IxInput>
                        <span class="text-danger validation-error">{{
                          errors[0]
                        }}</span>
                      </ValidationProvider>
                    </div>
                    <div class="col-md-6 pr-0 pl-1 input-left-padding">
                      <label for="address" class="control-label">{{
                        f_address2
                      }}</label>
                      <ValidationProvider
                        :name="f_address2"
                        rules=""
                        v-slot="{ errors }"
                      >
                        <IxInput
                          v-model="form.address2"
                          inputType="text"
                          className="form-control"
                          inputName="address"
                        ></IxInput>
                        <span class="text-danger validation-error">{{
                          errors[0]
                        }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                </div>

                <div class="col-lg-6">
                  <div class="row m-0">
                    <div class="col-md-6 pl-0 pr-1 input-right-padding">
                      <div class="d-flex">
                        <div class="col-md-5 px-0">
                          <label for="zip_code" class="control-label">{{
                            f_zip_code
                          }}</label>
                          <ValidationProvider
                            :name="f_zip_code"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <IxInput
                              v-model="form.zip_code"
                              inputType="number"
                              className="form-control"
                              inputName="zip_code"
                              onkeypress="return this.value.length < 3;"
                              oninput="if(this.value.length>=3) { this.value = this.value.slice(0,3); }"
                            ></IxInput>
                            <span class="text-danger validation-error">{{
                              errors[0]
                            }}</span>
                          </ValidationProvider>
                        </div>
                        <div class="col-md-2 px-0">
                          <label class="control-label"></label
                          ><label class="text-center control-label">---</label>
                        </div>
                        <div class="col-md-5 px-0">
                          <label for="zip_code" class="control-label"></label>
                          <ValidationProvider
                            :name="f_zip_code"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <IxInput
                              v-model="form.zip_code2"
                              inputType="number"
                              className="form-control"
                              inputName="zip_code"
                              onkeypress="return this.value.length < 4;"
                              oninput="if(this.value.length>=4) { this.value = this.value.slice(0,4); }"
                            ></IxInput>
                            <span class="text-danger validation-error">{{
                              errors[0]
                            }}</span>
                          </ValidationProvider>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6 pr-0 pl-1 input-left-padding">
                      <label for="fax_number" class="control-label">{{
                        f_fax_number
                      }}</label>
                      <ValidationProvider
                        :name="f_fax_number"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <IxInput
                          v-model="form.fax_number"
                          inputType="text"
                          className="form-control"
                          inputName="fax_number"
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
                    <div class="col-md-6 pl-0 pr-1 pt-1">
                      <ValidationProvider
                        :name="f_sex"
                        rules="required"
                        v-slot="{ errors }"
                        class="radio-container"
                      >
                        <b-form-group :label="f_sex" class="mt-3 control-label">
                          <b-form-radio-group
                            id="sex"
                            v-model="form.sex"
                            :name="f_sex"
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
                    <div class="col-md-6 pr-0 pl-1">
                      <ValidationProvider
                        name="notification"
                        rules="required"
                        v-slot="{ errors }"
                        class="radio-container"
                      >
                        <b-form-group
                          :label="allowNotification"
                          class="mt-3 control-label"
                        >
                          <b-form-radio-group
                            id="notification"
                            v-model="form.is_notify"
                            name="notification"
                          >
                            <b-form-radio value="1">{{ yes }}</b-form-radio>
                            <b-form-radio value="0">{{ no }}</b-form-radio>
                          </b-form-radio-group>
                        </b-form-group>
                        <span class="text-danger validation-error">{{
                          errors[0]
                        }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 img-btn-pt">
                  <div class="d-flex flex-column pb-2">
                    <label for="image" class="control-label">{{
                      f_image
                    }}</label>
                    <ValidationProvider
                      name="image"
                      rules="required|image"
                      ref="provider"
                      v-slot="{ errors }"
                    >
                      <div
                        class="custom-file btn btn-default btn-wide btn-font img-btn-width"
                      >
                        <input type="file" ref="file" @change="selectFile" />
                        <span>{{ browse }}</span>
                      </div>
                      <span class="text-danger validation-error">{{
                        errors[0]
                      }}</span>
                    </ValidationProvider>
                  </div>

                  <div class="preview">
                    <img v-if="url" :src="url" width="100" />
                  </div>
                </div>
              </div>

              <div class="form-group row mb-0 mt-5">
                <div class="col-md-12 text-right">
                  <IxButton
                    :disabled="validated == 1"
                    className="btn btn-purple btn-sm btn-wide"
                    btnType="submit"
                    >{{ eSave }}</IxButton
                  >
                </div>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import { mapGetters } from "vuex";
import { mapActions } from "vuex";

import { Form } from "vform";
import IxButton from "@/components/basic/ix-admin/Ix-basic-button";
import IxInput from "@/components/basic/ix-admin/Ix-basic-input";

import {
  f_name,
  f_email,
  f_prefecture,
  f_kata_first_name,
  f_kata_last_name,
  f_kana_first_name,
  f_kana_last_name,
  f_date_of_birth,
  f_sex,
  f_image,
  f_phone_number,
  f_fax_number,
  f_city_id,
  f_zip_code,
  f_address1,
  f_address2,
  rTitle,
  rSuccessMessage,
  fcPassword,
  fPassword
} from "@/utils/trans/ag-customer-registration.js";
import {
  uSuccessTitle,
  uErrorTitle,
  eSave,
  browse,
  male,
  feMale,
  uErrorMessage,
  yes,
  no,
  allowNotification
} from "@/utils/trans/ag-common.js";

import { katakana, kanji } from "@/utils/trans/ag-breeder-registration.js";

export default {
  name: "AgCustomerRegistration",

  data() {
    return {
      uSuccessTitle: uSuccessTitle,
      uErrorTitle: uErrorTitle,
      uErrorMessage: uErrorMessage,
      rSuccessMessage: rSuccessMessage,
      eSave: eSave,
      validated: false,
      browse,
      katakana,
      kanji,

      rTitle: rTitle,
      f_name: f_name,
      f_email: f_email,
      f_prefecture: f_prefecture,
      f_kata_first_name: f_kata_first_name,
      f_kata_last_name: f_kata_last_name,
      f_kana_first_name: f_kana_first_name,
      f_kana_last_name: f_kana_last_name,
      f_date_of_birth: f_date_of_birth,
      f_sex: f_sex,
      f_image: f_image,
      f_phone_number: f_phone_number,
      f_fax_number: f_fax_number,
      f_city_id: f_city_id,
      f_zip_code: f_zip_code,
      f_address1: f_address1,
      f_address2: f_address2,

      fcPassword,
      fPassword,
      male,
      feMale,
      yes,
      no,
      allowNotification,
      selected: null,
      file: null,
      cities: [],
      prefecture: [],
      image: null,
      url: "",
      form: new Form({
        name: "",
        email: "",
        kata_first_name: "",
        kata_last_name: "",
        kana_first_name: "",
        kana_last_name: "",
        date_of_birth: "",
        sex: "MALE",
        is_notify: 1,
        image: null,
        password: "",
        password_confirmation: "",
        phone_number: "",
        fax_number: "",
        city_id: "1",
        prefecture_id: "1",
        zip_code: "",
        zip_code2: "",
        address: "",
        address2: ""
      })
    };
  },
  components: { IxButton, IxInput },
  //computed: {},
  created() {
    this.getCommonDataAction()
      .then(res => {
        if (res.data.success) {
          //console.log(res.data.data.cities);
          for (var i = 0; i < res.data.data.cities.length; i++) {
            this.cities.push({
              id: res.data.data.cities[i].id,
              text: res.data.data.cities[i].name
            });
          }
          for (var j = 0; j < res.data.data.prefectures.length; j++) {
            this.prefecture.push({
              id: res.data.data.prefectures[j].id,
              text: res.data.data.prefectures[j].name
            });
          }
        }
      })
      .catch(() => {});

    this.getRequestedInfoAction(this.$route.params.email).then(data => {
      if (data && data.data.success) {
        if (data && data.data && data.data.data.applied_info) {
          this.form.email = data.data.data.applied_info.email;
          this.form.name = data.data.data.applied_info.name;
        }
      }
    });
  },
  // watch: {},
  // mounted: {},
  methods: {
    ...mapActions({
      getCommonDataAction: "adminBreeder/getCommonDataAction"
    }),

    ...mapActions({
      createCustomer: "registration/createCustomerAction"
    }),

    ...mapActions({
      getRequestedInfoAction: "registration/getRequestedCustomerInfoAction"
    }),

    async selectFile(e) {
      const { valid } = await this.$refs.provider.validate(e);
      if (valid) {
        this.image = this.$refs.file.files[0];
        const file = e.target.files[0];
        this.url = URL.createObjectURL(file);
      }
    },

    onSubmit() {
      this.validated = true;
      var formData = new FormData();

      formData.append("name", this.form.name);
      formData.append("email", this.form.email);
      formData.append("kata_first_name", this.form.kata_first_name);
      formData.append("kata_last_name", this.form.kata_last_name);
      formData.append("kana_first_name", this.form.kana_first_name);
      formData.append("kana_last_name", this.form.kana_last_name);
      formData.append("date_of_birth", this.form.date_of_birth);
      formData.append("sex", this.form.sex);
      formData.append("password", this.form.password);
      formData.append("password_confirmation", this.form.password_confirmation);
      formData.append("phone_number", this.form.phone_number);
      formData.append("fax_number", this.form.fax_number);
      formData.append("city_id", this.form.city_id);
      formData.append("prefecture_id", this.form.prefecture_id);
      formData.append(
        "zip_code",
        this.form.zip_code + "-" + this.form.zip_code2
      );
      formData.append("address", this.form.address);
      formData.append("address2", this.form.address2);
      formData.append("image", this.image);
      formData.append("is_notify", this.form.is_notify);
      this.createCustomer(formData)
        .then(() => {
          this.$bvToast.toast(this.rSuccessMessage, {
            title: this.uSuccessTitle,
            variant: "success",
            toaster: "b-toaster-top-center",
            solid: true,
            autoHideDelay: 5000
          });
          this.timeout = setTimeout(
            function() {
              this.validated = false;
              this.$router.push({ name: "Customer" });
            }.bind(this),
            3000
          );
        })
        .catch(err => {
          this.validated = false;

          if (err.response.status == 422) {
            this.uErrorMessage = err.response.data.message;
          }

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
a {
  color: #650cb4;
}
a:hover {
  text-decoration: none;
}
.active {
  font-weight: bold;
}
</style>
