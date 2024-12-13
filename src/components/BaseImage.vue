<script setup>
defineProps({
  title: {
    type: String,
    default: '', // Optional title for footer
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
    <slot></slot>

    <!-- Title footer -->
    <div
      v-if="title"
      class="absolute bottom-0 left-0 right-0 bg-emerald-400 text-black font-bold p-1 text-center opacity-50 group-hover:opacity-80 transition-opacity duration-300"
    >
      {{ title }}
    </div>
  </div>
</template>
