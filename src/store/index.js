import Vue from 'vue'
import Vuex from 'vuex'

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDO0pUrcfauLaoK1aj0g6cJt9vZpUfXQtM",
  authDomain: "baskett-proyect.firebaseapp.com",
  projectId: "baskett-proyect",
  storageBucket: "baskett-proyect.appspot.com",
  messagingSenderId: "500416793165",
  appId: "1:500416793165:web:c56f9da9f71d30d93d6a04"
};

 const app = initializeApp(firebaseConfig)

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    db: getFirestore(app),
    auth: getAuth(app),
    cantidad: 1,
		talla: [
			'S',
			'M',
			'L',
			'XL',
		],
    tallaSeleccionada: '',

  },
  getters: {
  },
  mutations: {
    userState(state, data) {
      state.user = data
    }
  },
  actions: {
  },
  modules: {
  }
})
