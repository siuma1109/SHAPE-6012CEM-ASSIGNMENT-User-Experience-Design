<template>
    <div class="container">
        <h1 class="text-3xl font-bold mb-6">My Cart</h1>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Cart Items Section -->
            <div class="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
                <!-- Select All and Remove -->
                <div class="flex items-center mb-4">
                    <div class="flex items-center">
                        <input type="checkbox" id="selectAll" v-model="selectAll" class="w-5 h-5 mr-2"
                            @change="toggleSelectAll">
                        <label for="selectAll" class="text-lg">Select All</label>
                    </div>
                    <button
                        class="ml-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 hover:cursor-pointer"
                        @click="showRemoveSelectedConfirm('all')" :disabled="selectedItems.length === 0">
                        Remove
                    </button>
                </div>

                <!-- Cart Items -->
                <div v-if="cart.length === 0" class="text-center py-8">
                    <p class="text-gray-500">Your cart is empty</p>
                </div>

                <div v-else class="space-y-6">
                    <div v-for="item in cart" :key="item.id" class="flex items-center border-b pb-6">
                        <input type="checkbox" v-model="selectedIds[item.id]" class="w-5 h-5 mr-4"
                            @change="updateSelectAll">

                        <div class="w-24 h-24 border flex items-center justify-center p-2">
                            <img :src="getProductImage(item)" :alt="item.name" @error="handleImageError($event, item)"
                                class="max-w-full max-h-full object-contain">
                        </div>

                        <div class="flex-1 ml-4">
                            <h3 class="text-xl font-medium">{{ item.name }}</h3>
                            <p class="text-sm text-gray-500">Origin: {{ item.origin }}</p>

                            <div class="flex items-center justify-between mt-4">
                                <div>
                                    <p class="text-xl text-red-500 font-bold">${{ item.price }}</p>
                                </div>
                                <div class="flex items-center space-x-4">
                                    <div class="flex items-center">
                                        <button
                                            class="w-10 h-10 bg-blue-600 text-white text-2xl flex items-center justify-center rounded-l-md hover:bg-blue-700 hover:cursor-pointer"
                                            @click="decreaseQuantity(item.id)">
                                            −
                                        </button>
                                        <input type="number" v-model="item.quantity"
                                            @keydown="updateQuantity(item.id, $event.target.value)"
                                            class="w-12 h-10 flex items-center justify-center border-t border-b">
                                        <button
                                            class="w-10 h-10 bg-blue-600 text-white text-2xl flex items-center justify-center rounded-r-md hover:bg-blue-700 hover:cursor-pointer"
                                            @click="increaseQuantity(item.id)">
                                            +
                                        </button>
                                    </div>

                                    <div class="flex items-center">
                                        <span class="text-xl text-red-500 font-bold mr-4">${{ (item.price *
                                            item.quantity).toFixed(2) }}</span>
                                        <button
                                            class="w-10 h-10 bg-red-500 text-white text-xl flex items-center justify-center rounded-md hover:bg-red-700 hover:cursor-pointer"
                                            @click="showRemoveItemConfirm(item.id)">
                                            X
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Order Summary Section -->
            <div class="bg-white p-6 rounded-lg shadow-sm h-fit">
                <h2 class="text-2xl font-bold mb-6">Order Summary</h2>

                <div class="flex justify-between items-center mb-6">
                    <span class="text-lg">Item total</span>
                    <span class="text-xl text-red-500 font-bold">${{ selectedTotal.toFixed(2) }}</span>
                </div>

                <button
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-xl font-semibold hover:cursor-pointer"
                    @click="checkout" :disabled="selectedItems.length === 0">
                    Checkout
                </button>
            </div>
        </div>

        <!-- Confirmation Modal -->
        <div v-if="showConfirmModal" class="fixed inset-0 z-50 flex items-center justify-center">
            <!-- Backdrop -->
            <div class="fixed inset-0 bg-black bg-opacity-50" @click="cancelDelete"></div>

            <!-- Modal -->
            <div class="bg-white rounded-lg shadow-lg w-full max-w-md relative z-10">
                <div class="p-6">
                    <!-- Warning Icon -->
                    <div class="mx-auto w-16 h-16 mb-6 bg-red-100 rounded-full flex items-center justify-center">
                        <span class="text-red-500 text-3xl font-bold">!</span>
                    </div>

                    <h2 class="text-3xl font-bold text-center mb-4">Delete {{ deleteType }}</h2>

                    <p class="text-gray-600 text-center text-lg mb-8">
                        Are you sure you want to delete this {{ deleteType }}? This action cannot be undone.
                    </p>

                    <div class="flex justify-between gap-4">
                        <button
                            class="flex-1 py-4 border border-gray-300 rounded-lg text-xl font-medium hover:bg-gray-100"
                            @click="cancelDelete">
                            Cancel
                        </button>
                        <button
                            class="flex-1 py-4 bg-red-500 text-white rounded-lg text-xl font-medium hover:bg-red-600"
                            @click="confirmDelete">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue';
import {
    getCart,
    removeFromCart,
    updateQuantity as updateItemQuantity,
    increaseQuantity as increaseItemQuantity,
    decreaseQuantity as decreaseItemQuantity,
    getCartTotal
} from '@/services/ShoppingCartService';
import { getProductImage, handleImageError } from '@/services/ProductService';

const cart = ref([]);
const selectAll = ref(false);
const selectedIds = reactive({});

// Confirmation modal state
const showConfirmModal = ref(false);
const itemToDelete = ref(null);
const deleteType = ref('product');
const deleteAction = ref(null);

// Fetch cart data on component mount
onMounted(() => {
    loadCart();
});

const loadCart = () => {
    cart.value = getCart();
    // Maintain selected state after cart reload
    updateSelectAll();
};

// Computed property for selected items
const selectedItems = computed(() => {
    return cart.value.filter(item => selectedIds[item.id]);
});

// Computed property for selected items total
const selectedTotal = computed(() => {
    return getCartTotal(selectedItems.value);
});

// Toggle select all items
const toggleSelectAll = () => {
    cart.value.forEach(item => {
        selectedIds[item.id] = selectAll.value;
    });
};

// Update select all checkbox state based on individual selections
const updateSelectAll = () => {
    selectAll.value = cart.value.length > 0 && cart.value.every(item => selectedIds[item.id]);
};

// Show confirmation for removing selected items
const showRemoveSelectedConfirm = (type) => {
    deleteType.value = type === 'all' ? 'items' : 'item';
    deleteAction.value = type === 'all' ? removeSelected : removeItem;
    showConfirmModal.value = true;
};

// Show confirmation for removing single item
const showRemoveItemConfirm = (id) => {
    itemToDelete.value = id;
    deleteType.value = 'product';
    deleteAction.value = () => removeItem(id);
    showConfirmModal.value = true;
};

// Cancel deletion
const cancelDelete = () => {
    showConfirmModal.value = false;
    itemToDelete.value = null;
    deleteAction.value = null;
};

// Confirm deletion
const confirmDelete = () => {
    if (deleteAction.value) {
        deleteAction.value();
    }
    showConfirmModal.value = false;
    itemToDelete.value = null;
    deleteAction.value = null;
};

// Remove selected items
const removeSelected = () => {
    selectedItems.value.forEach(item => {
        removeFromCart(item);
        delete selectedIds[item.id];
    });
    loadCart();
};

// Remove individual item
const removeItem = (id) => {
    const item = cart.value.find(item => item.id === id);
    if (item) {
        removeFromCart(item);
        delete selectedIds[id];
        loadCart();
    }
};

// Decrease quantity
const decreaseQuantity = (id) => {
    decreaseItemQuantity(id);
    loadCart();
};

// Increase quantity
const increaseQuantity = (id) => {
    increaseItemQuantity(id);
    loadCart();
};

// update quantity
const updateQuantity = (id, quantity) => {
    updateItemQuantity(id, quantity);
    loadCart();
};

// Checkout function
const checkout = () => {
    // Only checkout with selected items
    if (selectedItems.value.length === 0) {
        alert('Please select items to checkout');
        return;
    }

    console.log('Proceeding to checkout with selected items:', selectedItems.value);
};
</script>