<script setup>
import { ref } from 'vue'

const loading = ref(true)
const hasError = ref(false)

const handleError = () => {
  loading.value = false
  hasError.value = true
}

defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: '', // Optional title for footer
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
    default: 'contain', // Changed to 'contain' to show full image
  },
  containerWidth: {
    type: Number,
    default: 300,
  },
  containerHeight: {
    type: Number,
    default: 300,
  },
})
</script>

<template>
  <div
    class="relative bg-gray-100 rounded-lg drop-shadow-md shadow-xl flex items-center justify-center overflow-hidden group"
    :style="{
      width: `${containerWidth}px`,
      height: `${containerHeight}px`,
    }"
  >
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
        maxWidth: '90%',
        maxHeight: '90%',
      }"
      class="max-w-full max-h-full rounded-lg shadow-xl transform transition-transform duration-300 group-hover:scale-110"
      @load="loading = false"
      @error="handleError"
    />

    <!-- Title footer -->
    <div
      v-if="title"
      class="absolute bottom-0 left-0 right-0 bg-emerald-400 text-black font-bold p-1 text-center opacity-50 group-hover:opacity-80 transition-opacity duration-300"
    >
      {{ title }}
    </div>

    <!-- Error state -->
    <div v-if="hasError" class="absolute inset-0 flex items-center justify-center bg-red-50">
      <span class="text-red-500">Failed to load image</span>
    </div>
  </div>
</template>
