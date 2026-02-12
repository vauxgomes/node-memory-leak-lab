import type { ILeakEvent } from '@shared/types'

/**
 * This class is for simulating a memory leak by storing data in a global static cache.
 * 
 * **Note**:
 * - The garbage collector is unable to destroy the object.
 * - We would have to explicitly cleared it.
 */
export class GlobalCache {
  private static instance: GlobalCache
  private cache = new Map<string, any>()

  private constructor() {}

  // Singleton
  public static getInstance(): GlobalCache {
    if (!GlobalCache.instance) {
      GlobalCache.instance = new GlobalCache()
    }

    return GlobalCache.instance
  }

  public addData(): ILeakEvent {
    const id = Date.now().toString()
    const heavyObject = {
      data: new Array(10000).fill('A way large object'), // NOTE: About ~0.04 MB accondingly with Gemini
      timestamp: new Date().toISOString()
    }

    // Adding to the object
    this.cache.set(id, heavyObject)

    return {
      type: 'GLOBAL_CACHE',
      message: `Added items to global cache.`,
      activeItems: this.cache.size
    }
  }

  public clear(): void {
    this.cache.clear()
  }
}
