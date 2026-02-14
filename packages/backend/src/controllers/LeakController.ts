import type { Request, Response } from 'express'
import { LeakService } from '../services/LeakService.js'

export class LeakController {
  constructor(private leakService: LeakService) {}

  public triggerGlobalCacheLeak = (req: Request, res: Response) => {
    const result = this.leakService.executeGlobalCacheExperiment()
    res.json(result)
  }

  public triggerEventListenersLeak = (req: Request, res: Response) => {
    const result = this.leakService.executeEventListenerExperiment()
    res.json(result)
  }

  public triggerClosuresLeak = (req: Request, res: Response) => {
    const result = this.leakService.executeClosureExperiment()
    res.json(result)
  }

  public clearAll = (req: Request, res: Response) => {
    this.leakService.clearAll()
    res.json({ status: 'cleared' })
  }
}
