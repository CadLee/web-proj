<template>
    <div class="container mt-4" v-if="userData">
      <h2>Profile</h2>
      <div class="card mb-4">
        <div class="card-body">
            <h5 class="card-title">{{ userData.username }}</h5>
            <p class="card-text"><strong>Email:</strong> {{ userData.email || 'Not set' }}</p>
            <UserWallet />
        </div>
      </div>
      <h4>Purchased Games</h4>
      <div v-if="purchasedGames.length">
        <div class="row">
          <div class="col-md-4 mb-3" v-for="game in purchasedGames" :key="game.id">
            <div class="card h-100">
              <img :src="game.cover" class="card-img-top" :alt="game.title + ' cover'" />
              <div class="card-body">
                <h5 class="card-title">{{ game.title }}</h5>
                <span class="badge bg-primary">{{ game.category }}</span>
                <div class="mt-2">
                  <span v-for="tag in game.tags" :key="tag" class="badge bg-secondary me-1">{{ tag }}</span>
                </div>
                <p class="card-text mt-2">${{ game.price.toFixed(2) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>No games purchased yet.</p>
      </div>
    </div>
    <div v-else class="container mt-4">
      <p>Please log in to view your profile.</p>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { useAuthStore } from '../stores/auth'
  import gamesData from '../data/games.json'
  import UserWallet from '../components/UserWallet.vue'
  
  const auth = useAuthStore()
  
  const userData = computed(() => {
    if (!auth.user) return null
    const userKey = `user_${auth.user.username}`
    return JSON.parse(localStorage.getItem(userKey))
  })
  
  const purchasedGames = computed(() => {
    if (!userData.value || !userData.value.purchased) return []
    return gamesData.filter(game => userData.value.purchased.includes(game.id))
  })
  </script>
  