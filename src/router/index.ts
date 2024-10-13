import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '@/views/IndexView.vue'
import OAuth2CallbackView from '@/views/OAuth2CallbackView.vue'
import AboutView from '@/views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: IndexView,
    },
    {
      path: '/about',
      name: 'About',
      component: AboutView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/login/oauth2/code/oidc-client',
      name: 'OidcCallback',
      component: OAuth2CallbackView,
    },
  ],
})

router.beforeEach(to => {
  const { accessToken } = storeToRefs(useAuthStore())
  // to.matched.some(record => record.meta.requiresAuth) 처럼
  // 모든 라우트 레코드를 확인할 필요가 없음.
  if (to.meta.requiresAuth && !accessToken.value) {
    // 이 라우트는 인증이 필요하므로 로그인 여부를 확인하고
    // 로그인하지 않았다면 로그인 페이지로 리다이렉션합니다.
    return {
      path: '/login',
      // 나중에 돌아올 수 있도록 현재 위치를 저장합니다.
      query: { redirect: to.fullPath },
    }
  }
})

export default router
