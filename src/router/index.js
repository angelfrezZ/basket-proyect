import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import login from '../views/loginPage.vue'
import register from '../views/registerPage.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import store from '../store/index.js';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',
    component: register,
    meta: {
      hideNavbar: true,

    }
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      hideNavbar: true,

    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
        store.commit('userState', user);
        // console.log(store.state.user);
      },
      reject
    )
  })
}

router.beforeEach(async (to, from, next) => {
  if (!to.meta.hideNavbar) {
    if (await getCurrentUser()) next()
    else next('/login');
  } else {
    if (await getCurrentUser()) next('/')
    else next();
  }
})

export default router
