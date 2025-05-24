export default {
  namespaced: true,
  state: () => ({
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    wishlist: JSON.parse(localStorage.getItem('wishlist')) || []
  }),
  mutations: {
    ADD_TO_CART(state, game) {
      if (!state.cart.find(g => g.id === game.id)) {
        state.cart.push(game)
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }
    },
    REMOVE_FROM_CART(state, gameId) {
      state.cart = state.cart.filter(g => g.id !== gameId)
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    ADD_TO_WISHLIST(state, game) {
      if (!state.wishlist.find(g => g.id === game.id)) {
        state.wishlist.push(game)
        localStorage.setItem('wishlist', JSON.stringify(state.wishlist))
      }
    },
    REMOVE_FROM_WISHLIST(state, gameId) {
      state.wishlist = state.wishlist.filter(g => g.id !== gameId)
      localStorage.setItem('wishlist', JSON.stringify(state.wishlist))
    },
    CLEAR_CART(state) {
      state.cart = []
      localStorage.setItem('cart', JSON.stringify(state.cart))
    }
  },
  getters: {
    cart: state => state.cart,
    wishlist: state => state.wishlist
  }
}
