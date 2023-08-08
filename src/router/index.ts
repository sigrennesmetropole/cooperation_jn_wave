import { createRouter, createWebHistory } from 'vue-router'
import { _paq } from '@/matomo.js'
import { useViewsStore } from '@/stores/views'

const redirectToRoofSelection = (
  // @ts-ignore
  to,
  // @ts-ignore
  from,
  // @ts-ignore
  next
) => {
  if (
    (from.name === undefined || from.name === null) &&
    to.name !== 'home' &&
    to.name !== 'legal-notice'
  ) {
    next({ name: 'roof-selection' })
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    redirect: '/home',
    meta: {
      title: 'Page Home',
    },
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: {
      title: 'Page Home',
    },
  },
  {
    path: '/measurements',
    name: 'measurements',
    component: () => import('../views/MeasurementsView.vue'),
    meta: {
      title: 'Page Measurements',
    },
  },
  {
    path: '/legalnotice/:legallink',
    name: 'legal-notice',
    component: () => import('../views/LegalNoticeView.vue'),
    beforeEnter: redirectToRoofSelection,
    meta: {
      title: 'Page Legal Notice',
    },
  },

  // TODO: Create 404 route?
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

if (router !== undefined) {
  router.afterEach(
    (
      // @ts-ignore
      to,
      // @ts-ignore
      from
    ) => {
      // Track the page view after navigation is confirmed
      _paq.push(['setCustomUrl', to.fullPath])
      _paq.push(['setDocumentTitle', to.meta.title || 'My New Title'])
      _paq.push(['trackPageView'])

      //Store the previous route
      const viewStore = useViewsStore()
      viewStore.previousRoute = from.name as string
    }
  )
}

export { routes }
export default router
