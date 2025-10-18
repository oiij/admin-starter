import { computed } from 'vue'

export function useClock() {
  const now = useNow()

  const year = computed(() => now.value.getFullYear())
  const month = computed(() => now.value.getMonth())
  const day = computed(() => now.value.getDate())
  const hour = computed(() => now.value.getHours())
  const minute = computed(() => now.value.getMinutes())
  const second = computed(() => now.value.getSeconds())
  const week = computed(() => now.value.getDay())
  const weekName = computed(() => ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][week.value])
  const monthName = computed(() => ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'][month.value])
  const date = computed(() => `${year.value}-${(month.value + 1).toString().padStart(2, '0')}-${day.value.toString().padStart(2, '0')}`)
  const time = computed(() => `${hour.value.toString().padStart(2, '0')}:${minute.value.toString().padStart(2, '0')}:${second.value.toString().padStart(2, '0')}`)
  return {
    now,
    year,
    month,
    day,
    hour,
    minute,
    second,
    week,
    weekName,
    monthName,
    date,
    time,
  }
}
