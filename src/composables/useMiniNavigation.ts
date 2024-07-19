import type { DropdownOption, MenuOption } from 'naive-ui'
import { router } from '~/modules'

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
const { currentPath } = useCurrentRoute()
const { authMenu } = useAuthMenu()
const miniNavigation = computed(() => findMiniNavigation(authMenu.value, currentPath.value))

export function useMiniNavigation() {
  return {
    miniNavigation,
  }
}
