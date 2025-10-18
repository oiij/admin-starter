import type { UserType } from '~/api'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', () => {
  const token = ref<string | null>(null)
  const userInfo = ref<UserType | null>(null)
  const permission = ref<string[]>([])
  const logged = ref(false)

  return {
    token,
    userInfo,
    permission,
    logged,
  }
}, {
  persist: {
    key: '__AUTH_STORE_PERSIST__',
    pick: ['token'],
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
