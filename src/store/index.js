import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    rolename: [],
    goodsList: [],
    options: [],
    rights: []
  },
  getters: {
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setrolename (state, payload) {
      state.rolename = payload
    },
    setgoodsList (state, payload) {
      state.goodsList = payload
    },
    setoptions (state, payload) {
      state.options = payload
    },
    setrights (state, payload) {
      state.rights = payload
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
