<template>
    <div class="actions flex items-center p-3">
        <RouterLink to="/profile" class="action-button">
            <img src="@/assets/images/header/user-icon.svg" alt="profile" class="w-6 h-6" />
        </RouterLink>
        <RouterLink to="/shopping-cart" class="action-button shopping-cart-icon" :data-count="cart.length">
            <img src="@/assets/images/header/shopping-cart.svg" alt="shopping-cart" class="w-6 h-6" />
        </RouterLink>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getCart } from '@/services/ShoppingCartService'

const cart = ref(getCart())

watch(() => getCart(), (newVal) => {
    cart.value = newVal
}, { immediate: true })
</script>

<style scoped>
.action-button {
    margin-right: 10px;
}

.shopping-cart-icon {
    position: relative;
}

.shopping-cart-icon::after {
    content: attr(data-count);
    position: absolute;
    top: -10px;
    right: -10px;
    background-color: red;
    color: white;
    padding: 0 5px;
    border-radius: 50%;
    font-size: 12px;
    font-weight: bold;
    width: 15px;
    height: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>