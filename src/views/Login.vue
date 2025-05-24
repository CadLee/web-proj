<template>
  <div class="container mt-5" style="margin-top: 80px !important; max-width: 400px;">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label>Email</label>
        <input v-model="email" class="form-control" required type="email" />
      </div>
      <div class="mb-3">
        <label>Password</label>
        <input v-model="password" class="form-control" required type="password" />
      </div>
      <button class="btn btn-primary" type="submit">Login</button>
      <router-link to="/register" class="btn btn-link">Register</router-link>
    </form>
    <div v-if="error" class="alert alert-danger mt-2">{{ error }}</div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')
function login() {
  if (!email.value || !password.value) {
    error.value = 'All fields required'
    return
  }
  store.dispatch('auth/login', { email: email.value, password: password.value })
  router.push('/')
}
</script>
