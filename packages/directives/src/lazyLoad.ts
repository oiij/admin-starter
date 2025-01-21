import type { Directive, DirectiveBinding } from 'vue'
import { is } from '@eiog/utils'

type BindingValue = string
type TargetElement = HTMLImageElement & {
  _lazy_load_src: BindingValue
  _lazy_load_observer: IntersectionObserver
}
function setValue(target: TargetElement, binding: DirectiveBinding<BindingValue>) {
  target._lazy_load_src = binding.value
}
export const lazyLoad: Directive = {
  mounted(target: TargetElement, binding: DirectiveBinding<BindingValue>) {
    if (!is.isString(binding.value)) {
      return console.warn('LazyLoad: value is not a string')
    }
    setValue(target, binding)
    target._lazy_load_observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        target.src = target._lazy_load_src
        target._lazy_load_observer.unobserve(target)
        target._lazy_load_observer.disconnect()
      }
    }, { threshold: 1 })
    target._lazy_load_observer.observe(target)
  },
  updated(target: TargetElement, binding: DirectiveBinding<BindingValue>) {
    setValue(target, binding)
  },
  unmounted(target: TargetElement) {
    target._lazy_load_observer.unobserve(target)
    target._lazy_load_observer.disconnect()
  },
}
