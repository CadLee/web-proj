<!-- src/App.vue -->
<template>
  <div id="app">
    <NavBar />
    <main class="flex-grow-1">
      <router-view />
    </main>
    <footer class="bg-light text-dark text-center py-3 mt-auto">
      &copy; 2025 GameStore. All rights reserved.
    </footer>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
</script>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8f9fa;
}

main {
  flex: 1 0 auto;
  padding-bottom: 2rem;
}
</style>
