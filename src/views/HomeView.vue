<script setup>
import BaseImage from '@/components/BaseImage.vue'

// Import all images dynamically from the assets directory
const imageFiles = import.meta.glob('@/assets/images/**/*.*', { eager: true })

// Transform to image array
const images = Object.entries(imageFiles).map(([path, module]) => ({
  src: module.default,
  alt: path.split('/').pop().split('.')[0],
}))

// Function to generate random positions for images
const getRandomPosition = () => {
  const top = Math.floor(Math.random() * 90) + 5 // Random top position between 5% and 95%
  const left = Math.floor(Math.random() * 90) + 5 // Random left position between 5% and 95%
  return { top: `${top}%`, left: `${left}%` }
}

// Function to generate random rotation for images
const getRandomRotation = () => {
  const rotation = Math.floor(Math.random() * 21) - 10 // Random rotation between -10 and 10 degrees
  return `rotate(${rotation}deg)`
}
</script>

<template>
  <div class="relative w-full h-screen overflow-hidden">
    <!-- Display images with random positions, slight overlap, and random rotation -->
    <div v-for="(image, index) in images" :key="index" class="absolute" :style="{ ...getRandomPosition(), transform: getRandomRotation() }">
      <BaseImage :src="image.src" :alt="image.alt" :container-width="250" :container-height="250" />
    </div>

    <!-- Welcome text in the center of the screen -->
    <div class="absolute inset-0 flex items-center justify-center">
      <h1 class="text-4xl font-bold text-white bg-black bg-opacity-50 p-4 rounded-lg">
        Welcome to Art by Nancy
      </h1>
    </div>
  </div>
</template>

<style></style>
