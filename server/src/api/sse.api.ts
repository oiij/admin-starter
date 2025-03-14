import { createRouter, defineEventHandler, setHeaders } from 'h3'

interface TransformSseData {
  comment?: string
  event?: string
  id?: string
  retry?: number
  data: string | object
}

function transformSseData(object: TransformSseData) {
  const prefix = {
    comment: ':',
    event: 'event:',
    id: 'id:',
    retry: 'retry:',
    data: 'data:',
  } as Record<string, string>
  let result = ''
  Object.entries(object).forEach(([key, value]) => {
    if (key === 'data') {
      result += `${prefix[key]}${JSON.stringify(value)}\n\n`
    }
    else {
      result += `${prefix[key]}${value}\n`
    }
  })
  return result
}
const router = createRouter()
router.get('/sse', defineEventHandler(async (event) => {
  setHeaders(event, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  })
  return transformSseData({
    event: 'connect',
    data: {
      msg: 'hello world',
    },
  })
}))

export default router
