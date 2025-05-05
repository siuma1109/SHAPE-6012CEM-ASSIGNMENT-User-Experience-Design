<script setup>
import Header from './components/header/Header.vue'
import NavigationBar from './components/navigation/NavigationBar.vue'
</script>

<template>
  <Header />
  <NavigationBar />
  <main>
    <RouterView />
  </main>
</template>

<style scoped>

</style>
