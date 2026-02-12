import { GlobalCacheManager } from 'src/domain/leaks/GlobalCacheManager.js'

export class LeakService {
  private globalCache = GlobalCacheManager.getInstance()

  public runGlobalCacheExperiment() {
    return this.globalCache.addData()
  }

  public resetAll() {
    this.globalCache.clear()
  }
}
