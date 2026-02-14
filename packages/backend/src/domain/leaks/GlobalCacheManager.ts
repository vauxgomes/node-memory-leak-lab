import type { ILeakEvent } from '@shared/types'

/**
 * This class is for simulating a memory leak by storing data in a global static cache.
 *
 * **Note**:
 * - The garbage collector is unable to destroy the object.
 * - We would have to explicitly cleared it.
 */
export class GlobalCacheManager {
  private static instance: GlobalCacheManager
  private cache = new Map<string, any>()

  public addEntries(): ILeakEvent {
    const NUM_ENTRIES = 500_000

    const id = Date.now().toString()
    const heavyObject = {
      data: new Array(NUM_ENTRIES).fill('A way large object'), // NOTE: About 4 MB accondingly with Gemini
      timestamp: new Date().toISOString()
    }

    // Adding to the object
    this.cache.set(id, heavyObject)

    return {
      type: 'GLOBAL_CACHE',
      message: `Added ${NUM_ENTRIES} items to global cache.`,
      activeItems: this.cache.size
    }
  }

  public clear(): void {
    this.cache.clear()
  }
}
