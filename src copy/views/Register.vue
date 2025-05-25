<template>
    <div class="container d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div class="card shadow p-4" style="min-width: 340px; max-width: 400px; width: 100%;">
        <div class="text-center mb-4">
          <h3 class="fw-bold mb-1">Create Account</h3>
          <p class="text-muted mb-0">Register to start your journey</p>
        </div>
        <form @submit.prevent="onRegister" novalidate>
          <div class="form-floating mb-3">
            <input
              v-model.trim="username"
              id="username"
              type="text"
              class="form-control"
              placeholder="Username"
              autocomplete="username"
              required
            />
            <label for="username">Username</label>
          </div>
          <div v-if="usernameError" class="text-danger small mb-2">{{ usernameError }}</div>
  
          <div class="form-floating mb-3">
            <input
              v-model.trim="email"
              id="email"
              type="email"
              class="form-control"
              placeholder="Email"
              autocomplete="email"
              required
            />
            <label for="email">Email</label>
          </div>
          <div v-if="emailError" class="text-danger small mb-2">{{ emailError }}</div>
  
          <div class="form-floating mb-3">
            <input
              v-model="password"
              id="password"
              type="password"
              class="form-control"
              placeholder="Password"
              autocomplete="new-password"
              required
              minlength="8"
            />
            <label for="password">Password</label>
          </div>
          <div v-if="passwordError" class="text-danger small mb-2">{{ passwordError }}</div>
  
          <div class="form-floating mb-3">
            <input
              v-model="confirm"
              id="confirm"
              type="password"
              class="form-control"
              placeholder="Confirm Password"
              autocomplete="new-password"
              required
              minlength="8"
            />
            <label for="confirm">Confirm Password</label>
          </div>
          <div v-if="confirmError" class="text-danger small mb-2">{{ confirmError }}</div>
  
          <button type="submit" class="btn btn-success w-100 mb-2" :disabled="hasErrors">Register</button>
          <div v-if="formError" class="alert alert-danger py-2 mt-2 mb-0">{{ formError }}</div>
          <div v-if="formSuccess" class="alert alert-success py-2 mt-2 mb-0">{{ formSuccess }}</div>
        </form>
        <div class="text-center mt-3">
          <span class="text-muted">Already have an account?</span>
          <button class="btn btn-link p-0 ms-1" @click="goToLogin">Login</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  
  const username = ref('')
  const email = ref('')
  const password = ref('')
  const confirm = ref('')
  const formError = ref('')
  const formSuccess = ref('')
  const logoExists = ref(false)
  
  const usernameError = computed(() => {
    if (!username.value) return 'Username is required.'
    if (localStorage.getItem(`user_${username.value}`)) return 'Username already exists.'
    return ''
  })
  const emailError = computed(() => {
    if (!email.value) return 'Email is required.'
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email.value)) return 'Invalid email format.'
    // Check if email exists
    for (let key in localStorage) {
      if (key.startsWith('user_')) {
        const user = JSON.parse(localStorage.getItem(key))
        if (user.email === email.value) return 'Email already registered.'
      }
    }
    return ''
  })
  const passwordError = computed(() => {
    if (!password.value) return 'Password is required.'
    if (password.value.length < 8) return 'Password must be at least 8 characters.'
    return ''
  })
  const confirmError = computed(() => {
    if (!confirm.value) return 'Please confirm your password.'
    if (confirm.value !== password.value) return 'Passwords do not match.'
    return ''
  })
  const hasErrors = computed(() =>
    !!(usernameError.value || emailError.value || passwordError.value || confirmError.value)
  )
  
  const router = useRouter()
  
  function onRegister() {
    formError.value = ''
    formSuccess.value = ''
    if (hasErrors.value) {
      formError.value = 'Please fix the errors above.'
      return
    }
    // Store user in localStorage
    const userObj = {
      username: username.value,
      email: email.value,
      password: password.value,
      purchased: [],
      wallet: 0
    }
    localStorage.setItem(`user_${username.value}`, JSON.stringify(userObj))
    formSuccess.value = 'Registration successful! Redirecting to login...'
    setTimeout(() => router.push('/login'), 1200)
  }
  
  function goToLogin() {
    router.push('/login')
  }
  </script>
  
  <style scoped>
  body, html, #app {
    height: 100%;
    background-color: #f8f9fa;
  }
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
  