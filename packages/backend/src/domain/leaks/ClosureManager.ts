import type { ILeakEvent } from '@shared/types'

/**
 * This class simulates a memory leak by creating closures that capture large objects.
 * **Note**:
 * - Each closure holds a reference to the captured variables, preventing them from being garbage collected.
 * - The more closures we create, the more memory is consumed, leading to a potential memory leak if not managed properly.
 */
export class ClosureManager {
  private closures: any[] = []

  public addClosures(): ILeakEvent {
    const NUM_CLOSURES = 100_000

    // NOTE: About 4 MB accondingly with Gemini
    const heavyData = new Array(NUM_CLOSURES).fill('Large Data Chunk').join('')

    // Closure that is never called but holds a reference to heavyData, preventing it from being garbage collected
    const closure = () => {
      if (heavyData) return 'Still here!'
    }

    this.closures.push(closure)

    return {
      type: 'CLOSURE',
      message: `Added ${NUM_CLOSURES} closures.`,
      activeItems: this.closures.length
    }
  }

  public clear() {
    this.closures = []
  }
}
