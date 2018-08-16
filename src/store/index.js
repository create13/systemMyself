import Vue from 'vue';
import Vuex from 'vuex';
import headerList from './module/headerList';
import loginInfo from './module/login';
import tabSaves from './module/tabChange';
import saveMenu from './module/leftMenu';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    headerList,
    loginInfo,
    tabSaves,
    saveMenu
  }
});
export default store;
