<template>
  <div class="container mt-5" style="margin-top: 80px !important;">
    <h2 class="mb-4">All Games</h2>
    <div class="row mb-4">
      <div class="col-md-3">
        <input v-model="search" class="form-control" placeholder="Search games...">
      </div>
      <div class="col-md-3">
        <select v-model="category" class="form-select">
          <option value="">All Categories</option>
          <option v-for="cat in categories" :key="cat">{{ cat }}</option>
        </select>
      </div>
    </div>
    <div class="row">
      <GameCard v-for="game in paginatedGames" :key="game.id" :game="game" />
    </div>
    <!-- Pagination -->
    <nav>
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: page === 1 }">
          <button class="page-link" @click="page--" :disabled="page === 1">Previous</button>
        </li>
        <li class="page-item" v-for="n in totalPages" :key="n" :class="{ active: page === n }">
          <button class="page-link" @click="page = n">{{ n }}</button>
        </li>
        <li class="page-item" :class="{ disabled: page === totalPages }">
          <button class="page-link" @click="page++" :disabled="page === totalPages">Next</button>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import GameCard from '../components/GameCard.vue'
const store = useStore()
const search = ref('')
const category = ref('')
const page = ref(1)
const perPage = 6
const categories = computed(() => [...new Set(store.state.games.games.map(g => g.category))])
const filteredGames = computed(() =>
  store.state.games.games.filter(g =>
    (!search.value || g.title.toLowerCase().includes(search.value.toLowerCase())) &&
    (!category.value || g.category === category.value)
  )
)
const totalPages = computed(() => Math.ceil(filteredGames.value.length / perPage))
const paginatedGames = computed(() =>
  filteredGames.value.slice((page.value - 1) * perPage, page.value * perPage)
)
</script>
