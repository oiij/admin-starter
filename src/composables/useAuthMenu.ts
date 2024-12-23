import type { MenuOption } from 'naive-ui'
import type { RouteRecordRaw } from 'vue-router'
import type { StatusType } from '~/api'
import { routes } from 'vue-router/auto-routes'
import SvgIcon from '~/components/SvgIcon.vue'

function routesFormat(routes: RouteRecordRaw[]) {
  const routeList: RouteRecordRaw[] = []
  routes.forEach((route) => {
    if (route.children) {
      const children: RouteRecordRaw[] = []
      route.children.forEach((f) => {
        if (f.meta?.isLayout === true && f.children) {
          children.push({ ...f.children[0], path: `${route.path}/${f.path}` })
        }
      })
      route.children = children
    }
    routeList.push(route)
  })
  return routeList
}
function renderIcon(iconName?: string) {
  if (iconName?.startsWith('svg:')) {
    return () => h(SvgIcon, { name: iconName?.replace('svg:', '') })
  }
  return () => h('i', { class: iconName })
}
function auth2Menu(routeList: RouteRecordRaw[], routePermission?: StatusType['Res']['routes']) {
  const routeMenus: MenuOption[] = []
  routeList.forEach((route) => {
    if (route.meta?.hideOnMenu || (route.meta?.requireAuth && !routePermission?.some(s => s.path === route.path)))
      return
    const routeMenu: MenuOption = {
      label: route.meta?.title ?? (route.name as string),
      key: route.path,
      icon: renderIcon(route.meta?.icon),
      show: !route.meta?.hideOnMenu,
      meta: route.meta,
    }
    if (route.children)
      routeMenu.children = auth2Menu(route.children, routePermission)
    routeMenus.push(routeMenu)
  })
  return routeMenus
}
function flatMenu(menus: MenuOption[]) {
  const returns: MenuOption[] = []
  menus.forEach((menu) => {
    if (menu.children) {
      returns.push(...flatMenu(menu.children))
    }
    else {
      returns.push(menu)
    }
  })
  return returns
}
const { routePermission } = useLogin()
const rawRoutes = computed(() => routesFormat(routes))
const authMenu = computed(() => {
  return auth2Menu(rawRoutes.value, routePermission.value)
})
const authFlatMenu = computed(() => {
  return flatMenu(authMenu.value)
})
export function useAuthMenu() {
  return {
    rawRoutes,
    authMenu,
    authFlatMenu,
  }
}
