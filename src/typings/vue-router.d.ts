import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    layout?: string
    title?: string
    keepAlive?: boolean
    transition?: string
    requireAuth?: boolean
    isLayout?: boolean
    hideOnMenu?: boolean
    icon?: string
  }
}
