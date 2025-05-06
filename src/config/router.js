import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import TodayDealsView from '../views/TodayDealsView.vue'
import SearchOrCategoryView from '../views/SearchOrCategoryView.vue'
import ShoppingCartView from '../views/ShoppingCartView.vue'
import AllProductsView from '../views/AllProductsView.vue'
const routes = [
    { path: '/', component: HomeView },
    { path: '/today-deals', component: TodayDealsView },
    { path: '/search', component: SearchOrCategoryView },
    { path: '/categories/:id', component: SearchOrCategoryView },
    { path: '/shopping-cart', component: ShoppingCartView },
    { path: '/all-products', component: AllProductsView },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router