<template>
    <div class="product-card border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div class="product-card-image relative bg-white p-3">
            <!-- Price badge -->
            <div class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold">
                ${{ product.price.toFixed(2) }}
            </div>

            <img src="https://fakeimg.pl/300" :alt="product.name" class="w-full h-40 object-contain">

            <!-- Age restriction notice for alcoholic beverages -->
            <div v-if="isAlcoholic" class="text-xs text-gray-500 mt-2">
                How to use: only for aged 18 or above
            </div>
        </div>
        <div class="product-card-content p-4">
            <h3 class="text-lg font-medium mb-2 line-clamp-2 h-14">{{ product.name }}</h3>
            <p class="text-xs text-gray-500 mb-4">Origin: {{ product.origin }}</p>

            <button
                class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors hover:cursor-pointer"
                @click="add(product)">
                Add to Cart
            </button>
        </div>
    </div>
</template>

<script setup>
import { addToCart } from '@/services/ShoppingCartService'
import { computed } from 'vue'

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})

// Check if product is alcoholic
const isAlcoholic = computed(() => {
    return props.product.category_id === 10 || props.product.name.toLowerCase().includes('beer') ||
        props.product.name.toLowerCase().includes('wine') || props.product.name.toLowerCase().includes('vodka')
})

const add = () => {
    addToCart(props.product)
}
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>