<template>
    <div class="all-products-container">
        <h1>All Products</h1>
        <div class="actions">
            <button @click="downloadJson" class="download-btn">Download Products JSON</button>
        </div>
        <div class="loading-message" v-if="loading">
            Loading product images... This may take a moment.
        </div>
        <div class="products-grid" v-else>
            <div v-for="product in products" :key="product.id" class="product-card">
                <img 
                    :src="product.photo_url" 
                    :alt="product.name" 
                    @error="handleImageError($event, product)"
                    class="product-image"
                />
                <div class="product-details">
                    <h3>{{ product.name }}</h3>
                    <p>{{ product.price_formatted }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getProductsImage, downloadProductsJson, handleImageError } from '@/services/ProductService';

const products = ref([]);
const loading = ref(true);

onMounted(async () => {
    try {
        products.value = await getProductsImage();
    } catch (error) {
        console.error('Error loading products:', error);
    } finally {
        loading.value = false;
    }
});

const downloadJson = () => {
    downloadProductsJson();
};
</script>

<style scoped>
.all-products-container {
    padding: 20px;
}

.actions {
    margin: 20px 0;
}

.download-btn {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

.download-btn:hover {
    background-color: #45a049;
}

.loading-message {
    padding: 20px;
    text-align: center;
    font-size: 18px;
}

.products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
}

.product-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s ease;
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.product-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.product-details {
    padding: 15px;
}

.product-details h3 {
    margin-top: 0;
    margin-bottom: 10px;
}

.product-details p {
    margin: 0;
    color: #E91E63;
    font-weight: bold;
}
</style>