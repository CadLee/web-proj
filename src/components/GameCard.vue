<template>
  <div class="card h-100">
    <img :src="getCoverUrl(game.cover)" class="card-img-top" :alt="game.title + ' cover'" />
    <div class="card-body">
      <h5 class="card-title">{{ game.title }}</h5>
      <span class="badge bg-primary">{{ game.category }}</span>
      <div class="mt-2">
        <span v-for="tag in game.tags" :key="tag" class="badge bg-secondary me-1">{{ tag }}</span>
      </div>
      <p class="card-text mt-2">${{ game.price.toFixed(2) }}</p>
      <router-link :to="`/game/${game.id}`" class="btn btn-outline-primary btn-sm">View</router-link>
    </div>
  </div>
</template>

<script setup>
defineProps(['game'])
const getCoverUrl = (cover) => cover ? `/cos30043/s104225535/A3/${cover}` : '/cos30043/s104225535/A3/gamecover/game1.jpg'
</script>
