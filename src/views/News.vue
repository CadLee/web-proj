<template>
    <div class="container mt-4">
      <h2>Latest News</h2>
      <input v-model="search" class="form-control my-2" placeholder="Search news..." />
      <div class="list-group">
        <div
          v-for="item in paginatedNews"
          :key="item.id"
          class="list-group-item"
        >
          <h5>{{ item.title }} <small class="text-muted">{{ item.date }}</small></h5>
          <span class="badge bg-secondary">{{ item.category }}</span>
          <p>{{ item.content }}</p>
        </div>
      </div>
      <nav>
        <ul class="pagination mt-3">
          <li class="page-item" :class="{disabled: page===1}" @click="page > 1 && page--"><a class="page-link" href="#">Prev</a></li>
          <li class="page-item" v-for="n in totalPages" :key="n" :class="{active: page===n}" @click="page=n"><a class="page-link" href="#">{{ n }}</a></li>
          <li class="page-item" :class="{disabled: page===totalPages}" @click="page < totalPages && page++"><a class="page-link" href="#">Next</a></li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import newsData from '../data/news.json'
  
  const search = ref('')
  const page = ref(1)
  const perPage = 5
  
  const filteredNews = computed(() =>
    newsData.filter(item =>
      item.title.toLowerCase().includes(search.value.toLowerCase()) ||
      item.content.toLowerCase().includes(search.value.toLowerCase()) ||
      item.category.toLowerCase().includes(search.value.toLowerCase()) ||
      item.date.includes(search.value)
    )
  )
  
  const totalPages = computed(() =>
    Math.ceil(filteredNews.value.length / perPage)
  )
  
  const paginatedNews = computed(() =>
    filteredNews.value.slice((page.value - 1) * perPage, page.value * perPage)
  )
  </script>  