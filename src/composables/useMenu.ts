import { useNaiveMenu } from '@oiij/naive-ui'
import { renderIcon } from '~/utils/render-icon'

export function useMenu() {
  const { authRoutes } = useAutoRoutes()
  const { menuOptions, flattenedMenuOptions } = useNaiveMenu(authRoutes, {
    renderIcon: icon => renderIcon(icon),
  })
  return {
    menuOptions,
    flattenedMenuOptions,
  }
}
