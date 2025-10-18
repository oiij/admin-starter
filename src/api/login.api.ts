import { to } from 'await-to-js'

export type UserType = & {
  username: string
  nickname: string
  avatar: string
  phone?: string
}
export interface LoginType {
  Data: {
    username: string
    password: string
  }
  Res: {
    msg: string
    token: string
    access: string[]
    userInfo: UserType
  }
}
export interface StatusType {
  Data: {
    token: string
  }
  Res: {
    token: string
    access: string[]
    userInfo: UserType
  }
}

export const loginApi = {
  login(data: LoginType['Data']) {
    return post<LoginType['Res']>('/login', data)
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
}
