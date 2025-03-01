<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
const styles = ref({
  navButtons:
    'bg-[#2d3748] text-white text-lg font-bold py-3 px-5 rounded mr-2 text-center opacity-50 hover:opacity-80 transition-opacity duration-300',
})
</script>

<template>
  <div class="relative min-h-screen bg-gray-200">
    <!-- Add the stylized title here, outside of RouterView -->
    <div class="stylized-title" style="z-index: 200">
      <h1>Art by Nancy</h1>
      <p>Beautiful scenes to treasure or to share.</p>
    </div>

    <header class="w-full flex justify-center pt-4 z-10">
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
    <RouterView />
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

/* Stylized title styles - without background */
.stylized-title {
  position: absolute;
  top: 30px;
  left: 30px;
  transform: rotate(-12deg);
  padding: 15px;
  font-family: 'Brush Script MT', cursive;
  text-align: center;
  max-width: 400px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  pointer-events: none; /* This ensures clicks pass through to elements below */
}

.stylized-title h1 {
  font-size: 4.5rem;
  margin: 0;
  color: #2d3748;
  line-height: 1.2;
}

.stylized-title p {
  font-size: 2.5rem;
  margin: 5px 0 0;
  color: #4a5568;
  font-style: italic;
}
</style>
