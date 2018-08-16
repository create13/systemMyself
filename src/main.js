import Vue from 'vue';
import App from './App';
import router from './router';
import iView from 'iview';
import store from './store';
import 'iview/dist/styles/iview.css';
import Service from './service';
import Package from './package';
import axios from 'axios';
Vue.use(iView);
Vue.use(Service);
Vue.use(Package);
Vue.config.productionTip = false;
// axios.defaults.baseURL = 'http://192.168.0.20:4403/';
axios.interceptors.request.use(config => {
  return config;
}, err => {
  return Promise.reject(err);
});
axios.interceptors.response.use(response => {
  if (response.data.status === '1000' || response.data.status === '2000') {
    router.replace({path: '/login'});
  }
  return response.data;
}, err => {
  return Promise.reject(err);
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
