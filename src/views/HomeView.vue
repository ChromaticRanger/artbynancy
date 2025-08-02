<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import ImageComponent from '@/components/ImageComponent.vue'

// Import all images dynamically from the assets directory
const imageFiles = import.meta.glob('@/assets/images/**/*.*', { eager: true })

// Create array of all available images
const availableImages = []
Object.entries(imageFiles).forEach(([path, module]) => {
  availableImages.push({
    src: module.default,
    alt: path.split('/').pop().split('.')[0]
  })
})

// Create a dense grid of images that guarantees coverage
const selectedImages = computed(() => {
  const images = []
  const cellSize = 300 // Size of each grid cell
  const cols = 12 // Number of columns (extends beyond viewport)
  const rows = 5 // Number of rows to fill the band height completely
  
  let imageIndex = 0
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Cycle through available images
      const sourceImage = availableImages[imageIndex % availableImages.length]
      
      images.push({
        src: sourceImage.src,
        alt: sourceImage.alt,
        x: col * (cellSize * 0.8), // 80% spacing for overlap
        y: row * (cellSize * 0.5) - (cellSize * 0.6), // 50% spacing for tighter vertical packing
        size: cellSize,
        zIndex: Math.floor(Math.random() * 10) + 1,
        id: `${row}-${col}`
      })
      
      imageIndex++
    }
  }
  
  return images
})

// Prevent scrolling only on the home page
onMounted(() => {
  document.body.style.overflow = 'hidden'
  document.documentElement.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.body.style.overflow = ''
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <div class="relative w-full h-screen overflow-hidden bg-gray-200">
    <!-- Welcome text - positioned above the image band -->
    <div class="absolute top-8 left-0 right-0 flex justify-center z-50">
      <h2 class="welcome-text">Welcome</h2>
    </div>
    
    <!-- Image band container - centered in the middle of the screen -->
    <div class="absolute left-0 right-0 image-band-container">
      <div class="image-band">
        <!-- Create overlapping grid of images -->
        <div 
          v-for="image in selectedImages" 
          :key="image.id" 
          class="image-cell"
          :style="{
            left: `${image.x}px`,
            top: `${image.y}px`,
            zIndex: image.zIndex,
            width: `${image.size}px`,
            height: `${image.size}px`
          }"
        >
          <ImageComponent 
            :src="image.src" 
            :alt="image.alt" 
            :width="image.size" 
            :height="image.size" 
            objectFit="cover"
            class="full-image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.welcome-text {
  font-family: 'Brush Script MT', cursive;
  font-size: 4rem;
  color: #2d3748;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  line-height: 1.2;
}

.image-band-container {
  position: absolute;
  top: 40%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  height: 45vh;
  overflow: hidden;
  background: transparent;
}

.image-band {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.image-cell {
  position: absolute;
  overflow: hidden;
}

/* Force images to fill their containers completely */
.full-image {
  display: block;
  width: 100% !important;
  height: 100% !important;
  border: none !important;
  padding: 0 !important;
  margin: 0 !important;
}

:deep(img) {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  border: none !important;
  outline: none !important;
}
</style>