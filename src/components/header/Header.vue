<template>
    <header class="flex items-center justify-between w-full bg-blue-600">
        <div class="flex items-center">
            <Logo />
            <SearchBar />
        </div>
        <Actions />
    </header>
</template>

<script setup>
import Logo from '../icons/Logo.vue'
import SearchBar from './SearchBar.vue'
import Actions from './Actions.vue'
</script>
