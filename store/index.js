import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	  location:{
		  lat: 39.14111,
		  lng: 117.00739
	  }
  },
  getters: {
    getLocation(state) {
      return state.location
    },
  },
  mutations: {
    SET_LOCATION: (state, location) => {
      state.location = location
    },
  },
  actions: {
    setLocation({ commit, state },info) {
      commit('SET_LOCATION',info)
    }
	
  }
})
