<template>
    <div class="container mt-4">
      <h2>Register</h2>
      <form @submit.prevent="onRegister">
        <div class="mb-2">
          <label>Username</label>
          <input v-model="username" class="form-control" required />
        </div>
        <div class="mb-2">
          <label>Password</label>
          <input type="password" v-model="password" class="form-control" required />
        </div>
        <div class="mb-2">
          <label>Email</label>
          <input v-model="email" class="form-control" />
        </div>
        <button type="submit" class="btn btn-success">Register</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '../stores/auth'
  
  const username = ref('')
  const password = ref('')
  const email = ref('')
  const router = useRouter()
  const auth = useAuthStore()
  
  const onRegister = () => {
    const userKey = `user_${username.value}`
    if (localStorage.getItem(userKey)) {
      alert('Username already exists!')
      return
    }
    const newUser = {
      username: username.value,
      email: email.value,
      purchased: []
    }
    localStorage.setItem(userKey, JSON.stringify(newUser))
    auth.login(username.value, password.value)
    router.push('/profile')
  }
  </script>
  