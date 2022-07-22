import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    email: 'taverasluisangel6@gmail.com',
    nombre: 'luis angel taveras',
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
  },
  actions: {
  },
  modules: {
  }
})
