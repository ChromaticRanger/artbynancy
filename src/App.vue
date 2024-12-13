<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
const styles = ref({
  navButtons:
    'bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2 text-center opacity-50 hover:opacity-80 transition-opacity duration-300',
})
</script>

<template>
  <div class="relative min-h-screen bg-gray-200">
    <header class="absolute top-0 left-0 w-full flex justify-center pt-4 z-10">
      <nav class="max-w-6xl">
        <div class="flex flex-row flex-wrap justify-center gap-2 mt-4">
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

    <main class="absolute inset-0 top-16">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

main {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
</style>
