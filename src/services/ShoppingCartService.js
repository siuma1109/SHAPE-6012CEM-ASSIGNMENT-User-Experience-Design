import { ref } from "vue"

// Initialize cart from localStorage if available
const storedCart = localStorage.getItem('cart')
const cart = ref(storedCart ? JSON.parse(storedCart) : [])

// Helper function to save cart to localStorage
const saveCart = () => {
    // Remove selected property before saving to localStorage
    const cartToSave = cart.value.map(item => {
        const { selected, ...itemWithoutSelected } = item;
        return itemWithoutSelected;
    });
    localStorage.setItem('cart', JSON.stringify(cartToSave))
}

export const addToCart = (product) => {
    const existingProduct = cart.value.find(p => p.id === product.id)
    if (existingProduct) {
        existingProduct.quantity += 1
    } else {
        cart.value.push({ ...product, quantity: 1 })
    }
    saveCart()
}

export const removeFromCart = (product) => {
    cart.value = cart.value.filter(p => p.id !== product.id)
    saveCart()
}

export const updateQuantity = (productId, quantity) => {
    const product = cart.value.find(p => p.id === productId)
    if (product) {
        product.quantity = quantity
        saveCart()
    }
}

export const decreaseQuantity = (productId) => {
    const product = cart.value.find(p => p.id === productId)
    if (product && product.quantity > 1) {
        product.quantity -= 1
        saveCart()
    }
}

export const increaseQuantity = (productId) => {
    const product = cart.value.find(p => p.id === productId)
    if (product) {
        product.quantity += 1
        saveCart()
    }
}

export const getCartTotal = (selectedItems = []) => {
    if (selectedItems.length === 0) {
        return 0;
    }

    return selectedItems.reduce((total, item) => {
        return total + (item.price * item.quantity)
    }, 0)
}

export const getCart = () => {
    return cart.value
}

export default getCart
