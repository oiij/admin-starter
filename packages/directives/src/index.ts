import type { App } from 'vue'
import { string } from '@eiog/utils'
import { clickOutside } from './clickOutside'
import { copy } from './copy'
import { debounce } from './debounce'
import { intoView } from './intoView'
import { lazyLoad } from './lazyLoad'
import { longPress } from './longPress'
import { throttle } from './throttle'
import { watermark } from './watermark'

const directives = {
  clickOutside,
  copy,
  debounce,
  intoView,
  lazyLoad,
  longPress,
  throttle,
  watermark,
}

export const directive = {
  install(app: App) {
    Object.entries(directives).forEach(([key, directive]) => {
      app.directive(string.kebabToCamel(key), directive)
    })
  },
}
export default directives
