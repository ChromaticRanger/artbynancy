<script setup>
import ImageComponent from '@/components/ImageComponent.vue'

// Import all images dynamically from the assets directory
const imageFiles = import.meta.glob('@/assets/images/**/*.*', { eager: true })

// Group images by their directories
const groupedImages = {}
Object.entries(imageFiles).forEach(([path, module]) => {
  const directory = path.split('/')[3] // Assuming directory structure is /assets/images/<directory>/*
  if (!groupedImages[directory]) {
    groupedImages[directory] = []
  }
  groupedImages[directory].push({
    src: module.default,
    alt: path.split('/').pop().split('.')[0],
  })
})

// Function to get 5 random images from an array
const getRandomImages = (images, count) => {
  const shuffled = images.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

// Select 5 random images from each directory
const selectedImages = []
Object.values(groupedImages).forEach((images) => {
  selectedImages.push(...getRandomImages(images, 27))
})

// Function to generate random position within a grid cell
const getRandomPositionInCell = (imageWidth, imageHeight) => {
  const top = Math.floor(Math.random() * 50) + 10 // Random top position between 10% and 50%
  const left = Math.floor(Math.random() * 50) + 10 // Random left position between 10% and 50%
  return {
    top: `calc(${top}% - ${imageHeight / 2}px)`,
    left: `calc(${left}% - ${imageWidth / 2}px)`,
  }
}

// Function to generate random z-index
const getRandomZIndex = () => {
  return Math.floor(Math.random() * 100) // Random z-index between 0 and 99
}
</script>

<template>
  <div class="relative w-full h-screen overflow-hidden">
    <!-- Welcome text - positioned above the image band -->
    <div class="w-full flex justify-center mt-8" style="z-index: 200; position: relative;">
      <h2 class="welcome-text">Welcome</h2>
    </div>
    
    <div class="flex items-center justify-center h-full">
      <div class="grid-container grid grid-cols-3 gap-2 opacity-90">
        <!-- Display images in grid cells with random position within cell -->
        <div v-for="(image, index) in selectedImages" :key="index" class="relative w-full h-full">
          <div
            class="absolute"
            :style="{ ...getRandomPositionInCell(600, 600), zIndex: getRandomZIndex() }"
          >
            <ImageComponent :src="image.src" :alt="image.alt" :width="600" :height="600" />
          </div>
        </div>
      </div>
    </div>

    <!-- Mask over the top section of the image grid -->
    <div class="absolute top-2 left-0 w-full h-1/5 bg-gray-200" style="z-index: 100"></div>

    <!-- Mask over the bottom section of the image grid -->
    <div class="absolute bottom-0 left-0 w-full h-1/4 bg-gray-200" style="z-index: 100"></div>
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

.welcome-text {
  font-family: 'Brush Script MT', cursive;
  font-size: 4rem;
  color: #2d3748;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  line-height: 1.2;
  z-index: 50;
}

.grid-container {
  width: 100vw; /* Two-thirds of the viewport width */
  height: 40vh; /* Two-thirds of the viewport height */
  display: flex;
  align-items: center;
  justify-content: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}

.relative {
  position: relative;
}

.absolute {
  position: absolute;
}
</style>
