import type {
  BarSeriesOption,
  LineSeriesOption,
  PieSeriesOption,
} from 'echarts/charts'
import type {
  DatasetComponentOption,
  GridComponentOption,
  LegendComponentOption,
  TitleComponentOption,
  ToolboxComponentOption,
  TooltipComponentOption,
} from 'echarts/components'
import type { ComputedRef, Ref } from 'vue'
import { useElementSize } from '@vueuse/core'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  TransformComponent,
} from 'echarts/components'
import * as echarts from 'echarts/core'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { computed, nextTick, onUnmounted, ref, watch } from 'vue'

export type { BarSeriesOption, LineSeriesOption, PieSeriesOption } from 'echarts/charts'
export type {
  DatasetComponentOption,
  GridComponentOption,
  LegendComponentOption,
  TitleComponentOption,
  ToolboxComponentOption,
  TooltipComponentOption,
} from 'echarts/components'
export type EChartsOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
  | TitleComponentOption
  | LegendComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | ToolboxComponentOption
  | DatasetComponentOption
>
echarts.use([
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  ToolboxComponent,
  BarChart,
  LineChart,
  PieChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
])
export function useEcharts<T extends EChartsOption >(
  options: Ref<T> | ComputedRef<T>,
  darkMode?: ComputedRef<boolean>,
  renderFun?: (chartInstance: echarts.ECharts) => void,
) {
  let chart: echarts.ECharts | null = null
  const domRef = ref<HTMLElement>()
  const { width, height } = useElementSize(domRef)

  function canRender() {
    return domRef.value && width.value > 0 && height.value > 0
  }

  function isRendered() {
    return Boolean(domRef.value && chart)
  }

  function update(updateOptions: T) {
    if (isRendered())
      chart?.setOption({ ...updateOptions, backgroundColor: 'transparent' })
  }

  async function render() {
    if (domRef.value) {
      const theme = darkMode?.value ? 'dark' : 'light'
      await nextTick()
      chart = echarts.init(domRef.value, theme)
      if (renderFun)
        renderFun(chart)

      update(options.value)
    }
  }

  function resize() {
    chart?.resize()
  }

  function destroy() {
    chart?.dispose()
  }

  function updateTheme() {
    destroy()
    render()
  }

  watch([width, height], () => {
    if (canRender()) {
      if (!isRendered())
        render()
      else
        resize()
    }
  })

  watch(options, (newValue) => {
    update(newValue)
  })

  watch(darkMode || computed(() => false), () => {
    updateTheme()
  })

  onUnmounted(() => {
    destroy()
  })

  return {
    domRef,
    update,
  }
}
