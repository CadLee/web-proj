<template>
    <div class="container mt-4">
      <h1>Welcome to GameStore</h1>
      <p>Discover trending games, add to your wishlist, and shop your favorites!</p>
      <div class="row">
        <div class="col-md-6">
            <router-link to="/game/3"><img src="../../gamecover/fifa.jpg" class="img-fluid rounded" alt="Trending Game 1" /></router-link>
        </div>
        <div class="col-md-6">
            <router-link to="/game/8"><img src="../../gamecover/stardew.jpg" class="img-fluid rounded" alt="Trending Game 2" /></router-link>
        </div>
      </div>
      <h2 class="mt-5">Trending Games</h2>
      <div class="row">
        <div class="col-md-4" v-for="game in trendingGames" :key="game.id">
          <GameCard :game="game" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import GameCard from '../components/GameCard.vue'
  import { getTrendingGames } from '../data/games'
  
  const trendingGames = ref([])
  onMounted(async () => {
    trendingGames.value = await getTrendingGames()
  })
  </script>