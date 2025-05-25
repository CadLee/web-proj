<template>
    <div class="container mt-4">
      <h2>About GameStore</h2>
      <p>GameStore a prototype webservice that aims to get netizens to see what upcoming video games are trending and serves as a middle man to help them buy various games online. The service aims to be a webpage where I will showcase my own games in the future.</p>
      <form @submit.prevent>
        <div class="row mb-4">
        
            <div class="col mb-1">
                <label>First Name:</label>
                <input v-model="firstName" class="form-control" />
            </div>

            <div class="col mb-1">
                <label>Last Name:</label>
                <input v-model="lastName" class="form-control" />
            </div>

            <div class="col mb-2">
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
  