import { computed, onMounted, ref } from 'vue'

export function useClock() {
  const year = ref(new Date().getFullYear())
  const month = ref(new Date().getMonth())
  const day = ref(new Date().getDate())
  const hour = ref(new Date().getHours())
  const minute = ref(new Date().getMinutes())
  const second = ref(new Date().getSeconds())
  const week = ref(new Date().getDay())
  const weekName = computed(() => ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][week.value])
  const monthName = computed(() => ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'][month.value])

  function refresh() {
    year.value = new Date().getFullYear()
    month.value = new Date().getMonth()
    day.value = new Date().getDate()
    hour.value = new Date().getHours()
    minute.value = new Date().getMinutes()
    second.value = new Date().getSeconds()
    week.value = new Date().getDay()
    requestAnimationFrame(refresh)
  }
  onMounted(refresh)
  return {
    year,
    month,
    day,
    hour,
    minute,
    second,
    week,
    weekName,
    monthName,
  }
}
