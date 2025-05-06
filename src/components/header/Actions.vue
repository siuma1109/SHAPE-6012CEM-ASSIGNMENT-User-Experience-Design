<template>
    <div class="actions flex items-center p-3">
        <button @click="openLoginModal" class="action-button">
            <img src="@/assets/images/header/user-icon.svg" alt="profile" class="w-6 h-6" />
        </button>
        <RouterLink to="/shopping-cart" class="action-button shopping-cart-icon" :data-count="cart.length">
            <img src="@/assets/images/header/shopping-cart.svg" alt="shopping-cart" class="w-6 h-6" />
        </RouterLink>
        
        <LoginModal ref="loginModalRef" />
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { getCart } from '@/services/ShoppingCartService'
import LoginModal from '@/components/auth/LoginModal.vue'
import { ModalController } from '@/components/auth/ModalController'

const cart = ref(getCart())
const loginModalRef = ref(null)

watch(() => getCart(), (newVal) => {
    cart.value = newVal
}, { immediate: true })

const openLoginModal = () => {
    ModalController.open()
}
</script>

<style scoped>
.action-button {
    margin-right: 10px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
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