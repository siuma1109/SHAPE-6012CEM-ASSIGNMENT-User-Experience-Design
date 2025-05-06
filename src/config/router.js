import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import TodayDealsView from '../views/TodayDealsView.vue'
import SearchView from '../views/SearchView.vue'
import CategoryView from '../views/CategoryView.vue'
import ShoppingCartView from '../views/ShoppingCartView.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/today-deals', component: TodayDealsView },
    { path: '/search', component: SearchView },
    { path: '/categories/:id', component: CategoryView },
    { path: '/shopping-cart', component: ShoppingCartView },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router