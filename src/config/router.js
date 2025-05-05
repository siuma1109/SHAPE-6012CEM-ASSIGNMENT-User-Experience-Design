import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import TodayDealsView from '../views/TodayDealsView.vue'
import SearchView from '../views/SearchView.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/today-deals', component: TodayDealsView },
    { path: '/search', component: SearchView },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router