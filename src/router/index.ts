import { createRouter, createWebHistory } from 'vue-router'
import OAuth2CallbackView from '@/views/OAuth2CallbackView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/login/oauth2/code/oidc-client',
      name: 'OidcCallback',
      component: OAuth2CallbackView,
      props: (to) => {
        return {
          clientId: to.params.clientId,
          state: to.query.state,
          code: to.query.code,
          error: to.query.error,
          errorDescription: to.query.error_description,
          errorUri: to.query.error_uri,
        }
      }
    },
  ],
})

export default router
