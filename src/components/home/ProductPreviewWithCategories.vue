<template>
    <div class="ProductPreviewWithCategories">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4">
            <div class="flex-1 border rounded-lg p-4 text-center" v-for="category in categories" :key="category.name">
                <h3 class="text-lg font-semibold">{{ category.name }}</h3>
                <div class="grid grid-cols-2 gap-2 mb-2">
                    <RouterLink v-for="product in getCategoryProducts(category.id, 4)" :key="product.id"
                        :to="`/search?keyword=${product.name}`">
                        <img :src="getProductImage(product, category)" :alt="product.name"
                            class="w-full h-24 object-cover rounded" @error="handleImageError($event, product)" />
                    </RouterLink>
                </div>
                <RouterLink :to="`/categories/${category.id}`"
                    class="hover:cursor-pointer hover:bg-blue-700 mt-2 bg-blue-500 text-white p-2 rounded">Shop
                    now</RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import categoriesJson from '@/mocks/data/categories.json';
import productsJson from '@/mocks/data/products.json';
import { getProductImage, handleImageError } from '@/services/ProductService';
const categories = ref([]);
const products = ref([]);

// Filter for main categories (those with parent_id === null)
categories.value = categoriesJson.filter(category => category.parent_id === null);
products.value = productsJson;

// Function to get products for a specific category
const getCategoryProducts = (categoryId, limit) => {
    // Get all subcategories of the main category
    const subcategories = categoriesJson.filter(cat => cat.parent_id === categoryId);
    const subcategoryIds = subcategories.map(sub => sub.id);

    // Get products that belong to any of these subcategories
    const categoryProducts = products.value.filter(product =>
        subcategoryIds.includes(product.category_id)
    );

    // Return limited number of products (or fewer if not enough)
    return categoryProducts.slice(0, limit);
};


</script>