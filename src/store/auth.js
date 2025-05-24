// src/store/auth.js
export default {
  namespaced: true,
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    purchasedGames: JSON.parse(localStorage.getItem('purchasedGames')) || []
  }),
  mutations: {
    SET_USER(state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    LOGOUT(state) {
      state.user = null
      state.purchasedGames = []
      localStorage.removeItem('user')
      localStorage.removeItem('purchasedGames')
    },
    ADD_PURCHASED_GAMES(state, games) {
      // Avoid duplicates by id
      const existingIds = new Set(state.purchasedGames.map(g => g.id))
      const newGames = games.filter(g => !existingIds.has(g.id))
      state.purchasedGames = [...state.purchasedGames, ...newGames]
      localStorage.setItem('purchasedGames', JSON.stringify(state.purchasedGames))
    }
  },
  actions: {
    login({ commit }, credentials) {
      // Your login logic here
    },
    logout({ commit }) {
      commit('LOGOUT')
    },
    addPurchasedGames({ commit }, games) {
      commit('ADD_PURCHASED_GAMES', games)
    }
  },
  getters: {
    isAuthenticated: state => !!state.user,
    user: state => state.user,
    purchasedGames: state => state.purchasedGames
  }
}
