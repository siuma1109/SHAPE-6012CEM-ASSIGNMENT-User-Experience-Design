<template>
    <div class="search-bar ml-20 flex items-center bg-white rounded-full p-2 shadow-md">
        <form class="flex w-full" method="get" @submit.prevent="search">
            <input type="text" v-model="keyword" placeholder="Search"
                class="bg-transparent border-none w-2xs flex-1 pt-0.5 pb-0.5 pl-3 pr-3 text-base placeholder-gray-400 text-black focus:outline-none" />
            <button type="submit" class="bg-transparent border-none cursor-pointer p-1">
                <img src="@/assets/images/header/search-icon.svg" alt="search" />
            </button>
        </form>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, watch } from 'vue'
const router = useRouter()
const route = useRoute()
const params = new URLSearchParams(window.location.search)
const keyword = ref(params.get('keyword') || '')

const search = () => {
    router.push({
        path: '/search',
        query: {
            keyword: keyword.value
        }
    })
}

// Watch for route query changes
watch(() => route.query.keyword, (newKeyword) => {
    keyword.value = newKeyword
})
</script>
