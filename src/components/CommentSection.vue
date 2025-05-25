<template>
    <div>
      <div v-if="isAuthenticated" class="mb-3">
        <form @submit.prevent="addComment">
          <textarea
            v-model="newComment"
            class="form-control mb-2"
            placeholder="Add a comment..."
            required
            maxlength="300"
          ></textarea>
          <button class="btn btn-primary btn-sm" type="submit">Post</button>
        </form>
      </div>
      <ul class="list-group mt-3">
        <li
          v-for="(comment, idx) in comments"
          :key="comment.id"
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <div>
            <strong>{{ comment.user }}</strong>:
            <span>{{ comment.text }}</span>
            <div class="text-muted small">{{ formatDate(comment.date) }}</div>
          </div>
          <button
            v-if="isAuthenticated && comment.user === currentUser"
            class="btn btn-danger btn-sm"
            @click="deleteComment(comment.id)"
          >Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch, onMounted } from 'vue'
  import { useAuthStore } from '../stores/auth'
  
  const props = defineProps({
    gameId: {
      type: [String, Number],
      required: true
    }
  })
  
  const auth = useAuthStore()
  const isAuthenticated = computed(() => !!auth.user)
  const currentUser = computed(() => auth.user?.username || 'Guest')
  
  const comments = ref([])
  const newComment = ref('')
  
  // Key for storing comments for this game
  const commentsKey = computed(() => `comments_game_${props.gameId}`)
  
  // Load comments from localStorage
  function loadComments() {
    const stored = localStorage.getItem(commentsKey.value)
    comments.value = stored ? JSON.parse(stored) : []
  }
  
  // Save comments to localStorage
  function saveComments() {
    localStorage.setItem(commentsKey.value, JSON.stringify(comments.value))
  }
  
  // Add a comment
  function addComment() {
    if (!newComment.value.trim()) return
    const commentObj = {
      id: Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      user: currentUser.value,
      text: newComment.value.trim(),
      date: new Date().toISOString()
    }
    comments.value.push(commentObj)
    saveComments()
    newComment.value = ''
  }
  
  // Delete a comment (only if current user is the author)
  function deleteComment(commentId) {
    comments.value = comments.value.filter(c => c.id !== commentId)
    saveComments()
  }
  
  // Format date for display
  function formatDate(dateStr) {
    const date = new Date(dateStr)
    return date.toLocaleString()
  }
  
  // Watch for gameId prop changes and reload comments
  watch(() => props.gameId, loadComments, { immediate: true })
  
  // Also reload comments on mount
  onMounted(loadComments)
  </script>
  