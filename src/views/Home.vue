<template>
  <div class="container mt-5" style="margin-top: 80px !important;">
    <h1 class="mb-3">Welcome to Game Store!</h1>
    <p class="lead mb-4">
      Discover trending and latest games. Browse, wishlist, and stay updated with the newest releases!
    </p>
    <div class="row">
      <div class="col-md-6 mb-3">
        <img src="../assets/game1.jpg" alt="Game 1" class="img-fluid rounded shadow-sm" />
      </div>
      <div class="col-md-6 mb-3">
        <img src="../assets/game2.jpg" alt="Game 2" class="img-fluid rounded shadow-sm" />
      </div>
    </div>
    <h2 class="mt-5">Trending Games</h2>
    <div class="row">
      <GameCard v-for="game in trendingGames" :key="game.id" :game="game" />
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import GameCard from '../components/GameCard.vue'
const store = useStore()
const trendingGames = computed(() => store.state.games.games.slice(0, 2))
</script>
