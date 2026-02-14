import type { ClosureManager } from 'src/domain/leaks/ClosureManager.js'
import type { EventListenerManager } from 'src/domain/leaks/EventListenerManager.js'
import { GlobalCacheManager } from 'src/domain/leaks/GlobalCacheManager.js'

export class LeakService {
  constructor(
    private globalCache: GlobalCacheManager,
    private eventListenerManager: EventListenerManager,
    private closureManager: ClosureManager
  ) {}

  public executeGlobalCacheExperiment() {
    return this.globalCache.addEntries()
  }
  public executeClosureExperiment() {
    return this.closureManager.addClosures()
  }
  public executeEventListenerExperiment() {
    return this.eventListenerManager.addEventListeners()
  }

  public clearAll() {
    this.globalCache.clear()
    this.closureManager.clear()
    this.eventListenerManager.clear()
  }
}
