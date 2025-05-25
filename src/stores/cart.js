import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('cart')) || []
  }),
  actions: {
    add(game) {
      if (!this.items.find(g => g.id === game.id)) {
        this.items.push(game)
        localStorage.setItem('cart', JSON.stringify(this.items))
      }
    },
    remove(gameId) {
      this.items = this.items.filter(g => g.id !== gameId)
      localStorage.setItem('cart', JSON.stringify(this.items))
    },
    clear() {
      this.items = []
      localStorage.setItem('cart', JSON.stringify([]))
    }
  }
})
