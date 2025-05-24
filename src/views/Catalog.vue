<template>
    <div class="container mt-4">
      <h2>Game Catalog</h2>
      <div class="row mb-3">
        <div class="col-md-4">
          <input v-model="search" class="form-control" placeholder="Search games..." />
        </div>
        <div class="col-md-4">
          <select v-model="category" class="form-select">
            <option value="">All Categories</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>
        <div class="col-md-4">
          <input v-model="tag" class="form-control" placeholder="Tag (e.g. RPG)" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 mb-3" v-for="game in paginatedGames" :key="game.id">
          <GameCard :game="game" />
        </div>
      </div>
      <nav>
        <ul class="pagination">
          <li class="page-item" :class="{disabled: page===1}" @click="page > 1 && page--"><a class="page-link" href="#">Prev</a></li>
          <li class="page-item" v-for="n in totalPages" :key="n" :class="{active: page===n}" @click="page=n"><a class="page-link" href="#">{{ n }}</a></li>
          <li class="page-item" :class="{disabled: page===totalPages}" @click="page < totalPages && page++"><a class="page-link" href="#">Next</a></li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import GameCard from '../components/GameCard.vue'
  import { getAllGames } from '../api/games'
  
  const games = ref([])
  const search = ref('')
  const category = ref('')
  const tag = ref('')
  const page = ref(1)
  const perPage = 6
  
  onMounted(async () => {
    games.value = await getAllGames()
  })
  
  const categories = computed(() => [...new Set(games.value.map(g => g.category))])
  
  const filteredGames = computed(() =>
    games.value.filter(g =>
      (g.title.toLowerCase().includes(search.value.toLowerCase()) || g.tags.some(t => t.toLowerCase().includes(search.value.toLowerCase()))) &&
      (category.value === '' || g.category === category.value) &&
      (tag.value === '' || g.tags.includes(tag.value))
    )
  )
  const totalPages = computed(() => Math.ceil(filteredGames.value.length / perPage))
  const paginatedGames = computed(() =>
    filteredGames.value.slice((page.value - 1) * perPage, page.value * perPage)
  )
  </script>
  