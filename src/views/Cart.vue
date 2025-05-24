<template>
  <div class="container mt-5" style="margin-top: 80px !important;">
    <h2>Your Cart</h2>
    <div v-if="cart.length === 0" class="alert alert-info">Your cart is empty.</div>
    <ul class="list-group mb-4" v-else>
      <li v-for="game in cart" :key="game.id" class="list-group-item d-flex justify-content-between align-items-center">
        <span>
          <img :src="game.image" alt="" style="height: 40px; width: 40px; object-fit: cover; margin-right: 10px;">
          {{ game.title }}
        </span>
        <span>${{ game.price }}</span>
        <button @click="remove(game.id)" class="btn btn-danger btn-sm">Remove</button>
      </li>
    </ul>
    <div v-if="cart.length > 0">
      <h4>Total: ${{ total }}</h4>
      <router-link to="/checkout" class="btn btn-success">Checkout</router-link>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const cart = computed(() => store.getters['cart/cart'])
const total = computed(() => cart.value.reduce((sum, g) => sum + g.price, 0).toFixed(2))
function remove(id) {
  store.commit('cart/REMOVE_FROM_CART', id)
}
</script>
