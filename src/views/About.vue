<template>
  <div class="container mt-4" style="margin-top: 80px !important;">
    <h2 class="mb-4">About Game Store</h2>
    <p>
      Game Store is your one-stop platform for discovering, wishlisting, and purchasing the latest games. Stay tuned for more features!
    </p>
    <form class="mb-4" @submit.prevent>
      <div class="mb-3 row">
        <label class="col-sm-2 col-form-label" for="firstName">First Name</label>
        <div class="col-sm-10">
          <input v-model="firstName" id="firstName" class="form-control" placeholder="Enter your first name" />
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-sm-2 col-form-label" for="lastName">Last Name</label>
        <div class="col-sm-10">
          <input v-model="lastName" id="lastName" class="form-control" placeholder="Enter your last name" />
        </div>
      </div>
      <div class="mb-3 row">
        <label class="col-sm-2 col-form-label">Choose Image</label>
        <div class="col-sm-10">
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" id="mountain" value="mountain" v-model="selectedImage" />
            <label class="form-check-label" for="mountain">Mountain</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" id="ocean" value="ocean" v-model="selectedImage" />
            <label class="form-check-label" for="ocean">Ocean</label>
          </div>
        </div>
      </div>
    </form>
    <div v-if="firstName || lastName" class="mb-4">
      <h5>Welcome {{ fullName }}!</h5>
    </div>
    <div v-if="selectedImage">
      <img
        v-if="selectedImage === 'mountain'"
        src="../assets/mountain.jpg"
        alt="Mountain"
        class="img-fluid rounded"
        style="max-width: 300px;"
      />
      <img
        v-else
        src="../assets/ocean.jpg"
        alt="Ocean"
        class="img-fluid rounded"
        style="max-width: 300px;"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
const firstName = ref('')
const lastName = ref('')
const selectedImage = ref('mountain')
const fullName = computed(() => [firstName.value, lastName.value].filter(Boolean).join(' '))
</script>
