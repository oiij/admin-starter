import type { UserType } from './user.api'
import { to } from 'await-to-js'
import { post } from '~/utils/http'

export interface LoginType {
  Data: {
    phone: string
    password: string
  }
  CaptchaData: {
    phone: string
    captcha: string
  }
  Res: {
    msg: string
    token: string
    permission: string[]
    userInfo: UserType['Doc']
    isSuperAdmin?: boolean
  }
}
export interface StatusType {
  Data: {
    token: string
  }
  Res: LoginType['Res']
}
export type LoginRecordType = & {
  Doc: {
    ip: string
    userAgent: string
    user: UserType['Doc']
    createdAt: string
    updatedAt: string
  }
  Find: {
    page?: number
    limit?: number
    _id?: string
  }
}

export const loginApi = {
  login(data: LoginType['Data']) {
    return post<LoginType['Res']>('/login', data)
  },
  captchaLogin(data: LoginType['CaptchaData']) {
    return post<LoginType['Res']>('/captcha-login', data)
  },
  _login(data: LoginType['Data']) {
    return to(post<LoginType['Res']>('/login', data))
  },
  status() {
    return post<StatusType['Res']>('/status')
  },
  _status(data: StatusType['Data']) {
    return to(post<StatusType['Res']>('/status', data))
  },
  loginRecord(params: LoginRecordType['Find']) {
    return post<{
      count: number
      list: LoginRecordType['Doc'][]
    }>('/login-record', params)
  },
  captcha(params: { phone: string }) {
    return post<{
      msg: string
      captcha: string
      phone: string
      expire: number
    }>('/captcha', params)
  },
}
