/* eslint-disable no-console */
import { useEventSource } from '@oiij/use'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useEventSourceStore = defineStore('eventSourceStore', () => {
  const { status, registerEvent } = useEventSource('/api/sse', { parseMessage: false })
  registerEvent('message', (ev) => {
    console.log(ev)
  })
  return {
    status,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEventSourceStore, import.meta.hot))
}
