import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import News from '../views/News.vue'
import About from '../views/About.vue'
import Catalog from '../views/Catalog.vue'
import GamePage from '../views/GamePage.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Wishlist from '../views/Wishlist.vue'
import Cart from '../views/Cart.vue'
import Profile from '../views/Profile.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/cos30043/s104225535/A3/', name: 'Home', component: Home },
  { path: '/news', name: 'News', component: News },
  { path: '/about', name: 'About', component: About },
  { path: '/catalog', name: 'Catalog', component: Catalog },
  { path: '/game/:id', name: 'GamePage', component: GamePage, props: true },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/wishlist', name: 'Wishlist', component: Wishlist },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/profile', name: 'Profile', component: Profile },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
