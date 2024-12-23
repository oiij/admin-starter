import type { ComponentResolver } from 'unplugin-vue-components'

export function eiogUiResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.match(/^Eiog[A-Z]/)) {
        return {
          name: name.slice(4),
          from: '@eiog/ui',
        }
      }
    },
  }
}
