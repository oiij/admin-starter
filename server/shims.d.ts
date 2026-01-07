import 'h3'

// 为了确保这个文件被当作一个模块，添加至少一个 `export` 声明
export {}
declare module 'h3' {
  interface H3EventContext {
    _id: string
    _sessionId: string
    isSuperAdmin?: boolean
  }
}
