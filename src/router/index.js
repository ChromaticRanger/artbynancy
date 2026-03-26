import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        title: 'Nancy Niederhauser Art - Original Paintings & House Portraits',
        description: 'Explore the artwork of Nancy Niederhauser featuring house portraits, Italian landscapes, San Francisco scenes, and botanical paintings. Commission custom house portraits and discover unique original art.'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: 'About Nancy Niederhauser - Artist Biography',
        description: 'Learn about Nancy Niederhauser, an accomplished artist based in Bristol, England, specializing in house portraits, landscapes, and botanical art. Discover her artistic journey from San Francisco to Italy.'
      }
    },
    {
      path: '/botanicals',
      name: 'botanicals',
      component: () => import('../views/BotanicalsView.vue'),
      meta: {
        title: 'Botanical Art Gallery - Nancy Niederhauser',
        description: 'Explore Nancy Niederhauser\'s botanical art collection featuring detailed studies of plants and flowers. Original paintings capturing the delicate beauty of nature.'
      }
    },
    {
      path: '/flora',
      name: 'flora',
      component: () => import('../views/FloraView.vue'),
      meta: {
        title: 'Floral Paintings - Nancy Niederhauser Art',
        description: 'View Nancy Niederhauser\'s stunning floral paintings and flower studies. Beautiful original artwork perfect for art collectors and nature enthusiasts.'
      }
    },
    {
      path: '/house',
      name: 'house',
      component: () => import('../views/HouseView.vue'),
      meta: {
        title: 'Custom House Portraits - Commission Your Home - Nancy Niederhauser',
        description: 'Commission a personalized house portrait from Nancy Niederhauser. Detailed, meaningful paintings that honor the warmth and character of your special home.'
      }
    },
    {
      path: '/italy',
      name: 'italy',
      component: () => import('../views/ItalyView.vue'),
      meta: {
        title: 'Italian Landscapes & Architecture - Nancy Niederhauser',
        description: 'Discover Nancy Niederhauser\'s Italian art collection featuring landscapes, architecture, gardens, and street scenes from Northern Italy. Original paintings inspired by travel.'
      }
    },
    {
      path: '/sanfran',
      name: 'sanfran',
      component: () => import('../views/SanFranView.vue'),
      meta: {
        title: 'San Francisco Paintings - Nancy Niederhauser Art',
        description: 'View Nancy Niederhauser\'s San Francisco paintings capturing the iconic streets, buildings, and character of the city. Original artwork celebrating San Francisco\'s unique beauty.'
      }
    },
    {
      path: '/roads',
      name: 'roads',
      component: () => import('../views/OtherRoadsView.vue'),
      meta: {
        title: 'Other Roads - Travel & Landscape Paintings - Nancy Niederhauser',
        description: 'Explore Nancy Niederhauser\'s diverse collection of travel and landscape paintings from various journeys. Original artwork capturing memorable places and moments.'
      }
    },
    {
      path: '/england',
      name: 'england',
      component: () => import('../views/EnglandView.vue'),
      meta: {
        title: 'England Paintings - Nancy Niederhauser Art',
        description: 'Explore Nancy Niederhauser\'s England paintings capturing the beauty of the English countryside and gardens. Original artwork inspired by life in Bristol and beyond.'
      }
    },
  ],
})

// Update document title and meta description on route change
router.afterEach((to) => {
  const defaultTitle = 'Nancy Niederhauser Art - Original Paintings & House Portraits'
  const defaultDescription = 'Explore the artwork of Nancy Niederhauser featuring house portraits, Italian landscapes, San Francisco scenes, and botanical paintings.'

  document.title = to.meta.title || defaultTitle

  // Update meta description
  let metaDescription = document.querySelector('meta[name="description"]')
  if (!metaDescription) {
    metaDescription = document.createElement('meta')
    metaDescription.name = 'description'
    document.head.appendChild(metaDescription)
  }
  metaDescription.content = to.meta.description || defaultDescription
})

export default router
