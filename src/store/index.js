import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    onMobile: null,
  },
  mutations: {
    set(state, newState) {
      state.onMobile = newState;
    },
  },
  actions: {},
  modules: {},
});
