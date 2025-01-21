import type { DropdownOption, IMenuOption as MenuOption } from 'naive-ui'
import type { RouteRecordRaw } from 'vue-router'
import type { StatusType } from '~/api'
import { SvgIcon } from '@eiog/ui'
import { routes as _routes } from 'vue-router/auto-routes'
import { router } from '~/modules'

export function applyMeta(routes: RouteRecordRaw[]) {
  const _routes: RouteRecordRaw[] = []
  routes.forEach((route) => {
    if (route.path === '_')
      return
    const _route = { ...route }
    if (_route.children && _route.children.length > 0) {
      _route.meta = {
        ..._route.meta,
        ..._route.children.find(f => f.path === '_')?.meta,
      }
      _route.children = applyMeta(_route.children).map((m) => {
        return {
          ...m,
          path: `${_route.path}/${m.path}`,
        }
      })
    }
    _routes.push(_route)
  })
  return _routes
}
function verifyRoutesPermission(routes: RouteRecordRaw[], routePermission?: StatusType['Res']['routes']) {
  const _routes: RouteRecordRaw[] = []
  routes.forEach((route) => {
    if (route.meta?.hide || (!!route.meta?.requireAuth && !routePermission?.some(s => s.path === route.path))) {
      return
    }

    if (route.children) {
      route.children = verifyRoutesPermission(route.children, routePermission)
    }
    _routes.push(route)
  })
  return _routes
}
function renderIcon(iconName?: string) {
  if (iconName?.startsWith('svg:')) {
    return () => h(SvgIcon, { name: iconName?.replace('svg:', ''), size: '16px' })
  }
  if (iconName?.startsWith('i-')) {
    return () => h('i', { class: iconName, style: { width: `16px`, height: `16px` } })
  }
  return undefined
}
function routesToNaiveMenu(routes: RouteRecordRaw[]) {
  const _menus: MenuOption[] = []
  routes.forEach((route) => {
    const menu: MenuOption = {
      label: route.meta?.title ?? route.name ?? route.path,
      key: route.path ?? route.name?.toString(),
      icon: renderIcon(route.meta?.icon),
      show: !route.meta?.hideOnMenu,
      meta: route.meta,
    }
    if (route.children) {
      menu.children = routesToNaiveMenu(route.children)
    }

    _menus.push(menu)
  })
  return _menus.sort((a, b) => {
    if (a.meta?.sort && b.meta?.sort)
      return a.meta.sort - b.meta.sort
    return 0
  })
}
function flatRoutes(routes: RouteRecordRaw[]) {
  const _routes: RouteRecordRaw[] = []
  routes.forEach((route) => {
    if (route.children) {
      _routes.push(...flatRoutes(route.children))
    }
    else {
      _routes.push(route)
    }
  })
  return _routes
}
function flatMenu(menus: MenuOption[]) {
  const _menus: MenuOption[] = []
  menus.forEach((menu) => {
    if (menu.children) {
      _menus.push(...flatMenu(menu.children))
    }
    else {
      _menus.push(menu)
    }
  })
  return _menus
}
function searchMenu(value?: string, authFlatMenu?: MenuOption[]) {
  const queryArr = value?.split('')
  const reg = new RegExp(`(.*?)${queryArr?.join('(.*?)')}(.*?)`, 'i')
  const res = authFlatMenu?.filter((f) => {
    if (f.key && f.label)
      return reg.test(f.label as string) || reg.test(f.key.toString())
    return false
  })
  return res ?? []
}
function findMiniNavigation(authMenu: MenuOption[], currentPath: string) {
  const menus: {
    trigger: MenuOption
    dropdown?: DropdownOption[]
  }[] = []
  authMenu.forEach((item, index) => {
    if (item.key === currentPath) {
      return menus.push({
        trigger: item,
        dropdown: authMenu.filter(f => f.key !== item.key),
      })
    }
    if (item.children) {
      item.children.forEach((child) => {
        if (child.key === currentPath) {
          menus.push({
            trigger: authMenu[index],
            dropdown: authMenu.filter((_, i) => i !== index),
          })
          menus.push({
            trigger: child,
            dropdown: item.children?.filter(f => f.key !== child.key),
          })
        }
      })
    }
  })
  return menus.map((m) => {
    m.dropdown = injectProps(m.dropdown)
    return m
  })
}
function injectProps(menuOptions?: MenuOption[]): DropdownOption[] {
  const options: DropdownOption[] = []
  menuOptions?.forEach((item) => {
    const option = { ...item }
    if (item.children) {
      option.children = injectProps(item.children)
    }
    else {
      option.props = {
        onClick() {
          router.push(item.key as string)
        },
      }
    }
    options.push(option)
  })
  return options
}
const routes = applyMeta(_routes)
const { routePermission } = useLogin()
const authRoutes = computed(() => verifyRoutesPermission(routes, routePermission.value))
const authMenu = computed(() => routesToNaiveMenu(authRoutes.value))
const authFlatMenu = computed(() => flatMenu(authMenu.value))
const currentRoute = computed(() => router.currentRoute.value)
const currentPath = computed(() => currentRoute.value.path)
const keepAlivePath = computed(() => flatRoutes(routes).filter(f => f.meta?.keepAlive).map(m => m.path))
const tabsPath = ref<string[]>([])
const tabLoadingPath = ref<string>()
const authTabs = computed(() => {
  return tabsPath.value.map((m) => {
    return authFlatMenu.value.find(f => f.key === m)
  }).filter(f => !!f)
})
const searchValue = ref()
const searchRouteResult = computed(() => searchMenu(searchValue.value, authFlatMenu.value))
const miniNavigation = computed(() => findMiniNavigation(authMenu.value, currentPath.value))

function addTab(path: string) {
  if (!tabsPath.value.includes(path)) {
    tabsPath.value.push(path)
  }
}
function removeTab(path: string) {
  if (tabsPath.value.length === 1)
    return
  if (currentPath.value === path) {
    const index = tabsPath.value.findIndex(f => f === path)
    router.push(tabsPath.value[index - 1])
  }
  tabsPath.value = tabsPath.value.filter(f => f !== path)
}
function clearTab() {
  tabsPath.value = []
}
function setTabLoading(path: string) {
  tabLoadingPath.value = path
}
function removeTabLoading() {
  tabLoadingPath.value = undefined
}
export function useAuthRouter() {
  return {
    routes,
    authRoutes,
    authMenu,
    authFlatMenu,
    currentRoute,
    currentPath,
    keepAlivePath,
    tabsPath,
    authTabs,
    addTab,
    removeTab,
    clearTab,
    searchValue,
    searchRouteResult,
    miniNavigation,
    tabLoadingPath,
    setTabLoading,
    removeTabLoading,
  }
}
