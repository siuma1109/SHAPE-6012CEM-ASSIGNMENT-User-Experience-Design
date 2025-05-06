<template>
    <div class="product-card border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div class="product-card-image relative bg-white p-3">
            <!-- Price badge -->
            <div class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold">
                ${{ product.price.toFixed(2) }}
            </div>

            <img :src="getProductImage(product)" :alt="product.name" class="w-full h-40 object-contain"
                @error="handleImageError($event, product)">

            <!-- Age restriction notice for alcoholic beverages -->
            <div v-if="isAlcoholic" class="text-xs text-gray-500 mt-2">
                How to use: only for aged 18 or above
            </div>
        </div>
        <div class="product-card-content p-4">
            <h3 class="text-lg font-medium mb-2 line-clamp-2 h-14">{{ product.name }}</h3>
            <p class="text-xs text-gray-500 mb-4">Origin: {{ product.origin }}</p>

            <!-- Show quantity controls if item is in cart with quantity > 0 -->
            <div class="w-full" v-if="cartItem && cartItem.quantity > 0">
                <div class="flex items-center w-full">
                    <button
                        class="h-10 px-4 bg-blue-600 text-white text-xl flex items-center justify-center rounded-l-md hover:bg-blue-700 hover:cursor-pointer"
                        @click="handleDecreaseQuantity(product.id)">
                        −
                    </button>
                    <input type="number" min="0" 
                        class="w-full h-10 flex items-center justify-center text-center border-t border-b"
                        v-model="cartItem.quantity" @change="handleQuantityChange(product.id)">
                    <button
                        class="h-10 px-4 bg-blue-600 text-white text-xl flex items-center justify-center rounded-r-md hover:bg-blue-700 hover:cursor-pointer"
                        @click="handleIncreaseQuantity(product.id)">
                        +
                    </button>
                </div>
            </div>

            <button v-if="!cartItem || cartItem.quantity <= 0"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors hover:cursor-pointer"
                @click="add(product)">
                Add to Cart
            </button>
        </div>
    </div>
</template>

<script setup>
import { addToCart, getCart, increaseQuantity, decreaseQuantity, updateQuantity } from '@/services/ShoppingCartService'
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { getProductImage, handleImageError } from '@/services/ProductService';

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})

const cart = ref([])

// Load cart on mount and listen for storage events
onMounted(() => {
    loadCart()
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('cart-updated', loadCart)
})

// Clean up event listener on unmount
onUnmounted(() => {
    window.removeEventListener('storage', handleStorageChange)
    window.removeEventListener('cart-updated', loadCart)
})

// Function to reload cart data
const loadCart = () => {
    cart.value = getCart()
}

// Handle storage change events (for cart updates from other components)
const handleStorageChange = (event) => {
    if (event.key === 'cart') {
        loadCart()
    }
}

// Check if current product is in cart
const cartItem = computed(() => {
    return cart.value.find(item => item.id === props.product.id)
})

// Check if product is alcoholic
const isAlcoholic = computed(() => {
    return props.product.category_id === 10 || props.product.name.toLowerCase().includes('beer') ||
        props.product.name.toLowerCase().includes('wine') || props.product.name.toLowerCase().includes('vodka')
})

// Handle add/update to cart
const add = () => {
    addToCart(props.product)
    loadCart() // Refresh cart data after adding
}

// Custom handlers for quantity changes
const handleIncreaseQuantity = (id) => {
    increaseQuantity(id)
    loadCart() // Refresh cart data after update
}

const handleDecreaseQuantity = (id) => {
    decreaseQuantity(id)
    loadCart() // Refresh cart data after update
}

const handleQuantityChange = (id) => {
    // Ensure quantity is a valid number and at least 0
    let quantity = parseInt(cartItem.value.quantity) || 0
    if (quantity < 0) quantity = 0

    updateQuantity(id, quantity)
    loadCart() // Refresh cart data after update
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