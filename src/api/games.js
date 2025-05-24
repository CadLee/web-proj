import games from '../data/games.json'

export function getTrendingGames() {
  // Return first 3 games as trending (customize as needed)
  return games.slice(0, 3)
}

export function getAllGames() {
  return games
}

export function getGameById(id) {
  return games.find(game => game.id === Number(id))
}
