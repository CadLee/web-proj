<template>
    <div class="container mt-4">
      <h2>About GameStore</h2>
      <p>GameStore is your destination for trending and classic games. Explore, wishlist, and shop with ease.</p>
      <form @submit.prevent>
        <div class="row mb-4">
        
            <div class="col mb-2">
            <label>First Name:</label>
            <input v-model="firstName" class="form-control" />
            </div>
            <div class="col mb-2">
            <label>Last Name:</label>
            <input v-model="lastName" class="form-control" />
            </div>
            
        </div>
        <div class="row mb-2">
            <div v-if="firstName && lastName" class="mt-3">
                        <h4>Welcome {{ firstName }} {{ lastName }}!</h4>
                    </div>
        </div>
        <div class="row mb-4">
            <div class="col mb-1">
                <label>Choose an image:</label>
                
                    <div class="">
                        <input type="radio" id="mountain" value="mountain" v-model="imageType" />
                        <label for="mountain">Mountain</label>
                    </div>
                    <div class="">
                        <input type="radio" id="ocean" value="ocean" v-model="imageType" />
                        <label for="ocean">Ocean</label>
                    </div>
                    
            </div>
            <div class="col mb-3">
                <div class="mt-3">
                <img v-if="imageType==='mountain'" src="../assets/mountain.jpg" class="img-fluid" />
                <img v-if="imageType==='ocean'" src="../assets/ocean.jpg" class="img-fluid" />
                </div>
            </div>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  const firstName = ref('')
  const lastName = ref('')
  const imageType = ref('mountain')
  </script>
  