<script setup>
import { ref, computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()

const activeRoute = computed(() => route.path)

const styles = ref({
  navButtons: 'bg-[#2d3748] text-white text-lg font-bold py-3 px-5 rounded mr-2 text-center transition-opacity duration-300',
})

const isActive = (path) => {
  if (path === '/' && activeRoute.value === '/') {
    return true
  }
  return path !== '/' && activeRoute.value.startsWith(path)
}
</script>

<template>
  <div class="relative min-h-screen bg-gray-200">
    <header class="w-full flex flex-col items-center pt-4 z-10">
      <!-- Desktop title - visible on all screens -->
      <div class="desktop-title mb-4">
        <h1>Art by Nancy</h1>
        <p>Beautiful scenes to treasure or to share.</p>
      </div>
      <nav class="max-w-6xl">
        <div class="flex flex-row flex-wrap justify-center gap-2 mt-4">
          <RouterLink to="/" :class="[styles.navButtons, {'opacity-90': isActive('/'), 'opacity-50 hover:opacity-80': !isActive('/')}]">Home</RouterLink>
          <RouterLink to="/about" :class="[styles.navButtons, {'opacity-90': isActive('/about'), 'opacity-50 hover:opacity-80': !isActive('/about')}]">About</RouterLink>
          <RouterLink to="/botanicals" :class="[styles.navButtons, {'opacity-90': isActive('/botanicals'), 'opacity-50 hover:opacity-80': !isActive('/botanicals')}]">Botanicals</RouterLink>
          <RouterLink to="/flora" :class="[styles.navButtons, {'opacity-90': isActive('/flora'), 'opacity-50 hover:opacity-80': !isActive('/flora')}]">Flora</RouterLink>
          <RouterLink to="/house" :class="[styles.navButtons, {'opacity-90': isActive('/house'), 'opacity-50 hover:opacity-80': !isActive('/house')}]">House Portraits</RouterLink>
          <RouterLink to="/italy" :class="[styles.navButtons, {'opacity-90': isActive('/italy'), 'opacity-50 hover:opacity-80': !isActive('/italy')}]">Italy</RouterLink>
          <RouterLink to="/sanfran" :class="[styles.navButtons, {'opacity-90': isActive('/sanfran'), 'opacity-50 hover:opacity-80': !isActive('/sanfran')}]">San Francisco</RouterLink>
          <RouterLink to="/roads" :class="[styles.navButtons, {'opacity-90': isActive('/roads'), 'opacity-50 hover:opacity-80': !isActive('/roads')}]">Other Roads Travelled</RouterLink>
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

/* Desktop title styles */
.desktop-title {
  font-family: 'Brush Script MT', cursive;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 1rem;
}

.desktop-title h1 {
  font-size: 4rem;
  margin: 0;
  color: #2d3748;
  line-height: 1.2;
}

.desktop-title p {
  font-size: 2rem;
  margin: 5px 0 0;
  color: #4a5568;
  font-style: italic;
}

/* Responsive styles for the desktop title */
@media (max-width: 1280px) {
  .desktop-title h1 {
    font-size: 3.5rem;
  }

  .desktop-title p {
    font-size: 1.8rem;
  }
}

@media (max-width: 1024px) {
  .desktop-title h1 {
    font-size: 3rem;
  }

  .desktop-title p {
    font-size: 1.5rem;
  }
}

@media (max-width: 768px) {
  .desktop-title h1 {
    font-size: 2.8rem;
  }

  .desktop-title p {
    font-size: 1.4rem;
  }
}

@media (max-width: 480px) {
  .desktop-title h1 {
    font-size: 2.5rem;
  }

  .desktop-title p {
    font-size: 1.2rem;
  }
}

/* Active navigation button style */
.router-link-active, .router-link-exact-active {
  opacity: 90% !important;
  box-shadow: 0 0 5px rgba(0,0,0,0.4);
}
</style>
