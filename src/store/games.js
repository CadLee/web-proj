import gamesData from '../assets/games.json'

export default {
  namespaced: true,
  state: () => ({
    games: gamesData,
    comments: [] // {gameId, user, text, date}
  }),
  mutations: {
    ADD_COMMENT(state, comment) {
      state.comments.push(comment)
    },
    DELETE_COMMENT(state, commentId) {
      state.comments = state.comments.filter(c => c.id !== commentId)
    }
  },
  getters: {
    getGameById: state => id => state.games.find(g => g.id == id),
    getCommentsByGame: state => gameId => state.comments.filter(c => c.gameId == gameId)
  }
}
