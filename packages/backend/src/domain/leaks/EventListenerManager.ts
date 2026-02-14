import type { ILeakEvent } from '@shared/types'
import { EventEmitter } from 'events'

/**
 * This class simulates a memory leak by adding a large
 * number of event listeners to an EventEmitter instance.
 *
 * **Note**:
 * - Each listener holds a reference to its callback function, which can lead to increased memory usage if not properly managed.
 * - The garbage collector cannot free the memory used by these listeners until they are removed.
 */
export class EventListenerManager {
  private eventEmitter = new EventEmitter()
  private activeListeners = 0

  public addEventListeners(): ILeakEvent {
    const NUM_EMITTERS = 10_000

    for (let i = 0; i < NUM_EMITTERS; i++) {
      this.eventEmitter.on('leak-event', () => {
        const metadata = {
          id: i,
          timestamp: new Date().toISOString()
        }

        return metadata
      })
    }

    this.activeListeners += NUM_EMITTERS

    return {
      type: 'EVENT_LISTENER',
      message: `Added ${NUM_EMITTERS} event listeners.`,
      activeItems: this.activeListeners
    }
  }

  public clear() {
    this.eventEmitter.removeAllListeners()
    this.activeListeners = 0
  }
}
