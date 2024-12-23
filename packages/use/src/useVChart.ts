import type { ISpec } from '@visactor/vchart'
import type { ComputedRef } from 'vue'
import { VChart } from '@visactor/vchart'
import { useElementSize } from '@vueuse/core'
import { computed, onUnmounted, ref, shallowRef, watch } from 'vue'

VChart.useRegisters([])
export function useVChart<T extends ISpec>(spec: ComputedRef<T>, darkMode?: ComputedRef<boolean>, onRendered?: (chartInstance: VChart) => void) {
  const domRef = ref<HTMLElement>()
  const vChart = shallowRef<VChart>()
  const { width, height } = useElementSize(domRef)
  function canRender() {
    return domRef.value && width.value > 0 && height.value > 0
  }
  function update() {
    if (vChart.value) {
      vChart.value.updateSpec(spec.value)
      vChart.value.renderSync()
    }
  }
  function render() {
    if (domRef.value) {
      vChart.value = new VChart(spec.value, {
        dom: domRef.value,
        theme: darkMode?.value ? 'dark' : 'light',
      })
      vChart.value.renderSync()
      if (onRendered) {
        onRendered(vChart.value)
      }
    }
  }
  function destroy() {
    vChart.value?.release()
  }
  watch([width, height], ([width, height]) => {
    if (canRender()) {
      if (!vChart.value) {
        render()
      }
      else {
        vChart.value.resizeSync(width, height)
      }
    }
  })
  watch(spec, () => {
    update()
  })
  watch(darkMode || computed(() => false), () => {
    vChart.value?.setCurrentThemeSync(darkMode?.value ? 'dark' : 'light')
  })
  onUnmounted(() => {
    destroy()
  })
  return {
    domRef,
  }
}
