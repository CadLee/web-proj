<template>
  <div class="col-md-4 mb-4">
    <div class="card h-100">
      <img :src="game.image" class="card-img-top" :alt="game.title">
      <div class="card-body">
        <h5 class="card-title">{{ game.title }}</h5>
        <p class="card-text">{{ game.description }}</p>
        <p class="h4">${{ game.price }}</p>
        <router-link :to="`/games/${game.id}`" class="btn btn-outline-primary btn-sm mb-2">View Details</router-link>
        <button @click="addToCart" class="btn btn-primary btn-sm me-2">Add to Cart</button>
        <button @click="toggleWishlist" class="btn btn-outline-secondary btn-sm">
          {{ inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist' }}
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const props = defineProps(['game'])
const store = useStore()
const inWishlist = computed(() =>
  store.getters['cart/wishlist'].some(g => g.id === props.game.id)
)
function addToCart() {
  store.commit('cart/ADD_TO_CART', props.game)
}
function toggleWishlist() {
  if (inWishlist.value) {
    store.commit('cart/REMOVE_FROM_WISHLIST', props.game.id)
  } else {
    store.commit('cart/ADD_TO_WISHLIST', props.game)
  }
}
</script>
