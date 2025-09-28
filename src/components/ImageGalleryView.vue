<script setup>
import ImageGrid from '@/components/ImageGrid.vue'
import ImageCarousel from '@/components/ImageCarousel.vue'
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
})

// Import all images dynamically using the provided path
const imageFiles = import.meta.glob('@/assets/images/**/*.*', { eager: true })

// Filter images based on the provided path and transform to image array
const images = Object.entries(imageFiles)
  .filter(([path]) => path.includes(props.imagePath))
  .map(([path, module]) => ({
    src: module.default,
    alt: path.split('/').pop().split('.')[0],
  }))

const isCarouselOpen = ref(false)
const currentImageIndex = ref(0)

const openCarousel = (index) => {
  currentImageIndex.value = index
  isCarouselOpen.value = true
}
</script>

<template>
  <div class="container mx-auto mt-10 px-4 md:px-6 lg:px-8">
    <h1 class="gallery-title mb-10">{{ title }}</h1>
    <ImageGrid :images="images" :min-width="300" :gap="20" @image-click="openCarousel" />
    <ImageCarousel
      v-model:currentIndex="currentImageIndex"
      :images="images"
      :is-open="isCarouselOpen"
      @close="isCarouselOpen = false"
    />
  </div>
</template>

<style scoped>
.gallery-title {
  font-family: 'Brush Script MT', cursive;
  font-size: 2.5rem;
  color: #2d3748;
  text-align: center;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  line-height: 1.2;
}

@media (max-width: 768px) {
  .gallery-title {
    font-size: 2.8rem;
  }
}

@media (max-width: 480px) {
  .gallery-title {
    font-size: 2.5rem;
  }
}
</style>
