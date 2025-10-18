import type { Request, Response } from 'express'
import { nanoid } from 'nanoid'
import user from './user.json'

export default function handler(
  req: Request,
  res: Response,
) {
  const { username, password } = req.body
  if (username === 'admin' && password === '21232f297a57a5a743894a0e4a801fc3') {
    return res.status(200).json({
      code: 0,
      token: nanoid(),
      userInfo: user,
    })
  }
  res.status(403).json({
    code: 1,
    msg: '验证失败',
    token: '',
  })
}
