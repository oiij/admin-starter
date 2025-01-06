import { onMounted, onUnmounted, ref } from 'vue'

export interface ImageVerifyOptions {
  width?: number
  height?: number
  length?: number
  refreshOnClick?: boolean
  minFontSize?: number
  maxFontSize?: number
}

function randomNum(min: number, max: number) {
  const num = Math.floor(Math.random() * (max - min) + min)
  return num
}

function randomColor(min: number, max: number) {
  const r = randomNum(min, max)
  const g = randomNum(min, max)
  const b = randomNum(min, max)
  return `rgb(${r},${g},${b})`
}

export function useImageVerify(options?: ImageVerifyOptions) {
  const { width = 120, height = 40, length = 4, refreshOnClick = true, minFontSize = 20, maxFontSize = 50 } = options ?? {}
  const domRef = ref<HTMLCanvasElement>()
  const code = ref('')
  const imgCode = ref('')

  function validate() {
    return code.value === imgCode.value
  }
  function reset() {
    code.value = ''
  }
  function refresh() {
    drawImgCode()
  }

  function drawImgCode() {
    const _code = draw()
    imgCode.value = _code
    return _code
  }

  function onClick() {
    if (refreshOnClick)
      drawImgCode()
  }
  function draw() {
    let imgCode = ''
    const NUMBER_STRING = '0123456789'
    const ctx = domRef.value?.getContext('2d')
    if (!ctx)
      return imgCode

    ctx.fillStyle = randomColor(180, 230)
    ctx.fillRect(0, 0, width, height)

    for (let i = 0; i < length; i += 1) {
      const text = NUMBER_STRING[randomNum(0, NUMBER_STRING.length)]
      imgCode += text
      const fontSize = randomNum(minFontSize, maxFontSize)
      const deg = randomNum(-45, 45)
      ctx.font = `${fontSize}px Simhei`
      ctx.textBaseline = 'top'
      ctx.fillStyle = randomColor(80, 150)
      ctx.save()
      ctx.translate(25 * i + 25, 15)
      ctx.rotate((deg * Math.PI) / 180)
      ctx.fillText(text, -15 + 5, -15)
      ctx.restore()
    }
    for (let i = 0; i < 10; i += 1) {
      ctx.beginPath()
      ctx.moveTo(randomNum(0, width), randomNum(0, height))
      ctx.lineTo(randomNum(0, width), randomNum(0, height))
      ctx.strokeStyle = randomColor(180, 230)
      ctx.closePath()
      ctx.stroke()
    }
    for (let i = 0; i < 41; i += 1) {
      ctx.beginPath()
      ctx.arc(randomNum(0, width), randomNum(0, height), 1, 0, 2 * Math.PI)
      ctx.closePath()
      ctx.fillStyle = randomColor(150, 200)
      ctx.fill()
    }

    return imgCode
  }
  onMounted(() => {
    if (domRef.value) {
      domRef.value.width = width
      domRef.value.height = height
      domRef.value.style.width = `${width}px`
      domRef.value.style.height = `${height}px`
    }
    drawImgCode()
    domRef.value?.addEventListener('click', onClick)
  })

  onUnmounted(() => {
    domRef.value?.removeEventListener('click', onClick)
  })
  return {
    domRef,
    code,
    imgCode,
    validate,
    reset,
    refresh,
    drawImgCode,
    draw,
  }
}
