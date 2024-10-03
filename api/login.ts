import type { Request, Response } from 'express'
import { nanoid } from 'nanoid'

export default function handler(
  req: Request,
  res: Response,
) {
  const { username, password } = req.body
  if (username === 'admin' && password === 'admin') {
    return res.status(200).json({
      code: 0,
      token: nanoid(),
    })
  }
  res.status(403).json({
    code: 1,
    msg: '验证失败',
    token: '',
  })
}
