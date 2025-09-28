<script setup>
import BaseImage from './BaseImage.vue'
import ImageComponent from './ImageComponent.vue'

defineProps({
  images: {
    type: Array,
    required: true,
    validator: (images) => images.every((img) => img.src && img.alt),
  },
  minWidth: {
    type: Number,
    default: 300, // Minimum width of each grid item
  },
  gap: {
    type: Number,
    default: 16, // Gap between grid items
  },
})

defineEmits(['image-click'])
</script>

<template>
  <div
    class="grid w-full justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-auto-fit"
    :style="{
      gap: `${gap}px`,
      '--min-width': `${minWidth}px`,
    }"
  >
    <BaseImage
      v-for="(image, index) in images"
      :key="index"
      :title="image.alt"
      :container-width="300"
      :container-height="300"
      class="cursor-pointer"
      @click="$emit('image-click', index)"
    >
      <ImageComponent :src="image.src" :alt="image.alt" :width="300" :height="300" />
    </BaseImage>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .lg\:grid-cols-auto-fit {
    grid-template-columns: repeat(auto-fit, minmax(var(--min-width), 1fr));
  }
}
</style>
