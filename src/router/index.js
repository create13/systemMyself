import Vue from 'vue';
import Router from 'vue-router';
import childs from './routers.js';
// import store from '../store';
const Header = () => import('@/components/header');
const Login = () => import('@/views/login');
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'main'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/header',
      name: 'header',
      component: Header,
      children: childs
    },
    // 404
    {
      path: '*',
      component: Login
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (sessionStorage.userInfo) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});
export default router;
