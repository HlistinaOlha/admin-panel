export default {
  state: () => ({
    authToken: null
  }),
  getters: {
    isAuthenticated(state) {
      return !!state.authToken
    }
  },
  mutations: {
    setAuthToken(state, payload) {
      state.authToken = payload
    }
  },
  actions: {
    setToken({ commit }, token) {
      this.$api.token.setToken(token)
      commit('setAuthToken', token)
    },
    removeToken({ commit }, token) {
      this.$api.token.removeToken(token)
      commit('setAuthToken', null)
    },
    tryLogin({ commit }) {
      const token = this.$api.token.getToken()

      if (token) {
        commit('setAuthToken', token)
      }
    }
  }
}
