<template>
    <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-6">{{ categoryName }}</h1>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <!-- Filter Section -->
            <div class="md:col-span-1 bg-gray-50 p-6 rounded-lg">
                <h2 class="text-xl font-semibold mb-6">Filters</h2>

                <!-- Category Filter -->
                <div class="mb-6">
                    <h3 class="text-lg font-medium mb-3">Category</h3>
                    <div v-for="cat in availableCategories" :key="cat.id" class="mb-2">
                        <label class="flex items-center cursor-pointer">
                            <input type="checkbox" :value="cat.id" v-model="selectedCategories" class="mr-2 h-4 w-4"
                                name="category">
                            <span>{{ cat.name }}</span>
                        </label>
                    </div>
                </div>

                <!-- Origin Filter -->
                <div class="mb-6">
                    <h3 class="text-lg font-medium mb-3">Origin</h3>
                    <div v-for="origin in availableOrigins" :key="origin" class="mb-2">
                        <label class="flex items-center cursor-pointer">
                            <input type="checkbox" :value="origin" v-model="selectedOrigins" class="mr-2 h-4 w-4">
                            <span>{{ origin }}</span>
                        </label>
                    </div>
                </div>

                <!-- Reset Filters Button -->
                <button @click="resetFilters"
                    class="mt-6 w-full bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-lg transition-colors font-medium">
                    Reset Filters
                </button>
            </div>

            <!-- Products Grid -->
            <div class="md:col-span-3">
                <!-- Product count -->
                <p class="mb-6 text-gray-600">{{ filteredProducts.length }} products found</p>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
                </div>

                <!-- No products message -->
                <div v-if="filteredProducts.length === 0" class="p-8 text-center">
                    <p class="text-lg text-gray-600">No products match the selected filters.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '../components/product/ProductCard.vue'
import { getProductByCategoryIdRecursive, getProductsByKeyword } from '../services/ProductService'
import categoriesJson from '../mocks/data/categories.json'

const route = useRoute()
const category = ref('')
const products = ref([])
const availableProducts = ref([])
const categoryName = ref('')
const keyword = ref('')

// Initialize keyword from route.query
keyword.value = route.query.keyword || ''

// Initialize availableProducts
onMounted(() => {
    availableProducts.value = getProductsByKeyword(keyword.value)
    loadData()
})

// Watch for route query changes
watch(() => route.query.keyword, (newKeyword) => {
    keyword.value = newKeyword || ''
    availableProducts.value = getProductsByKeyword(keyword.value)
    loadData()
})

// Filter states
const selectedCategories = ref([])
const selectedOrigins = ref([])

// Get available categories and origins from products
const availableCategories = computed(() => {
    // Get unique category IDs from products
    const categoryIds = [...new Set(products.value.map(p => p.category_id))]

    // Return full category objects for these IDs
    return categoriesJson.filter(cat => categoryIds.includes(cat.id))
})

const availableOrigins = computed(() => {
    // Get unique origins from products
    return [...new Set(products.value.map(p => p.origin))].sort()
})

// Filtered products based on selected filters
const filteredProducts = computed(() => {
    let result = [...products.value]

    // Filter by selected category (multiple selection)
    if (selectedCategories.value.length > 0) {
        result = result.filter(p => selectedCategories.value.includes(p.category_id))
    }

    // Filter by selected origins
    if (selectedOrigins.value.length > 0) {
        result = result.filter(p => selectedOrigins.value.includes(p.origin))
    }

    return result
})

// Reset all filters
const resetFilters = () => {
    selectedCategories.value = []
    selectedOrigins.value = []
}

// Define loadData function BEFORE it's used in watch
const loadData = () => {
    // If we have a category ID, filter products by category recursively
    if (category.value) {
        products.value = getProductByCategoryIdRecursive(availableProducts.value, category.value)

        // Set category name
        const currentCategory = categoriesJson.find(c => c.id === parseInt(category.value))
        categoryName.value = currentCategory ? currentCategory.name : ''
    } else {
        // If we don't have a category ID but have a keyword, use all available products from keyword search
        products.value = availableProducts.value
        categoryName.value = keyword.value ? `Search results for "${keyword.value}"` : 'All Products'
    }

    // Reset filters
    resetFilters()
}

// Load products when route changes - now loadData is defined before this watch
watch(() => route.params.id, (newId) => {
    category.value = newId
    loadData()
}, { immediate: true })

onMounted(() => {
    loadData()
})
</script>
