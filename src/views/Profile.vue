<template>
  <div class="container mt-5" style="margin-top: 80px !important;">
    <h2>Your Purchased Games</h2>
    <div v-if="purchasedGames.length === 0" class="alert alert-info">
      You have not purchased any games yet.
    </div>
    <div class="row">
      <div v-for="game in purchasedGames" :key="game.id" class="col-md-4 mb-4">
        <div class="card h-100">
          <img :src="game.image" class="card-img-top" :alt="game.title" />
          <div class="card-body">
            <h5 class="card-title">{{ game.title }}</h5>
            <p class="card-text">{{ game.description }}</p>
            <p class="h5 text-success">${{ game.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const purchasedGames = computed(() => store.getters['auth/purchasedGames'])
</script>
