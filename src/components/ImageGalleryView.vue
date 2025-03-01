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
  <div class="container mx-auto mt-16">
    <h1 class="text-3xl font-bold mb-6">{{ title }}</h1>
    <ImageGrid :images="images" :min-width="300" :gap="20" @image-click="openCarousel" />
    <ImageCarousel
      v-model:currentIndex="currentImageIndex"
      :images="images"
      :is-open="isCarouselOpen"
      @close="isCarouselOpen = false"
    />
  </div>
</template>
