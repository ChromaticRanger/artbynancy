<script setup>
import { onMounted, onUnmounted } from 'vue'
import HomeSlideshow from '@/components/HomeSlideshow.vue'

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
  <div class="w-full">
    <HomeSlideshow />
  </div>
</template>
