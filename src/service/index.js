
import http from './http.js';
const service = {
  http
};
const install = Vue => {
  Vue.prototype.$service = service;
};
export default { install };
