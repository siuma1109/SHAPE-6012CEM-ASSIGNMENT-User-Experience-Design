import productsJson from '../mocks/data/products.json'
import categoriesJson from '../mocks/data/categories.json'

const getProducts = () => {
    return productsJson
}

const getProductById = (id) => {
    return productsJson.find(product => product.id === id)
}

export const getProductsByKeyword = (keyword) => {
    // If keyword is undefined or null, return all products
    if (!keyword) {
        return productsJson;
    }

    return productsJson.filter(product =>
        product && product.name && product.name.toLowerCase().includes(keyword.toLowerCase())
    );
}

const getProductsByCategory = (categoryId) => {
    return productsJson.filter(product => product.category_id === categoryId || product.parent_id === categoryId)
}

export const getProductByCategoryIdRecursive = (products, categoryId) => {
    // Convert categoryId to number if it's a string
    const catId = typeof categoryId === 'string' ? parseInt(categoryId, 10) : categoryId

    // Get all subcategories recursively (children, grandchildren, etc.)
    const getAllChildCategories = (parentId) => {
        const children = categoriesJson.filter(cat => cat.parent_id === parentId).map(cat => cat.id)

        // For each child, get its children recursively
        const grandchildren = children.flatMap(childId => getAllChildCategories(childId))

        // Return all descendants (children + grandchildren)
        return [...children, ...grandchildren]
    }

    // Get all category IDs (the main category + all its descendants)
    const allCategoryIds = [catId, ...getAllChildCategories(catId)]

    // Filter products that belong to any of these categories
    return products.filter(product => allCategoryIds.includes(product.category_id))
}

export const getProductImage = (product, category) => {
    //If product already has a photo URL saved (not a placeholder), return it
    if (product.photo_url && !product.photo_url.includes('placehold.co') && !product.photo_url.startsWith('https://source.unsplash.com')) {
        return product.photo_url;
    }

    return `https://placehold.co/300x300/gray/white?text=${encodeURIComponent(product.name.substring(0, 10))}`
}

export const getProductsImage = async () => {
    // Map category IDs to appropriate search terms for Unsplash
    const categoryTerms = {
        9: 'water,bottle', // water
        10: 'alcohol,drink', // alcoholic
        11: 'soda,softdrink', // soft drinks
        12: 'snack,food', // snacks
        13: 'rice,grain', // rice & noodles
        14: 'dairy,milk', // dairy
        18: 'baby,food', // baby food
        19: 'baby,diaper', // baby care
        22: 'skincare', // skincare
        28: 'cleaning,product', // cleaning
        32: 'pet,food', // pet products
        36: 'organic,food', // organic
        38: 'wine,bottle', // wine
        42: 'beauty,cosmetic' // beauty
    }

    // Create a copy of the products to avoid modifying the original directly
    const products = [...productsJson];

    const fetchImage = async (product) => {
        const searchTerm = categoryTerms[product.category_id] || 'product';

        try {
            const response = await fetch(`https://api.unsplash.com/search/photos?query=${searchTerm}`, {
                headers: {
                    Authorization: 'Client-ID {access_token}'
                }
            });

            if (!response.ok) {
                throw new Error(`Unsplash API error: ${response.status}`);
            }

            const data = await response.json();

            if (!data.results || data.results.length === 0) {
                throw new Error('No images found');
            }

            // Use product.id to ensure consistent selection for the same product
            const randomIndex = Math.floor((product.id % data.results.length + data.results.length) % data.results.length);
            return data.results[randomIndex].urls.small;
        } catch (error) {
            console.error(`Error fetching image for product ${product.id}:`, error);
            return `https://placehold.co/300x300/gray/white?text=${encodeURIComponent(product.name.substring(0, 10))}`;
        }
    };

    // Process all products in parallel
    const productPromises = products.map(async (product) => {
        try {
            const imageUrl = await fetchImage(product);
            product.photo_url = imageUrl;
            return product;
        } catch (error) {
            console.error(`Error processing product ${product.id}:`, error);
            product.photo_url = `https://placehold.co/300x300/gray/white?text=${encodeURIComponent(product.name.substring(0, 10))}`;
            return product;
        }
    });

    // Wait for all product image fetches to complete
    await Promise.all(productPromises);

    // Update the original productsJson with the new photo_url values
    for (let i = 0; i < products.length; i++) {
        productsJson[i].photo_url = products[i].photo_url;
    }

    console.log("All products processed with images");

    // Return the complete product list with photos
    return productsJson;
}

// Handle image loading errors
export const handleImageError = (e, product) => {
    // Fallback to a simple placeholder if Unsplash fails
    e.target.src = `https://placehold.co/300x300/gray/white?text=${encodeURIComponent(product.name.substring(0, 10))}`
}

// Function to download the updated products JSON
export const downloadProductsJson = () => {
    const jsonString = JSON.stringify(productsJson, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'products.json';
    document.body.appendChild(a);
    a.click();

    // Clean up
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

export default getProducts
