import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectWrapperView.vue'),
      children: [
        {
          path: "",
          name: "projects",
          component: () => import('../views/ProjectsView.vue'),
        },
        {
          path: "web/:project",
          name: "project",
          component: () => import('../views/ProjectView.vue'),
        },
        {
          path: "phone/:project",
          name: "phone",
          component: () => import('../views/ProjectViewPhone.vue'),
        }
      ]
    },
    // {
    //   path: '/projects',
    //   name: 'projects',
    //   component: () => import('../views/ProjectsView.vue')
    // },
    // {
    //   path: '/projects/:project',
    //   name: 'project',
    //   component: () => import('../views/ProjectView.vue')
    // },
    // TODO :: 404
    // {
    //   path: '/:pathMatch(.*)*',
    //   name: 'Backrooms',
    //   component: () => import('../views/BackroomsView.vue')
    // },
  ]
})

// dynamic transitions
// check how to use route name to swap GSAP transitions
// pass it to route store !!! and update transitions accordingly
// check against vueuse router
// router.afterEach((to, from) => {
//   const toDepth = to.path.split('/').length
//   const fromDepth = from.path.split('/').length
//   to.meta.transition = toDepth < fromDepth ? 'slide-right' : 'slide-left'
//   console.debug('to', toDepth, 'from', fromDepth)
// })

export default router
