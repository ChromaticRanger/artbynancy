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

// Function to generate random rotation for images
const getRandomRotation = () => {
  const rotation = Math.floor(Math.random() * 41) - 20 // Random rotation between -20 and 20 degrees
  return `rotate(${rotation}deg)`
}

// Function to generate random position within a grid cell
const getRandomPositionInCell = (imageWidth, imageHeight) => {
  const top = Math.floor(Math.random() * 40) + 10 // Random top position between 10% and 50%
  const left = Math.floor(Math.random() * 40) + 10 // Random left position between 10% and 50%
  return {
    top: `calc(${top}% - ${imageHeight / 2}px)`,
    left: `calc(${left}% - ${imageWidth / 2}px)`,
  }
}
</script>

<template>
  <div class="relative w-full h-screen overflow-hidden flex items-center justify-center">
    <div class="grid-container grid grid-cols-3 gap-2">
      <!-- Display images in grid cells with random position within cell -->
      <div v-for="(image, index) in selectedImages" :key="index" class="relative w-full h-full">
        <div
          class="absolute"
          :style="{ ...getRandomPositionInCell(450, 450), transform: getRandomRotation() }"
        >
          <ImageComponent :src="image.src" :alt="image.alt" :width="450" :height="450" />
        </div>
      </div>
    </div>

    <!-- Welcome text in the center of the screen -->
    <div class="absolute inset-0 flex items-center justify-center">
      <h1 class="text-4xl font-bold text-white bg-black bg-opacity-50 p-4 rounded-lg">
        Art by Nancy
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
