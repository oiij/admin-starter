import { defineStore } from 'pinia'

// const exclude = ['/login', '/401', '/:all(.*)']
export const useAuthStore = defineStore(
  'authStore',
  () => {
    const login = useLogin()

    const authRouter = useAuthRouter()
    return {
      ...login,
      ...authRouter,
    }
  },
  {
    persist: {
      key: '__AUTH_STORE_PERSIST__',
      pick: ['token', 'logged'],
    },
  },
)
