export type MemoryStorageOptions = {
  EX?: number // 过期时间（秒）
}

type StorageItem = {
  value: string
  expiry: number | null
}

class MemoryStorage {
  private storage: Map<string, StorageItem> = new Map()

  constructor() {
    // 每10秒清理一次过期数据
    setInterval(() => this.cleanExpired(), 10000)
  }

  get(key: string): string | null {
    const item = this.storage.get(key)
    if (!item)
      return null

    // 检查是否过期
    if (item.expiry && Date.now() > item.expiry) {
      this.storage.delete(key)
      return null
    }

    return item.value
  }

  set(key: string, value: string, options?: MemoryStorageOptions): void {
    const expiry = options?.EX ? Date.now() + (options.EX * 1000) : null
    this.storage.set(key, { value, expiry })
  }

  private cleanExpired(): void {
    const now = Date.now()
    for (const [key, item] of this.storage.entries()) {
      if (item.expiry && now > item.expiry) {
        this.storage.delete(key)
      }
    }
  }
}

export const memoryStorage = new MemoryStorage()
