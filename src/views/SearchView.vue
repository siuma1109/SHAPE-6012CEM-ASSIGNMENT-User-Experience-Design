<template>
    <div>
        <h1>Search View With Keyword: {{ keyword }}</h1>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const keyword = ref('')

// Set initial value
keyword.value = route.query.keyword

// Watch for route query changes
watch(() => route.query.keyword, (newKeyword) => {
    keyword.value = newKeyword
})
</script>