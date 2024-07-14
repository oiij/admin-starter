export interface LoginType {
  Data: {
    username: string
    password: string
  }
  Res: {
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
  }
}

export const baseApi = {
  login(data: LoginType['Data']) {
    return post<LoginType['Res']>('/login', data)
  },
  status(data: StatusType['Data']) {
    return post<StatusType['Res']>('/status', data)
  },
}
