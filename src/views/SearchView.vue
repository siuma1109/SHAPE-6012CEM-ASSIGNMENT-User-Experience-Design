<template>
    <div>
        <h1>Search View With Keyword: {{ keyword }}</h1>
        
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getProductsByKeyword } from '@/services/ProductService'
const route = useRoute()
const keyword = ref('')
const products = ref([])

// Set initial value
keyword.value = route.query.keyword
products.value = getProductsByKeyword(keyword.value)

// Watch for route query changes
watch(() => route.query.keyword, (newKeyword) => {
    keyword.value = newKeyword
})
</script>