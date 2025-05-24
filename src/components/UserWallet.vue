<template>
    <div>
      <div class="d-flex align-items-center mb-3">
        <span class="me-2 fw-bold">Wallet Balance:</span>
        <span class="badge bg-success fs-5">${{ balance.toFixed(2) }}</span>
        <button class="btn btn-outline-primary btn-sm ms-3" @click="showPopup = true">
          Add Funds
        </button>
      </div>
  
      <!-- Add Funds Popup -->
      <div v-if="showPopup" class="wallet-popup-backdrop" @click.self="showPopup = false">
        <div class="wallet-popup card p-4">
          <h5>Add Funds to Wallet</h5>
          <form @submit.prevent="addFunds">
            <div class="mb-3">
              <input
                v-model.number="amount"
                type="number"
                min="1"
                step="0.01"
                class="form-control"
                placeholder="Enter amount"
                required
              />
            </div>
            <button type="submit" class="btn btn-success">Add to Wallet</button>
            <button type="button" class="btn btn-secondary ms-2" @click="showPopup = false">Cancel</button>
          </form>
          <div v-if="error" class="text-danger mt-2">{{ error }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, computed } from 'vue'
  import { useAuthStore } from '../stores/auth'
  
  const auth = useAuthStore()
  const showPopup = ref(false)
  const amount = ref(null)
  const error = ref('')
  
  const userKey = computed(() => auth.user ? `user_${auth.user.username}` : null)
  const balance = ref(0)
  
  // Load balance from localStorage on mount and whenever user changes
  const loadBalance = () => {
    if (!userKey.value) return
    const userData = JSON.parse(localStorage.getItem(userKey.value))
    balance.value = userData?.wallet ?? 0
  }
  watch(() => auth.user, loadBalance, { immediate: true })
  
  function addFunds() {
    error.value = ''
    if (!amount.value || amount.value <= 0) {
      error.value = 'Please enter a valid amount.'
      return
    }
    const userData = JSON.parse(localStorage.getItem(userKey.value))
    userData.wallet = (userData.wallet || 0) + amount.value
    localStorage.setItem(userKey.value, JSON.stringify(userData))
    balance.value = userData.wallet
    amount.value = null
    showPopup.value = false
  }
  </script>
  
  <style scoped>
  .wallet-popup-backdrop {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1050;
  }
  .wallet-popup {
    min-width: 300px;
    max-width: 90vw;
  }
  </style>
  