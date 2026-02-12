import type { Request, Response } from 'express'
import { LeakService } from '../services/LeakService.js'

export class LeakController {
  constructor(private leakService: LeakService) {}

  public triggerGlobalCache = (req: Request, res: Response) => {
    const result = this.leakService.runGlobalCacheExperiment()
    res.json(result)
  }

  public clear = (req: Request, res: Response) => {
    this.leakService.resetAll()
    res.json({ status: 'cleared' })
  }
}
