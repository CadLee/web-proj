<template>
    <div class="container mt-4">
      <h2>Login</h2>
      <form @submit.prevent="onLogin">
        <div class="mb-2">
          <label>Username</label>
          <input v-model="username" class="form-control" required />
        </div>
        <div class="mb-2">
          <label>Password</label>
          <input type="password" v-model="password" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '../stores/auth'
  
  const username = ref('')
  const password = ref('')
  const auth = useAuthStore()
  const router = useRouter()
  
  const onLogin = () => {
    const userKey = `user_${username.value}`
    if (!localStorage.getItem(userKey)) {
      alert('User does not exist!')
      //return
    }
    auth.login(username.value, password.value)
    router.push('/profile')
  }
  </script>
  