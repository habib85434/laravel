
require('./bootstrap');

window.Vue = require('vue');
import VueRouter from 'vue-router';
import Dashboard from './components/Dashboard.vue';
import Profile from './components/Profile.vue';
import Example from './components/ExampleComponent.vue';
import Users from './components/Users.vue';

// vform
import { Form, HasError, AlertError } from 'vform';
window.Form = Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
// vform end

Vue.use(VueRouter);

let routes = [
    // { path: '/dashboard', component: require('./components/Dashboard.vue') },
    { path: '/dashboard', component: Dashboard },
    { path: '/profile', component: Profile },
    { path: '/user', component: Users }
];

const router = new VueRouter({
    mode:'history', //for removing the # from url
    routes //short from of routes: routes
});


Vue.component('example-component', Example.default); 



const app = new Vue({
    el: '#app',
    router
});
