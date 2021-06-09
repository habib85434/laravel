<template>
  <div>
    <AgTopbar className="whitebg"></AgTopbar>
    <div class="page-wrapper">
      <div class="page-sidebar">
        <AgSitebar></AgSitebar>
      </div>
      <div class="page-content">
        <div class="page-title">
          <h1 class="m-0">{{ pTtitle }}</h1>
          <div class="sub-title">
            <router-link :to="{ name: 'AdminUserCreate' }">
              <IxButton
                className="btn btn-purple btn-sm btn-wide"
                btnType="button"
                >{{ cCreate }}</IxButton
              >
            </router-link>
          </div>
        </div>
        <div class="page-main-content">
          <div class="search-wrapper">
            <div class="row m-0">
              <h3>{{ search }}</h3>
              <router-link to="" class="pl-4">
                <h3 v-on:click="resetSearchFilter(form)">{{ resetForm }}</h3>
              </router-link>
            </div>
            <ValidationObserver v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(onSubmit)">
                <div class="row align-items-center">
                  <div class="col-md-3 pr-3">
                    <ValidationProvider
                      :name="sEmail"
                      rules=""
                      v-slot="{ errors }"
                    >
                      <IxInput
                        v-model="form.email"
                        inputType="email"
                        className="form-control"
                        :inputName="sEmail"
                        :inputPlaceholder="sEmail"
                      ></IxInput>

                      <span class="text-danger validation-error">{{
                        errors[0]
                      }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="col-md-3 pl-3  pr-3">
                    <ValidationProvider
                      :name="kata_first_name"
                      rules=""
                      v-slot="{ errors }"
                    >
                      <IxInput
                        v-model="form.kata_first_name"
                        inputType="text"
                        className="form-control"
                        :inputName="kata_first_name"
                        :inputPlaceholder="ph_kata_first_name"
                      ></IxInput>

                      <span class="text-danger validation-error">{{
                        errors[0]
                      }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="col-md-3 pl-3  pr-3">
                    <ValidationProvider
                      :name="kata_last_name"
                      rules=""
                      v-slot="{ errors }"
                    >
                      <IxInput
                        v-model="form.kata_last_name"
                        inputType="text"
                        className="form-control"
                        :inputName="kata_last_name"
                        :inputPlaceholder="ph_kata_last_name"
                      ></IxInput>

                      <span class="text-danger validation-error">{{
                        errors[0]
                      }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="col-md-3 pl-3">
                    <IxButton
                      className="btn btn-purple btn-sm btn-block search-btn"
                      btnType="submit"
                      >{{ search }}</IxButton
                    >
                  </div>
                </div>
              </form>
            </ValidationObserver>
          </div>
          <IxTable :tableConfig="tableConfig">
            <tr v-for="(row, index) in paginateData.data" :key="index">
              <td class="text-purple font-weight-bold">#{{ row.id }}</td>
              <td class="font-weight-bold">
                {{ row.kata_first_name + " " + row.kata_last_name }}
              </td>
              <td class="text-purple">{{ row.email }}</td>
              <td>{{ row.sex }}</td>
              <td>
                <span
                  v-if="row.status == 'INACTIVE'"
                  class="badge badge-secondary px-2 py-1"
                  >{{ userStatus.INACTIVE }}</span
                >
                <span
                  v-if="row.status == 'ACTIVE'"
                  class="badge badge-success px-2 py-1"
                  >{{ userStatus.ACTIVE }}</span
                >
                <span
                  v-if="row.status == 'DELETE'"
                  class="badge badge-danger px-2 py-1"
                  >{{ userStatus.DELETE }}</span
                >
                <span
                  v-if="row.status == 'WITH_HOLD'"
                  class="badge badge-warning px-2 py-1"
                  >{{ userStatus.WITH_HOLD }}</span
                >
              </td>
              <td>
                <div class="nav-item dropdown">
                  <a
                    class="float-right table-action"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="false"
                    aria-expanded="false"
                  >
                    <font-awesome-icon icon="ellipsis-v" />
                  </a>
                  <div class="dropdown-menu" aria-labelledby="actionDropdown">
                    <router-link
                      class="dropdown-item"
                      :to="{ path: '/admin/users/edit/' + row['id'] }"
                    >
                      {{ pEdit }}
                    </router-link>
                    <div class="dropdown-divider"></div>
                    <a
                      class="dropdown-item"
                      @click="onDelete(row['id'])"
                      href="#"
                      >{{ pDelete }}</a
                    >
                  </div>
                </div>
              </td>
            </tr>
          </IxTable>

          <div class="pagination-wrapper">
            <span class="pagination-info"
              >{{ paginateData.total }} {{ pTotal }} {{ paginateData.from }}
              {{ pFrom }} {{ paginateData.to }} {{ pShow }}</span
            >
            <pagination
              :data="paginateData"
              @pagination-change-page="getPaginateResults"
            >
              <span slot="prev-nav"
                ><font-awesome-icon icon="arrow-left"
              /></span>
              <span slot="next-nav"
                ><font-awesome-icon icon="arrow-right"
              /></span>
            </pagination>
          </div>

          <b-modal id="confirm-modal" hide-footer hide-header size="sm">
            <div class="d-block text-center">
              <h5>{{ nDelete }}</h5>
              <b-button
                class="mt-3 btn-danger"
                @click="$bvModal.hide('confirm-modal')"
                >{{ no }}</b-button
              >
              <b-button
                class="mt-3 btn-success ml-3"
                @click="confirmDelete()"
                >{{ yes }}</b-button
              >
            </div>
          </b-modal>
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
import IxTable from "@/components/basic/ix-admin/Ix-basic-table";
import { Form } from "vform";
import IxInput from "@/components/basic/ix-admin/Ix-basic-input";

export default {
  name: "AdminUsers",
  data() {
    return {
      form: new Form({
        kata_first_name: null,
        kata_last_name: null,
        kana_first_name: null,
        kana_last_name: null,
        email: null
      }),

      paginateData: {},

      currentPage: 1
    };
  },
  components: { AgTopbar, AgSitebar, IxButton, IxTable, IxInput },
  computed: {
    ...mapGetters({
      panelUsers: "adminUser/getPannelUsers"
    })
  },
  created() {
    this.getPanelUserAction().then(res => {
      if (res.data.success && res.data.data && res.data.data.users) {
        this.paginateData = res.data.data.users;
      }
    });
  },
  // watch: {},
  // mounted: {},
  methods: {
    ...mapActions({
      getPanelUserAction: "adminUser/getPanelUserAction"
    }),

    ...mapActions({
      deleteData: "adminUser/deleteUser"
    }),

    ...mapActions({
      getSearchListAction: "adminUser/getSearchListAction"
    }),

    onSubmit() {
      this.getSearchListAction(this.form).then(res => {
        if (res.data.success && res.data.data && res.data.data.users) {
          this.paginateData = res.data.data.users;
        }
      });
    },

    getPaginateResults(page = 1) {
      this.currentPage = page;
      this.getPanelUserAction(page).then(res => {
        if (res.data.success && res.data.data && res.data.data.users) {
          this.paginateData = res.data.data.users;
        }
      });
    },

    onDelete(id) {
      this.$bvModal.show("confirm-modal");
      this.dataId = id;
      //console.log(this.actionConfig.redirectUrl);
    },

    confirmDelete() {
      this.$bvModal.hide("confirm-modal");
      this.deleteData(this.dataId)

        .then(() => {
          this.$bvToast.toast("You have successfully deleted a new user.", {
            title: `SUCCESS!`,
            variant: "success",
            solid: true,
            autoHideDelay: 5000
          });
          this.getPanelUserAction(this.currentPage).then(res => {
            if (res.data.success && res.data.data && res.data.data.users) {
              this.paginateData = res.data.data.users;
            }
          });
        })
        .catch(() => {
          this.$bvToast.toast("Something went Wrong, Please Try Again.", {
            title: `ERROR!`,
            variant: "danger",
            solid: true,
            autoHideDelay: 5000
          });
        });
    },
    resetSearchFilter(form) {
      this.resetSearch(form);
      this.getPanelUserAction().then(res => {
        if (res.data.success && res.data.data && res.data.data.users) {
          this.paginateData = res.data.data.users;
        }
      });
    }
  }
};
</script>

<style scoped></style>
