<template>
  <div class="login-main">
    <div class="p-5 login-inner">
      <div class="container login-bg">
        <div class="row d-flex justify-content-center">
          <div class="col-md-5">
            <div class="login-part">
              <div class="logo">
                <router-link to="/">
                  <img src="@/assets/images/logo.png" alt="agrat" />
                </router-link>
              </div>
              <h1><span>Login</span></h1>
              <ValidationObserver v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(onSubmit)">
                  <div class="col-md-12">
                    <div class="text-danger" style="font-style:italic;">
                      {{ loginError }}
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-md-12">
                      <label for="emailAddress" class="control-label"
                        >Email</label
                      >
                      <ValidationProvider
                        name="E-mail"
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
                      <label for="password" class="control-label"
                        >Password</label
                      >
                      <ValidationProvider
                        name="Password"
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
                    <div class="col-md-12 btn-lg-container">
                      <button
                        :disabled="validated == 1"
                        type="submit"
                        class="btn btn-purple btn-block btn-lg"
                      >
                        Login
                      </button>
                      <br />
                    </div>
                  </div>
                </form>
                <div v-if="$route.path == '/breeder-admin'">
                  <router-link to="/auth/forget-password-email">
                    <button type="button" class="btn btn-link link-purple">
                      Forget password?
                    </button>
                  </router-link>
                </div>
              </ValidationObserver>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Form } from "vform";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "AdminLogin",
  data() {
    return {
      form: new Form({
        email: "admin@admin.com",
        password: "password"
      }),
      loginError: "",
      validated: false
    };
  },
  // components: {},
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated"
    }),

    ...mapGetters({
      user: "auth/loggedInData"
    })
  },

  //created() {},
  // watch: {},
  // mounted: {},
  methods: {
    ...mapActions({
      signIn: "auth/signIn"
    }),
    ...mapActions({
      logout: "auth/logout"
    }),
    onSubmit() {
      this.validated = true;
      this.signIn(this.form)
        .then(res => {
          this.validated = false;

          if (res.data.success === false) {
            this.loginError = res.data.message;
          }

          this.$router.replace({
            name: "AdminDashboard"
          });
        })
        .catch(err => {
          this.validated = false;
          console.log(err);
          this.loginError = "Incorrect email or password";
          // this.$router.replace({
          //   name: "Admin"
          // });
        });
    }
  }
};
</script>

<style scoped>
.logo img {
  max-height: 5em;
}
.login-main {
  background: #23282d;
  height: 100% !important;
}
.login-inner {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-bg {
  background: #ffffff;
  background-size: 100% 100%;
  /* min-height: 600px; */
  padding: 30px 40px;
  border-radius: 10px;
}
.login-part {
  padding: 10px 10px;
  padding-top: 10px;
  text-align: left;
}
.login-part h1 {
  font-weight: bold;
}
.login-part h1 span {
  font-size: 44px;
  color: #650cb4;
}
.login-part .form-control {
  margin-top: 7px;
  height: 45px;
  border-radius: 5px;
  transition: 0.3s;
  box-shadow: 0px 4px 4px -2px #6b17c3;
}
.login-part .form-control:focus {
  box-shadow: 0px 8px 20px -4px #6b17c3;
}
label {
  margin-bottom: 0;
}
.link-purple {
  color: #650cb4;
}

.link-purple:hover {
  color: #650cb4;
}
</style>
