import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import AdminLogin from "../views/pages/admin/login/LoginForm.vue";
import AdminDashboard from "../views/pages/admin/dashboard/AdminDashboard.vue";
import AdminUsers from "../views/pages/admin/users/AdminUsers.vue";
import AdminUserCreate from "../views/pages/admin/users/AdminUserCreate.vue";
import AdminUserEdit from "../views/pages/admin/users/AdminUserEdit.vue";

import store from "@/store";

Vue.use(VueRouter);

const routes = [
  //Public Site
  {
    path: "/",
    name: "Home",
    component: Home
  },

  //Admin Panel
  {
    path: "/admin",
    name: "Admin",
    component: AdminLogin
  },
  {
    path: "/admin/dashboard",
    name: "AdminDashboard",
    component: AdminDashboard,
    props: true
    // beforeEnter: (to, from, next) => {
    //   if (
    //     !store.getters["auth/authenticated"] ||
    //     (store.getters["auth/authenticated"] &&
    //       store.getters["auth/authenticated"].user_type != "ADMIN")
    //   )
    //     return next({
    //       name: "Admin"
    //     });
    //   next();
    // }
  },

  //Users
  {
    path: "/admin/users",
    name: "AdminUsers",
    component: AdminUsers,
    props: true,
    beforeEnter: (to, from, next) => {
      if (
        !store.getters["auth/authenticated"] ||
        (store.getters["auth/authenticated"] &&
          store.getters["auth/authenticated"].user_type != "ADMIN")
      )
        return next({
          name: "Admin"
        });
      next();
    }
  },
  {
    path: "/admin/users/create",
    name: "AdminUserCreate",
    component: AdminUserCreate,
    props: true,
    beforeEnter: (to, from, next) => {
      if (
        !store.getters["auth/authenticated"] ||
        (store.getters["auth/authenticated"] &&
          store.getters["auth/authenticated"].user_type != "ADMIN")
      )
        return next({
          name: "Admin"
        });
      next();
    }
  },
  {
    path: "/admin/users/edit/:id",
    name: "AdminUserEdit",
    component: AdminUserEdit,
    props: true,
    beforeEnter: (to, from, next) => {
      if (
        !store.getters["auth/authenticated"] ||
        (store.getters["auth/authenticated"] &&
          store.getters["auth/authenticated"].user_type != "ADMIN")
      )
        return next({
          name: "Admin"
        });
      next();
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  }
});
export default router;
