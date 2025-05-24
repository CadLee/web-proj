<template>
  <Navbar />
  <div style="margin-top: 70px;">
    <router-view />
  </div>
</template>
<script setup>
import Navbar from './components/Navbar.vue'
</script>
