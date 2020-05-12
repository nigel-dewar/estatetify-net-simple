import '@babel/polyfill';
import './css/site.css';
// Add JQuery
// import jQuery from 'jquery';
// window.jQuery = window.$ = jQuery;
// Add Vue
import Vue from 'vue';
// Add Vuex Store
import store from './store';
// Add VueRouter libs
import VueRouter from "vue-router";
import { sync } from "vuex-router-sync";
import router from "./router";
Vue.use(VueRouter);
//import axios from 'axios';
// Add Bootstrap-Vue
import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);
// Add Vuetify
//import Vuetify from 'vuetify';
//import "vuetify/dist/vuetify.min.css";
//import 'material-design-icons-iconfont/dist/material-design-icons.css';
//Vue.use(Vuetify);
// Add main App Component
import App from "./App.vue";
// Add Office Ui Fabric - Not using at this stage
// import OfficeUIFabricVue from 'office-ui-fabric-vue';
// // import css style
// import 'office-ui-fabric-vue/dist/index.css';
// Vue.use(OfficeUIFabricVue);
// Sync the store with the router
sync(store, router);
var app = new Vue({
    el: "#app",
    store: store,
    router: router,
    render: function (h) { return h(App); }
});
export { app, router, store };
//# sourceMappingURL=main.js.map