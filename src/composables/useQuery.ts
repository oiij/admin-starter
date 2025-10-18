export function useQuery<T extends Record<string, any>>() {
  const route = useRoute()

  const queryValue = ref<T>(route.query as T)
  const queryUpdateEvent = createEventHook<[T]>()
  const activatedEvent = createEventHook<[T]>()
  watchEffect(() => {
    queryValue.value = route.query as T
    queryUpdateEvent.trigger(queryValue.value)
  })
  onActivated(() => {
    activatedEvent.trigger(queryValue.value)
  })
  return {
    query: queryValue,
    onQueryUpdate: queryUpdateEvent.on,
    onActivated: activatedEvent.on,
  }
}
