<template>
    <div class="actions flex items-center p-3">
        <RouterLink to="/profile" class="action-button">
            <img src="@/assets/images/header/user-icon.svg" alt="profile" class="w-6 h-6" />
        </RouterLink>
        <RouterLink to="/shopping-cart" class="action-button">
            <img src="@/assets/images/header/shopping-cart.svg" alt="shopping-cart" class="w-6 h-6" />
        </RouterLink>
    </div>
</template>

<style scoped>
.action-button {
    margin-right: 10px;
}
</style>