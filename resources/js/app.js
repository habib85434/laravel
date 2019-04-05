
require('./bootstrap');

window.Vue = require('vue');
import VueRouter                        from 'vue-router';
import Dashboard                        from './components/Dashboard.vue';
import Profile                          from './components/Profile.vue';
import Developer                        from './components/developer.vue';
import Example                          from './components/ExampleComponent.vue';
import Users                            from './components/Users.vue';
import moment                           from 'moment';
import VueProgressBar                   from 'vue-progressbar';
import Swal                             from 'sweetalert2';
import { Form, HasError, AlertError }   from 'vform';

// vform Start
window.Form = Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
// vform End


//Router Start
Vue.use(VueRouter);

let routes = [
    // { path: '/dashboard', component: require('./components/Dashboard.vue') },
    { path: '/dashboard', component: Dashboard },
    { path: '/developer', component: Developer },
    { path: '/profile', component: Profile },
    { path: '/user', component: Users }
];

const router = new VueRouter({
    mode:'history', //for removing the # from url
    routes //short from of routes: routes
});
//Router End


//Filter Start
Vue.filter('upText',function(text){
    return text.charAt(0).toUpperCase() + text.slice(1)
});

Vue.filter('formattedDate', function(theDate){
    return moment().format('MMMM Do YYYY');
});
//Finter End

//Progress bar Start
const options = {
    color: '#bffaf3',
    failedColor: '#874b4b',
    thickness: '5px',
    transition: {
      speed: '0.2s',
      opacity: '0.6s',
      termination: 300
    },
    autoRevert: true,
    location: 'top',
    inverse: false
  }
  
  Vue.use(VueProgressBar, options)
//Progress bar End

//Sweet Alert Start
window.swal = Swal;

const Toast = Swal.mixin({
    toast: true,
    // position: 'top-end',
    position: 'top',
    showConfirmButton: false,
    timer: 3000
  });

  window.Toast = Toast;
//Sweet Alert End


//Custom Event Loading Globally Start
let Fire = new Vue();
window.Fire = Fire;
//Custom Event Loading Globally End

//Passport api authentification Start
Vue.component(
  'passport-clients',
  require('./components/passport/Clients.vue').default
);

Vue.component(
  'passport-authorized-clients',
  require('./components/passport/AuthorizedClients.vue').default
);

Vue.component(
  'passport-personal-access-tokens',
  require('./components/passport/PersonalAccessTokens.vue').default
);
//Passport api authentification End


Vue.component('example-component', Example.default); 

const app = new Vue({
    el: '#app',
    router
});
