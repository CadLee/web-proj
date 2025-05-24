<template>
    <div class="container d-flex align-items-center justify-content-center min-vh-100">
      <div class="card shadow p-4" style="min-width: 340px; max-width: 400px; width: 100%;">
        <div class="text-center mb-4">
          <img src="../assets/logo.png" alt="Logo" style="max-width: 60px;" class="mb-2" v-if="logoExists"/>
          <h3 class="fw-bold mb-1">Sign in to your account</h3>
          <p class="text-muted mb-0">Welcome</p>
        </div>
        <form @submit.prevent="onLogin" novalidate>
          <div class="form-floating mb-3">
            <input
              v-model.trim="identifier"
              id="identifier"
              type="text"
              class="form-control"
              placeholder="Username or Email"
              autocomplete="username"
              required
            />
            <label for="identifier">Username or Email</label>
          </div>
          <div class="form-floating mb-3">
            <input
              v-model="password"
              id="password"
              type="password"
              class="form-control"
              placeholder="Password"
              autocomplete="current-password"
              required
              minlength="8"
            />
            <label for="password">Password</label>
          </div>
          <button type="submit" class="btn btn-primary w-100 mb-2">Login</button>
          <div v-if="formError" class="alert alert-danger py-2 mt-2 mb-0">{{ formError }}</div>
        </form>
        <div class="text-center mt-3">
          <span class="text-muted">Don't have an account?</span>
          <button class="btn btn-link p-0 ms-1" @click="goToRegister">Register</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '../stores/auth'
  
  const identifier = ref('')
  const password = ref('')
  const formError = ref('')
  const router = useRouter()
  const auth = useAuthStore()
  const logoExists = ref(false)
  
  onMounted(() => {
    // Optional: Check if logo exists
    fetch('/assets/logo.png').then(res => {
      logoExists.value = res.ok
    })
  })
  
  function onLogin() {
    formError.value = ''
    if (!identifier.value || !password.value) {
      formError.value = 'Please fill in all fields.'
      return
    }
    let foundUser = null
    for (let key in localStorage) {
      if (key.startsWith('user_')) {
        const user = JSON.parse(localStorage.getItem(key))
        if (
          user.username === identifier.value ||
          user.email === identifier.value
        ) {
          foundUser = user
          break
        }
      }
    }
    if (!foundUser) {
      formError.value = 'User not found.'
      return
    }
    if (foundUser.password !== password.value) {
      formError.value = 'Incorrect password.'
      return
    }
    // Set current user in localStorage and in auth store
    auth.user = { username: foundUser.username }
    localStorage.setItem('currentUser', JSON.stringify(auth.user))
    router.push('/profile')
  }
  
  function goToRegister() {
    router.push('/register')
  }
  </script>
  
  <style scoped>
  .card {
    border-radius: 16px;
  }
  .btn-link {
    color: #0d6efd;
    text-decoration: none;
    font-weight: 500;
  }
  .btn-link:hover {
    text-decoration: underline;
  }
  </style>
  