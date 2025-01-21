import type { DecodeOptions, JwtPayload, SignOptions, VerifyOptions } from 'jsonwebtoken'
import { createCipheriv, createDecipheriv } from 'node:crypto'
import jwt from 'jsonwebtoken'
import { JWT } from '../config'

const { CRYPTO_IV, CRYPTO_KEY, PRIVATE_KEY } = JWT
const encrypt = false
export function aesEncrypt(data: string) {
  const cipher = createCipheriv('aes-256-cbc', CRYPTO_KEY, CRYPTO_IV)
  return (cipher.update(data, 'utf8', 'hex') + cipher.final('hex'))
}
export function aesDecrypt(data: string) {
  const decipher = createDecipheriv('aes-256-cbc', CRYPTO_KEY, CRYPTO_IV)
  return (decipher.update(data, 'hex', 'utf8') + decipher.final('utf8'))
}
export function sign<T extends object>(data: T, options?: SignOptions) {
  const jwtString = jwt.sign(data, PRIVATE_KEY, {
    algorithm: 'HS256',
    expiresIn: '1d',
    ...options,
  })
  return encrypt ? aesEncrypt(jwtString) : jwtString
}

export function verify<T extends object>(token: string, options?: VerifyOptions): Promise<JwtPayload & T | undefined> {
  return new Promise((resolve, reject) => {
    jwt.verify(encrypt ? aesDecrypt(token) : token, PRIVATE_KEY, { complete: false, ...options }, (err, jwtData) => {
      return err ? reject(err) : resolve(jwtData as any)
    })
  })
}
export function decode<T extends object>(token: string, options?: DecodeOptions): JwtPayload & T | null | undefined {
  return jwt.decode(encrypt ? aesDecrypt(token) : token, { ...options }) as any
}
