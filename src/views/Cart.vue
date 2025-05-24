<template>
    <div class="container mt-4">
      <h2>Your Cart</h2>
      <div v-if="cart.items.length">
        <div class="row">
          <div class="col-md-4 mb-3" v-for="game in cart.items" :key="game.id">
            <div class="card h-100">
              <img :src="getCoverUrl(game.cover)" class="card-img-top" :alt="game.title + ' cover'" />
              <div class="card-body">
                <h5 class="card-title">{{ game.title }}</h5>
                <span class="badge bg-primary">{{ game.category }}</span>
                <div class="mt-2">
                  <span v-for="tag in game.tags" :key="tag" class="badge bg-secondary me-1">{{ tag }}</span>
                </div>
                <p class="card-text mt-2">${{ game.price.toFixed(2) }}</p>
                <button class="btn btn-danger btn-sm mt-2" @click="removeFromCart(game.id)">Remove</button>
              </div>
            </div>
          </div>
        </div>
        <h4 class="mt-3">Total: ${{ total.toFixed(2) }}</h4>
        <button class="btn btn-success" @click="checkout">Checkout</button>
      </div>
      <div v-else>
        <p>Your cart is empty.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { useCartStore } from '../stores/cart'
  import { useAuthStore } from '../stores/auth'
  import { useRouter } from 'vue-router'
  
  const cart = useCartStore()
  const auth = useAuthStore()
  const router = useRouter()
  
  const total = computed(() => cart.items.reduce((sum, g) => sum + g.price, 0))
  const getCoverUrl = (cover) => cover ? `/assets/${cover}` : '/assets/default-cover.jpg'
  
  function removeFromCart(gameId) {
    cart.remove(gameId)
  }
  
  function checkout() {
    if (!auth.isAuthenticated) {
      alert('Please log in to checkout.')
      router.push('/login')
      return
    }
    // Get and update user data
    const userKey = `user_${auth.user.username}`
    let userData = JSON.parse(localStorage.getItem(userKey))
    if (!userData.purchased) userData.purchased = []
    cart.items.forEach(game => {
      if (!userData.purchased.includes(game.id)) {
        userData.purchased.push(game.id)
      }
    })
    localStorage.setItem(userKey, JSON.stringify(userData))
    cart.clear()
    alert('Checkout successful! Purchased games added to your profile.')
    router.push('/profile')
  }
  </script>
  