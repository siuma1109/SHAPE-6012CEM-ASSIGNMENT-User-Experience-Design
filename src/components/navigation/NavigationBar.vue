<template>
    <div class="navigation-bar flex items-center bg-white">
        <div class="navigation-bar-item hover:cursor-pointer p-2 border-2 border-transparent hover:border-blue-900">
            <a @click="toggleMenu">
                <img src="@/assets/images/navigation/hamburger.svg" alt="hamburger" class="w-8 h-8" />
            </a>
            <div v-if="isMenuOpen" class="fixed inset-0 z-50 flex">
                <!-- Backdrop -->
                <div class="fixed inset-0 bg-black bg-opacity-30" @click="toggleMenu"></div>

                <!-- Menu -->
                <div class="navigation-bar-menu bg-white h-screen w-96 z-50 overflow-y-auto">
                    <!-- Close button -->
                    <div class="p-4 border-b">
                        <button @click="toggleMenu" class="hover:cursor-pointer">
                            <img src="@/assets/images/navigation/close.svg" alt="close" class="w-8 h-8" />
                        </button>
                    </div>

                    <!-- Menu categories -->
                    <div class="menu-content p-4">
                        <!-- Food & Beverages -->
                        <div class="category mb-6">
                            <h2 class="text-2xl font-bold mb-4 text-blue-900">Food & Beverages</h2>
                            <ul class="space-y-3">
                                <li><a href="#" class="text-blue-600">Beverages & Alcoholic Drinks</a></li>
                                <li><a href="#" class="text-blue-600">Snack & Dessert</a></li>
                            </ul>
                        </div>

                        <!-- Baby & Mum -->
                        <div class="category mb-6">
                            <h2 class="text-2xl font-bold mb-4 text-blue-900">Baby & Mum</h2>
                            <ul class="space-y-3">
                                <li><a href="#" class="text-blue-600">Baby Milk Formula</a></li>
                                <li><a href="#" class="text-blue-600">Baby Diaper & Pant</a></li>
                                <li><a href="#" class="text-blue-600">Baby Food</a></li>
                            </ul>
                        </div>

                        <!-- Personal Care & Health -->
                        <div class="category mb-6">
                            <h2 class="text-2xl font-bold mb-4 text-blue-900">Personal Care & Health</h2>
                            <ul class="space-y-3">
                                <li><a href="#" class="text-blue-600">Oral Care</a></li>
                                <li><a href="#" class="text-blue-600">Body Care</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="navigation-bar-item ml-2 hover:cursor-pointer p-2 border-2 border-transparent hover:border-blue-900">
            <RouterLink to="/today-deals">
                <span class="text-blue-600">Today's Deal</span>
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
    console.log(isMenuOpen.value);
};
</script>

<style scoped>
.navigation-bar-item {
    box-sizing: border-box;
    /* Ensures padding and border are included in the element's total width and height */
    height: 50px;
    /* Set a fixed height for uniformity */
    display: flex;
    /* Use flex to center content */
    align-items: center;
    /* Center items vertically */
}

.navigation-bar-menu {
    animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
    from {
        transform: translateX(-100%);
    }

    to {
        transform: translateX(0);
    }
}
</style>
