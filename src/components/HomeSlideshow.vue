<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const imageFiles = import.meta.glob('@/assets/images/**/*.*', { eager: true })

const categoryOrder = [
  'botanicals',
  'flora',
  'house-portraits',
  'italy',
  'san-francisco',
  'england',
  'other-roads',
]

const categoryNames = {
  'botanicals': 'Botanicals',
  'england': 'England',
  'flora': 'Flora',
  'house-portraits': 'House Portraits',
  'italy': 'Italy',
  'other-roads': 'Other Roads & Studies',
  'san-francisco': 'San Francisco',
}

// Group images by category
const byCategory = {}
Object.entries(imageFiles).forEach(([path, module]) => {
  const parts = path.split('/')
  const imagesIndex = parts.findIndex((p) => p === 'images')
  const category = parts[imagesIndex + 1]
  if (!byCategory[category]) byCategory[category] = []
  byCategory[category].push({
    src: module.default,
    alt: parts[parts.length - 1].split('.')[0],
  })
})


// pools[i] = { label, images: [...], cycleIndex: 0 }
const pools = []
const slides = ref([])
const currentIndex = ref(0)

const buildSlides = () =>
  pools.map((pool) => ({
    src: pool.images[pool.cycleIndex].src,
    alt: pool.images[pool.cycleIndex].alt,
    label: pool.label,
  }))

const goTo = (index) => {
  currentIndex.value = (index + pools.length) % pools.length
}

const next = () => {
  const nextIndex = (currentIndex.value + 1) % pools.length
  if (nextIndex === 0) {
    // Completed a full cycle — advance each pool to its next image
    pools.forEach((pool) => {
      pool.cycleIndex = (pool.cycleIndex + 1) % pool.images.length
    })
    slides.value = buildSlides()
  }
  currentIndex.value = nextIndex
}

let interval = null

onMounted(() => {
  pools.length = 0 // reset in case of HMR re-mount

  const entries = categoryOrder.map((category) => {
    const images = byCategory[category] ?? []
    return {
      label: categoryNames[category] || category,
      images,
      cycleIndex: images.length > 0 ? Math.floor(Math.random() * images.length) : 0,
    }
  })

  pools.push(...entries)

  // Pick first image from each category for cycle 1
  slides.value = buildSlides()

  interval = setInterval(next, 4000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<template>
  <div class="slideshow">
    <div class="slides-container">
      <Transition name="fade">
        <div v-if="slides.length && slides[currentIndex]" :key="currentIndex" class="slide">
          <img :src="slides[currentIndex].src" :alt="slides[currentIndex].alt" class="slide-image" />
        </div>
      </Transition>
    </div>

    <div class="dots">
      <button
        v-for="(slide, i) in slides"
        :key="i"
        :class="['dot', { active: i === currentIndex }]"
        @click="goTo(i)"
      />
    </div>
  </div>
</template>

<style scoped>
.slideshow {
  position: relative;
  width: 100%;
  height: calc(100vh - 180px);
  min-height: 400px;
  overflow: hidden;
  background: #e5e7eb;
  margin-top: 28px;
}

.slides-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.slide {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: top;
}

.dots {
  position: absolute;
  bottom: calc(3.5rem + 10px);
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  z-index: 10;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  padding: 0;
  transition: background 0.2s;
}

.dot.active {
  background: #fff;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 767px) {
  .slideshow {
    height: calc(100vh - 220px);
  }

.nav-btn {
    font-size: 2.25rem;
    padding: 0.2rem 0.6rem;
  }
}
</style>
