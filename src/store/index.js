import { createStore } from 'vuex'
import auth from './auth'
import games from './games'
import cart from './cart'

export default createStore({
  modules: {
    auth,
    games,
    cart
  }
})
