<template>
  <div class="container mt-5" style="margin-top: 80px !important;">
    <h2>Checkout</h2>
    <form @submit.prevent="handleSubmit" class="mb-4">
      <div class="mb-3">
        <label class="form-label">Card Number</label>
        <input v-model="card" class="form-control" required minlength="16" maxlength="16" />
      </div>
      <div class="mb-3">
        <label class="form-label">Expiry</label>
        <input v-model="expiry" class="form-control" required pattern="\d{2}/\d{2}" placeholder="MM/YY" />
      </div>
      <div class="mb-3">
        <label class="form-label">CVV</label>
        <input v-model="cvv" class="form-control" required minlength="3" maxlength="3" />
      </div>
      <button class="btn btn-success" type="submit">Pay</button>
    </form>
    <div v-if="success" class="alert alert-success">Payment successful! Thank you for your purchase.</div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const card = ref('')
const expiry = ref('')
const cvv = ref('')
const success = ref(false)

function handleSubmit() {
  if (card.value.length === 16 && cvv.value.length === 3) {
    const purchasedGames = store.state.cart.cart

    store.dispatch('auth/addPurchasedGames', purchasedGames)

    store.commit('cart/CLEAR_CART')

    success.value = true

    setTimeout(() => {
      router.push('/profile')
    }, 1500)
  }
}
</script>

