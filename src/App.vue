<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
const styles = ref({
  navButtons:
    'bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2 text-center opacity-50 hover:opacity-80 transition-opacity duration-300',
})
</script>

<template>
  <header class="flex justify-center w-full pt-4">
    <nav class="max-w-6xl">
      <div class="flex flex-row flex-wrap justify-center gap-2">
        <RouterLink to="/" :class="styles.navButtons">Home</RouterLink>
        <RouterLink to="/botanicals" :class="styles.navButtons">Botanicals</RouterLink>
        <RouterLink to="/flora" :class="styles.navButtons">Flora</RouterLink>
        <RouterLink to="/house" :class="styles.navButtons">House Portraits</RouterLink>
        <RouterLink to="/italy" :class="styles.navButtons">Italy</RouterLink>
        <RouterLink to="/sanfran" :class="styles.navButtons">San Francisco</RouterLink>
        <RouterLink to="/roads" :class="styles.navButtons">Other Roads Travelled</RouterLink>
        <RouterLink to="/about" :class="styles.navButtons">About</RouterLink>
      </div>
    </nav>
  </header>

  <RouterView class="m-6" />
</template>

<style scoped></style>
