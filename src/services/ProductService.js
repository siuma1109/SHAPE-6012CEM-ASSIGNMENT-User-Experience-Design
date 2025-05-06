import productsJson from '../mocks/data/products.json'
import categoriesJson from '../mocks/data/categories.json'

const getProducts = () => {
    return productsJson
}

const getProductById = (id) => {
    return productsJson.find(product => product.id === id)
}

const getProductsByCategory = (categoryId) => {
    return productsJson.filter(product => product.category_id === categoryId || product.parent_id === categoryId)
}

export const getProductByCategoryIdRecursive = (categoryId) => {
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
    return productsJson.filter(product => allCategoryIds.includes(product.category_id))
}

export default getProducts