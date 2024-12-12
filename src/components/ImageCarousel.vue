<script setup>
import { onMounted, onUnmounted } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
  currentIndex: {
    type: Number,
    required: true,
  },
  isOpen: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['close', 'update:currentIndex'])

const handleKeydown = (e) => {
  if (e.key === 'Escape') emit('close')
  if (e.key === 'ArrowRight') nextImage()
  if (e.key === 'ArrowLeft') previousImage()
}

const nextImage = () => {
  emit('update:currentIndex', (props.currentIndex + 1) % props.images.length)
}

const previousImage = () => {
  emit('update:currentIndex', (props.currentIndex - 1 + props.images.length) % props.images.length)
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
  >
    <!-- Close button -->
    <button
      @click="$emit('close')"
      class="absolute top-4 right-4 text-white text-xl hover:text-gray-300"
    >
      ×
    </button>

    <!-- Previous button -->
    <button @click="previousImage" class="absolute left-4 text-white text-4xl hover:text-gray-300">
      ‹
    </button>

    <!-- Image container with footer -->
    <div class="relative flex items-center justify-center">
      <img
        :src="images[currentIndex].src"
        :alt="images[currentIndex].alt"
        class="min-h-[60vh] min-w-[60vw] max-h-[80vh] max-w-[80vw] object-contain"
      />
      <div
        class="absolute bottom-0 left-0 right-0 bg-emerald-400 text-black font-bold p-1 text-center opacity-60 group-hover:opacity-80 transition-opacity duration-300"
      >
        {{ images[currentIndex].alt }}
      </div>
    </div>

    <!-- Next button -->
    <button @click="nextImage" class="absolute right-4 text-white text-4xl hover:text-gray-300">
      ›
    </button>
  </div>
</template>
