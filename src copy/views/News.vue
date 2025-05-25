<template>
    <div class="container mt-4">
        <h2 class="mb-4">Latest News</h2>
        <div class="row mb-3">
            <div class="col-md-3 mb-2">
            <input
                type="date"
                class="form-control"
                v-model="searchDate"
                placeholder="Search by date"
            />
            </div>
            <div class="col-md-3 mb-2">
            <input
                type="text"
                class="form-control"
                v-model="searchTitle"
                placeholder="Search by title"
            />
            </div>
            <div class="col-md-3 mb-2">
            <select class="form-select" v-model="searchCategory">
                 <option value="">All Categories</option>
                <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
            </div>
            <div class="col-md-3 mb-2">
            <input
                type="text"
                class="form-control"
                v-model="searchContent"
                placeholder="Search by content"
            />
            </div>
        </div>
        <div v-if="paginatedNews.length">
            <div class="list-group">
            <div
                v-for="item in paginatedNews"
                :key="item.id"
                class="list-group-item"
            >
                <div class="d-flex justify-content-between align-items-center">
                <h5 class="mb-1">{{ item.title }}</h5>
                <span class="badge bg-secondary">{{ item.category }}</span>
                </div>
                <small class="text-muted">{{ item.date }}</small>
                <p class="mb-1 mt-2">{{ item.content }}</p>
            </div>
            </div>
            <nav>
            <ul class="pagination mt-3">
                <li class="page-item" :class="{disabled: page===1}">
                <a class="page-link" href="#" @click.prevent="page > 1 && page--">Prev</a>
                </li>
                <li
                class="page-item"
                v-for="n in totalPages"
                :key="n"
                :class="{active: page===n}"
                >
                <a class="page-link" href="#" @click.prevent="page=n">{{ n }}</a>
                </li>
                <li class="page-item" :class="{disabled: page===totalPages}">
                <a class="page-link" href="#" @click.prevent="page < totalPages && page++">Next</a>
                </li>
            </ul>
            </nav>
        </div>
        <div v-else class="alert alert-info mt-4">
            No news found matching your search.
        </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import newsData from '../data/news.json'
  
  const searchDate = ref('')
  const searchTitle = ref('')
  const searchCategory = ref('')
  const searchContent = ref('')
  
  const page = ref(1)
  const perPage = 5
  
  const categories = computed(() => {
    const cats = newsData.map(item => item.category).filter(Boolean)
    return [...new Set(cats)]
  })
  
  const filteredNews = computed(() =>
    newsData.filter(item => {
      const matchDate =
        !searchDate.value ||
        (item.date && item.date.includes(searchDate.value))
      const matchTitle =
        !searchTitle.value ||
        (item.title && item.title.toLowerCase().includes(searchTitle.value.toLowerCase()))
      const matchCategory =
        !searchCategory.value ||
        (item.category && item.category === searchCategory.value)
      const matchContent =
        !searchContent.value ||
        (item.content && item.content.toLowerCase().includes(searchContent.value.toLowerCase()))
      return matchDate && matchTitle && matchCategory && matchContent
    })
  )
  
  const totalPages = computed(() =>
    Math.max(1, Math.ceil(filteredNews.value.length / perPage))
  )
  
  const paginatedNews = computed(() => {
    if (page.value > totalPages.value) page.value = 1
    const start = (page.value - 1) * perPage
    return filteredNews.value.slice(start, start + perPage)
  })
  </script>
  