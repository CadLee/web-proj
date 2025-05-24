<!-- src/views/GamePage.vue -->
<template>
    <div class="container mt-4" v-if="game">
      <div class="row">
        <div class="col-md-6">
          <img :src="game.cover" class="img-fluid rounded mb-3" :alt="game.title + ' cover'" />
        </div>
        <div class="col-md-6">
          <h2>{{ game.title }}</h2>
          <span class="badge bg-primary">{{ game.category }}</span>
          <div class="mt-2">
            <span v-for="tag in game.tags" :key="tag" class="badge bg-secondary me-1">{{ tag }}</span>
          </div>
          <h4 class="mt-3">${{ game.price.toFixed(2) }}</h4>
          <div class="btn-group mt-2" v-if="isAuthenticated">
            <button class="btn btn-success" @click="addToCart(game)">Add to Cart</button>
            <button class="btn btn-outline-danger" @click="toggleWishlist(game)">
              {{ isWishlisted(game) ? 'Remove from Wishlist' : 'Add to Wishlist' }}
            </button>
          </div>
          <div class="btn-group mt-2" v-if="!isAuthenticated">
            <button class="btn btn-success" @click="GoToLogin()">Add to Cart</button>
            <button class="btn btn-outline-danger" @click="GoToLogin()">Add to Wishlist</button>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <h4>Comments</h4>
        <CommentSection :gameId="game.id" />
      </div>
    </div>
    <div v-else class="container mt-4">
      <p>Loading...</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { getGameById } from '../data/games'
  import { useCartStore } from '../stores/cart'
  import { useWishlistStore } from '../stores/wishlist'
  import CommentSection from '../components/CommentSection.vue'
  
  const router = useRouter()
  const route = useRoute()
  const game = ref(null)
  const cart = useCartStore()
  const wishlist = useWishlistStore()
  
  onMounted(async () => {
    game.value = await getGameById(route.params.id)
  })
  
  const GoToLogin = () => {
    router.push('/login')
  }
  const addToCart = (game) => cart.add(game)
  const toggleWishlist = (game) => wishlist.toggle(game)
  const isWishlisted = (game) => wishlist.has(game.id)

  import { computed } from 'vue'
  import { useAuthStore } from '../stores/auth'
  const auth = useAuthStore()
  const isAuthenticated = computed(() => auth.isAuthenticated)
  </script>
  