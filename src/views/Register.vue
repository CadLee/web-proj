<template>
  <div class="container mt-5" style="margin-top: 80px !important; max-width: 400px;">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div class="mb-3">
        <label>Name</label>
        <input v-model="name" class="form-control" required />
      </div>
      <div class="mb-3">
        <label>Email</label>
        <input v-model="email" class="form-control" required type="email" />
      </div>
      <div class="mb-3">
        <label>Password</label>
        <input v-model="password" class="form-control" required type="password" />
      </div>
      <button class="btn btn-primary" type="submit">Register</button>
      <router-link to="/login" class="btn btn-link">Login</router-link>
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
const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
function register() {
  if (!name.value || !email.value || !password.value) {
    error.value = 'All fields required'
    return
  }
  store.dispatch('auth/register', { name: name.value, email: email.value, password: password.value })
  router.push('/')
}
</script>
