<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/cos30043/s104225535/A3/">GameStore</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
                <li class="nav-item"><router-link class="nav-link" to="/cos30043/s104225535/A3/">Home</router-link></li>
                <li class="nav-item"><router-link class="nav-link" to="/catalog">Catalog</router-link></li>
                <li class="nav-item"><router-link class="nav-link" to="/news">News</router-link></li>
                <li class="nav-item"><router-link class="nav-link" to="/about">About</router-link></li>
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item"><router-link class="nav-link" to="/profile">Profile</router-link></li>
                <li class="nav-item" v-if="isAuthenticated"><router-link class="nav-link" to="/wishlist">Wishlist</router-link></li>
                <li class="nav-item" v-if="isAuthenticated"><router-link class="nav-link" to="/cart">Cart</router-link></li>
                <li class="nav-item" v-if="!isAuthenticated"><router-link class="nav-link" to="/login">Login</router-link></li>
                <li class="nav-item" v-if="isAuthenticated"><a class="nav-link" href="#" @click.prevent="logout">Logout</a></li>
            </ul>
            </div>
        </div>
    </nav>
</template>
  
<script setup>
    import { computed } from 'vue'
    import { useAuthStore } from '../stores/auth'
    const auth = useAuthStore()
    const isAuthenticated = computed(() => auth.isAuthenticated)
    const logout = () => auth.logout()
</script>  
