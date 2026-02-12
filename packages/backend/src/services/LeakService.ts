import { GlobalCache } from '../experiments/GlobalCache.js'

export class LeakService {
  private globalCache = GlobalCache.getInstance()

  public runGlobalCacheExperiment() {
    return this.globalCache.addData()
  }

  public resetAll() {
    this.globalCache.clear()
  }
}
