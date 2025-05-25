import games from './games.json'

export function getTrendingGames() {
  return games.slice(0, 3)
}

export function getAllGames() {
  return games
}

export function getGameById(id) {
  return games.find(game => game.id === Number(id))
}
