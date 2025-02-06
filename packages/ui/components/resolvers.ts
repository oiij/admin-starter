import type { ComponentResolver } from 'unplugin-vue-components'

export function oiijUiResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.match(/^Oiij[A-Z]/)) {
        return {
          name: name.slice(4),
          from: '@oiij/ui',
        }
      }
    },
  }
}
