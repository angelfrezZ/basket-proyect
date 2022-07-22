import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import login from '../views/loginPage.vue'
import register from '../views/registerPage.vue'
import form from '../views/formPage.vue'
import zapatillas from '../NBA/zapatillasN.vue'
import camisetas1 from '../NBA/camisetasOne.vue'
import camisetas2 from '../NBA/camisetasTwo.vue'
import camisetas3 from '../NBA/camisetasTree.vue'
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
    path: '/form',
    name: 'form',
    component: form
  },
  {
    path: '/zapatillas',
    name: 'zapatillas',
    component: zapatillas
  },
  {
    path: '/camisetas',
    name: 'camisetas1',
    component: camisetas1
  },
  {
    path: '/camisetas/:id',
    name: 'camisetas2',
    component: camisetas2
  },
  {
    path: '/camisetas/:id/comprar',
    name: 'camisetas3',
    component: camisetas3
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
