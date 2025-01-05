import type { BScrollInstance, Options } from '@better-scroll/core'
import type { Ref } from 'vue'
import BScroll from '@better-scroll/core'
import { useElementSize } from '@vueuse/core'
import { onMounted, onUnmounted, ref, shallowRef, watch } from 'vue'

export function useBScroll(option?: Options) {
  const domRef = ref<HTMLElement>()
  const bsRef = shallowRef<BScrollInstance>()
  const x = ref(0)
  const y = ref(0)
  const scrolling = ref(false)
  const { width, height } = useElementSize(domRef)
  function canRender() {
    return width.value > 0 && height.value > 0
  }
  const refresh = () => {
    bsRef.value?.refresh()
  }
  function createOrRefresh() {
    if (bsRef.value) {
      refresh()
      return
    }
    if (!domRef.value || !canRender())
      return
    bsRef.value = new BScroll(domRef.value, {
      scrollX: true,
      probeType: 3,
      ...option,
    }) as any
    bsRef.value?.on('scroll', (p: { x: number, y: number }) => {
      x.value = p.x
      y.value = p.y
    })
    bsRef.value?.on('scrollStart', () => {
      scrolling.value = true
    })
    bsRef.value?.on('scrollEnd', () => {
      scrolling.value = false
    })
  }

  onMounted(() => {
    createOrRefresh()
  })
  onUnmounted(() => {
    bsRef.value?.destroy()
  })

  watch([width, height], () => {
    createOrRefresh()
  })
  return {
    domRef,
    bsRef,
    x,
    y,
    scrolling,
    refresh,
  }
}
export type BSRef = Ref<BScroll>
