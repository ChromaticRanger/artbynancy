<script setup>
import BaseImage from '@/components/BaseImage.vue'

// Import all images dynamically from the assets directory
const imageFiles = import.meta.glob('@/assets/images/**/*.*', { eager: true })

// Transform to image array
const images = Object.entries(imageFiles).map(([path, module]) => ({
  src: module.default,
  alt: path.split('/').pop().split('.')[0],
}))

// Function to generate random rotation for images
const getRandomRotation = () => {
  const rotation = Math.floor(Math.random() * 41) - 20 // Random rotation between -20 and 20 degrees
  return `rotate(${rotation}deg)`
}

// Function to generate random position within a grid cell
const getRandomPositionInCell = () => {
  const top = Math.floor(Math.random() * 40) + 10 // Random top position between 10% and 50%
  const left = Math.floor(Math.random() * 40) + 10 // Random left position between 10% and 50%
  return { top: `${top - 40}%`, left: `${left - 60}%` }
}
</script>

<template>
  <div class="relative w-full h-screen overflow-hidden grid grid-cols-3 gap-4 p-4">
    <!-- Display images in grid cells with random rotation and position within cell -->
    <div v-for="(image, index) in images" :key="index" class="relative w-full h-full">
      <div
        class="absolute"
        :style="{ ...getRandomPositionInCell(), transform: getRandomRotation() }"
      >
        <BaseImage
          :src="image.src"
          :alt="image.alt"
          :container-width="400"
          :container-height="400"
        />
      </div>
    </div>

    <!-- Welcome text in the center of the screen -->
    <div class="absolute inset-0 flex items-center justify-center">
      <h1 class="text-4xl font-bold text-white bg-black bg-opacity-50 p-4 rounded-lg">
        Welcome to Art by Nancy
      </h1>
    </div>
  </div>
</template>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden; /* Prevent scrollbars */
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  padding: 0; /* Remove padding to move images further up and left */
}

.relative {
  position: relative;
}

.absolute {
  position: absolute;
  top: 0; /* Move images further up */
  left: 0; /* Move images further left */
}
</style>
