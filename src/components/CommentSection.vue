<template>
    <div>
      <div v-if="isAuthenticated">
        <form @submit.prevent="addComment">
          <textarea v-model="newComment" class="form-control mb-2" placeholder="Add a comment..." required></textarea>
          <button class="btn btn-primary btn-sm" type="submit">Post</button>
        </form>
      </div>
      <ul class="list-group mt-3">
        <li v-for="(comment, idx) in comments" :key="idx" class="list-group-item d-flex justify-content-between align-items-center">
          <span>{{ comment.user }}: {{ comment.text }}</span>
          <button v-if="comment.user === currentUser" class="btn btn-danger btn-sm" @click="deleteComment(idx)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useAuthStore } from '../stores/auth'
  const props = defineProps(['gameId'])
  const auth = useAuthStore()
  const isAuthenticated = auth.isAuthenticated
  const currentUser = auth.user?.username || 'Guest'
  
  const comments = ref([]) // Load from localStorage or backend
  const newComment = ref('')
  
  const addComment = () => {
    if (newComment.value.trim()) {
      comments.value.push({ user: currentUser, text: newComment.value })
      newComment.value = ''
      // Save to localStorage or backend
    }
  }
  const deleteComment = (idx) => {
    comments.value.splice(idx, 1)
    // Update storage
  }
  </script>
  