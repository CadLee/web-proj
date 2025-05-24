<template>
  <div class="container mt-5" style="margin-top: 80px !important;">
    <div class="row">
      <div class="col-md-6">
        <img :src="game.image" class="img-fluid rounded" alt="Game cover">
        <div class="mt-3">
          <video controls class="w-100">
            <source :src="game.trailer" type="video/mp4">
          </video>
        </div>
      </div>
      <div class="col-md-6">
        <h1>{{ game.title }}</h1>
        <p class="lead">{{ game.description }}</p>
        <p class="h4">${{ game.price }}</p>
        <button @click="addToCart" class="btn btn-primary me-2">Add to Cart</button>
        <button @click="toggleWishlist" class="btn btn-outline-secondary">
          {{ inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist' }}
        </button>
        <CommentSection :gameId="game.id" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import CommentSection from '../components/CommentSection.vue'
const store = useStore()
const route = useRoute()
const game = computed(() => store.getters['games/getGameById'](route.params.id))
const inWishlist = computed(() =>
  store.getters['cart/wishlist'].some(g => g.id === game.value.id)
)
function addToCart() {
  store.commit('cart/ADD_TO_CART', game.value)
}
function toggleWishlist() {
  if (inWishlist.value) {
    store.commit('cart/REMOVE_FROM_WISHLIST', game.value.id)
  } else {
    store.commit('cart/ADD_TO_WISHLIST', game.value)
  }
}
</script>
