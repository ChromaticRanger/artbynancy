<script setup>
import { ref } from 'vue'

defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  width: {
    type: [String, Number],
    default: 'auto',
  },
  height: {
    type: [String, Number],
    default: 'auto',
  },
  objectFit: {
    type: String,
    default: 'contain',
  },
})

const loading = ref(true)
const hasError = ref(false)

const handleError = () => {
  loading.value = false
  hasError.value = true
}
</script>

<template>
  <div class="relative w-full h-full">
    <!-- Loading state -->
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center">
      <div class="animate-pulse bg-gray-200 w-full h-full"></div>
    </div>

    <!-- Image -->
    <img
      :src="src"
      :alt="alt"
      :style="{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        objectFit,
      }"
      class="transform transition-transform duration-300"
      @load="loading = false"
      @error="handleError"
    />

    <!-- Error state -->
    <div v-if="hasError" class="absolute inset-0 flex items-center justify-center bg-red-50">
      <span class="text-red-500">Failed to load image</span>
    </div>
  </div>
</template>
