import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('currentUser')) || null
  }),
  getters: {
    isAuthenticated: (state) => !!state.user
  },
  actions: {
    login(username, password) {
      // For demo, password is not checked. In production, hash and check!
      const userKey = `user_${username}`
      let userData = JSON.parse(localStorage.getItem(userKey))
      if (!userData) {
        // If new user, create entry
        userData = {
          username,
          email: '', // Can be set during registration
          purchased: []
        }
        localStorage.setItem(userKey, JSON.stringify(userData))
      }
      this.user = { username }
      localStorage.setItem('currentUser', JSON.stringify(this.user))
    },
    logout() {
      this.user = null
      localStorage.removeItem('currentUser')
    },
    updateUserData(newData) {
      if (!this.user) return
      const userKey = `user_${this.user.username}`
      localStorage.setItem(userKey, JSON.stringify(newData))
    },
    getUserData() {
      if (!this.user) return null
      const userKey = `user_${this.user.username}`
      return JSON.parse(localStorage.getItem(userKey))
    }
  }
})
