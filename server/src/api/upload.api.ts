import { Buffer } from 'node:buffer'
import { mkdir, stat, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import dayjs from 'dayjs'
import { defineEventHandler, H3 } from 'h3'
import mime from 'mime'
import { nanoid } from 'nanoid'

const router = new H3()
router.post('/upload', defineEventHandler(async (handler) => {
  const formData = await handler.req.formData()
  const file = formData.get('file') as File
  const staticPath = join(import.meta.dirname, '../../', 'static')
  const dirName = dayjs().format('YYYY-MM-DD')
  const dirPath = join(staticPath, dirName)
  const stats = await stat(dirPath).catch(() => {})
  if (!stats?.isDirectory()) {
    await mkdir(dirPath)
  }
  const fileName = `${nanoid()}.${mime.getExtension(file.type)}`
  const filePath = join(dirPath, fileName)
  await writeFile(filePath, Buffer.from(await file.arrayBuffer()))

  return {
    path: `${handler.url.origin}/static/${dirName}/${fileName}`,
  }
}))
export default router
