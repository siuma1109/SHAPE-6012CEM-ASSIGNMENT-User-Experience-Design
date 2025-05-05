<template>
    <RouterLink class="logo" to="/">
        <img src="@/assets/images/header/PNS-logo.png" alt="logo" />
    </RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.logo {
    height: 80px;
    width: auto;
}

.logo img {
    width: 100%;
    height: 100%;
}
</style>