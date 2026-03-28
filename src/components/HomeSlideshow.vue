<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const imageFiles = import.meta.glob('@/assets/images/**/*.*', { eager: true })

const categoryNames = {
  'botanicals': 'Botanicals',
  'england': 'England',
  'flora': 'Flora',
  'house-portraits': 'House Portraits',
  'italy': 'Italy',
  'other-roads': 'Other Roads Travelled',
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

const MIN_RESOLUTION = 1000 // minimum pixels on the longer side

const getImageInfo = (src) =>
  new Promise((resolve) => {
    const img = new Image()
    img.onload = () =>
      resolve({
        portrait: img.naturalHeight > img.naturalWidth,
        highRes: Math.max(img.naturalWidth, img.naturalHeight) >= MIN_RESOLUTION,
      })
    img.onerror = () => resolve({ portrait: false, highRes: false })
    img.src = src
  })

// pools[i] = { label, images: [...], lastSrc: null }
const pools = []
const slides = ref([])
const currentIndex = ref(0)

const pickFromPool = (pool) => {
  const candidates =
    pool.images.length > 1 ? pool.images.filter((img) => img.src !== pool.lastSrc) : pool.images
  const image = candidates[Math.floor(Math.random() * candidates.length)]
  pool.lastSrc = image.src
  return image
}

const goTo = (index) => {
  const newIndex = (index + pools.length) % pools.length
  const image = pickFromPool(pools[newIndex])
  slides.value[newIndex] = { src: image.src, alt: image.alt, label: pools[newIndex].label }
  currentIndex.value = newIndex
}

const next = () => goTo(currentIndex.value + 1)

let interval = null

onMounted(async () => {
  pools.length = 0 // reset in case of HMR re-mount

  const entries = await Promise.all(
    Object.entries(byCategory).map(async ([category, images]) => {
      const checked = await Promise.all(
        images.map(async (img) => ({ img, ...(await getImageInfo(img.src)) })),
      )

      const portraitHighRes = checked.filter(({ portrait, highRes }) => portrait && highRes).map(({ img }) => img)
      const portraitAny = checked.filter(({ portrait }) => portrait).map(({ img }) => img)

      // Prefer portrait + high-res, fall back to portrait any-res, then all images
      const pool =
        portraitHighRes.length > 0 ? portraitHighRes : portraitAny.length > 0 ? portraitAny : images

      return {
        label: categoryNames[category] || category,
        images: pool,
        lastSrc: null,
      }
    }),
  )

  pools.push(...entries)

  // Pick initial image for each slot
  slides.value = pools.map((pool) => {
    const image = pickFromPool(pool)
    return { src: image.src, alt: image.alt, label: pool.label }
  })

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
          <div class="slide-caption">{{ slides[currentIndex].label }}</div>
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

.slide-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.75rem 1.5rem;
  background: rgba(0, 0, 0, 0.45);
  font-family: 'Brush Script MT', cursive;
  font-size: 2rem;
  color: #fff;
  text-align: center;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);
}

.dots {
  position: absolute;
  bottom: 3.5rem;
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

  .slide-caption {
    font-size: 1.5rem;
  }

  .nav-btn {
    font-size: 2.25rem;
    padding: 0.2rem 0.6rem;
  }
}
</style>
