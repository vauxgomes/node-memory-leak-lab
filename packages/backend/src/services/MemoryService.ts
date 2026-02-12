import type { IMemoryStats } from '@shared/types'

/**
 * This class is responsible for getting the data from the V8 engine
 *
 * The metrics hare are:
 * - **Heap Total**: Memory reserved by the engine to objects
 * - **Heap Used**: Memory being used
 * - **External**: Memory used in buffers (by the `libuv`) such as streams and fs
 */
export class MemoryService {
  public getCurrentStats(): IMemoryStats {
    const memory = process.memoryUsage()

    return {
      rss: this.bytesToMB(memory.rss),
      heapTotal: this.bytesToMB(memory.heapTotal),
      heapUsed: this.bytesToMB(memory.heapUsed),
      external: this.bytesToMB(memory.external),
      timestamp: Date.now()
    } satisfies IMemoryStats
  }

  private bytesToMB(bytes: number): number {
    return Math.round((bytes / 1024 / 1024) * 100) / 100
  }
}
