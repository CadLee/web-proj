<template>
  <div class="mt-4">
    <h5>Comments</h5>
    <div v-if="isAuthenticated">
      <form @submit.prevent="addComment" class="mb-3">
        <textarea v-model="commentText" class="form-control mb-2" required placeholder="Write a comment..."></textarea>
        <button class="btn btn-primary btn-sm" type="submit">Post Comment</button>
      </form>
    </div>
    <div v-else>
      <p><router-link to="/login">Login</router-link> to comment.</p>
    </div>
    <div v-for="comment in comments" :key="comment.id" class="card mb-2">
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <strong>{{ comment.user }}</strong>
          <small>{{ comment.date }}</small>
        </div>
        <p class="mb-1">{{ comment.text }}</p>
        <button v-if="canDelete(comment)" @click="deleteComment(comment.id)" class="btn btn-danger btn-sm">Delete</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
const props = defineProps(['gameId'])
const store = useStore()
const route = useRoute()
const commentText = ref('')
const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])
const user = computed(() => store.getters['auth/user'])
const comments = computed(() => store.getters['games/getCommentsByGame'](props.gameId))
function addComment() {
  if (!commentText.value) return
  store.commit('games/ADD_COMMENT', {
    id: Date.now(),
    gameId: props.gameId,
    user: user.value.name,
    userId: user.value.id,
    text: commentText.value,
    date: new Date().toLocaleString()
  })
  commentText.value = ''
}
function canDelete(comment) {
  return user.value && comment.userId === user.value.id
}
function deleteComment(id) {
  store.commit('games/DELETE_COMMENT', id)
}
</script>
