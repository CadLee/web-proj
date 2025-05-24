<template>
  <div class="container mt-5" style="margin-top: 80px !important;">
    <h2 class="mb-4">Latest News</h2>
    <div class="row mb-4 g-3">
      <div class="col-md-3">
        <input v-model="searchDate" type="date" class="form-control">
      </div>
      <div class="col-md-3">
        <input v-model="searchTitle" type="text" class="form-control" placeholder="Search title">
      </div>
      <div class="col-md-3">
        <input v-model="searchContent" type="text" class="form-control" placeholder="Search content">
      </div>
      <div class="col-md-3">
        <select v-model="searchCategory" class="form-select">
          <option value="">All Categories</option>
          <option>Release</option>
          <option>Promotion</option>
          <option>Event</option>
        </select>
      </div>
    </div>
    <div v-for="item in paginatedNews" :key="item.id" class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">{{ item.title }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">
          {{ item.date }} | {{ item.category }}
        </h6>
        <p class="card-text">{{ item.content }}</p>
      </div>
    </div>
    <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="currentPage--">Previous</button>
        </li>
        <li 
          v-for="page in totalPages" 
          :key="page" 
          class="page-item"
          :class="{ active: currentPage === page }"
        >
          <button class="page-link" @click="currentPage = page">
            {{ page }}
          </button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="currentPage++">Next</button>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script setup>
import newsData from '../assets/news.json'
import { ref, computed, watch } from 'vue'
const news = ref(newsData)
const searchDate = ref('')
const searchTitle = ref('')
const searchContent = ref('')
const searchCategory = ref('')
const currentPage = ref(1)
const itemsPerPage = 4
const filteredNews = computed(() => {
  return news.value.filter(item => {
    const dateMatch = !searchDate.value || item.date.includes(searchDate.value)
    const titleMatch = item.title.toLowerCase().includes(searchTitle.value.toLowerCase())
    const contentMatch = item.content.toLowerCase().includes(searchContent.value.toLowerCase())
    const categoryMatch = !searchCategory.value || item.category === searchCategory.value
    return dateMatch && titleMatch && contentMatch && categoryMatch
  })
})
const totalPages = computed(() => Math.ceil(filteredNews.value.length / itemsPerPage))
const paginatedNews = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredNews.value.slice(start, start + itemsPerPage)
})
watch(filteredNews, () => { currentPage.value = 1 })
</script>
