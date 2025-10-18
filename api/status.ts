import type { Request, Response } from 'express'
import user from './user.json'

export default function handler(
  req: Request,
  res: Response,
) {
  const { token } = req.body
  if (token) {
    res.status(200).json({
      status: 'ok',
      code: 1,
      token,
      userInfo: user,
      permission: [],
    })
  }
}
