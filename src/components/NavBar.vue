<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top w-100">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Game Store</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><router-link class="nav-link" to="/">Home</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/games">Games</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/news">News</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/about">About</router-link></li>

          <li v-if="isAuthenticated" class="nav-item">
            <router-link class="nav-link" to="/profile">Profile</router-link>
          </li>

          <li v-if="!isAuthenticated" class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li v-if="isAuthenticated" class="nav-item">
            <a href="#" class="nav-link" @click.prevent="logout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])

function logout() {
  store.dispatch('auth/logout')
  router.push('/login')
}
</script>
