import { to } from 'await-to-js'

export interface LoginType {
  Data: {
    username: string
    password: string
  }
  Res: {
    msg: string
    token: string
  }
}
export interface StatusType {
  Data: {
    token: string
  }
  Res: {
    token: string
    routes: {
      path: string
      name: string
      permission: number
      permissionStr: string
    }[]
    userInfo: {
      username: string
      nickname: string
      avatar: string
    }
  }
}

export const baseApi = {
  login(data: LoginType['Data']) {
    return post<LoginType['Res']>('/login', data)
  },
  _login(data: LoginType['Data']) {
    return to(post<LoginType['Res']>('/login', data))
  },
  status(data: StatusType['Data']) {
    return post<StatusType['Res']>('/status', data)
  },
  _status(data: StatusType['Data']) {
    return to(post<StatusType['Res']>('/status', data))
  },
}
