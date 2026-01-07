import { object, string } from 'zod'

export const loginZod = object({
  phone: string().length(11),
  password: string(),
})
export const captchaZod = object({
  phone: string().length(11),
})
export const captchaLoginZod = object({
  phone: string().length(11),
  captcha: string().length(6),
})
