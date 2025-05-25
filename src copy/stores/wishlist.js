import { defineStore } from 'pinia'
export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('wishlist')) || [],
    ignored: JSON.parse(localStorage.getItem('ignored')) || []
  }),
  actions: {
    toggle(game) {
      if (this.items.find(g => g.id === game.id)) {
        this.items = this.items.filter(g => g.id !== game.id)
      } else {
        this.items.push(game)
      }
      localStorage.setItem('wishlist', JSON.stringify(this.items))
    },
    has(id) {
      return this.items.some(g => g.id === id)
    },
    ignore(id) {
      this.ignored.push(id)
      localStorage.setItem('ignored', JSON.stringify(this.ignored))
    }
  }
})
