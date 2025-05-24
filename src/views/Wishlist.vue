<template>
    <div class="container mt-4">
      <h2>Your Wishlist</h2>
      <div class="row">
        <div class="col-md-4 mb-3" v-for="game in wishlist.items" :key="game.id">
          <GameCard :game="game" />
        </div>
      </div>
    </div>
  </template>
  <script setup>
  import { useWishlistStore } from '../stores/wishlist'
  import GameCard from '../components/GameCard.vue'
  const wishlist = useWishlistStore()
  </script>
  