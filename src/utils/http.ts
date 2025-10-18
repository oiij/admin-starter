import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import type { NotificationReactive } from 'naive-ui'
import axios from 'axios'
import NProgress from 'nprogress'
import { router } from '~/modules/router'

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 1000 * 60 * 100,
  headers: {
    'Content-Type': 'application/json',
  },
})
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (!NProgress.isStarted())
      NProgress.start()
    const { token } = useAuthStore()

    if (token) {
      config.headers.setAuthorization(`Bearer ${token}`)
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)
const notificationRef = ref<NotificationReactive | null>(null)
function notification(title?: string, content?: string) {
  if (notificationRef.value) {
    notificationRef.value.title = title
    notificationRef.value.content = content
  }
  else {
    notificationRef.value = window.$notification.create({ title, content, type: 'error' })
  }
}
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    NProgress.done()
    if (response.status === 200) {
      if (notificationRef.value) {
        notificationRef.value.destroy()
      }
      return response.data
    }

    return Promise.reject(response.data)
  },
  (error: AxiosError<{ msg: string }>) => {
    NProgress.done()
    const { response, request } = error
    if (response) {
      const code = response.status
      if (code === 400) {
        window.$message.error(response.data.msg, { duration: 3000 })
        return Promise.reject(response.data)
      }
      if (code === 401) {
        const { userInfo, token, logged } = storeToRefs(useAuthStore())
        token.value = null
        userInfo.value = null
        logged.value = false
        notification(`${code} 无权限`, response.data.msg)
        const { currentRoutePath } = useAutoRoutes()
        router.push(`/login?redirect=${currentRoutePath.value}`)
        return Promise.reject(response.data)
      }
      notification(`${code} 响应错误`, response.data.msg)
      return Promise.reject(response.data)
    }
    if (request) {
      notification('请求错误', '请联系管理员')
      return Promise.reject(error)
    }
    notification('未知错误', '请联系管理员')
    return Promise.reject(error)
  },
)

export function get<RES = any, REQ = object>(path: string, data?: REQ): Promise<RES> {
  return axiosInstance(path, {
    method: 'get',
    params: data,
  })
}
export function post<RES extends string | object>(path: string, data?: Record<string, any>): Promise<RES> {
  return axiosInstance(path, {
    method: 'post',
    data,
  })
}
