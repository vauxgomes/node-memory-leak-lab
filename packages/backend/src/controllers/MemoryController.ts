import type { Request, Response } from 'express'
import { MemoryService } from '../services/MemoryService.js'

export class MemoryController {
  constructor(private memoryService: MemoryService) {}

  /**
   * Endpoint GET /api/stats
   * return Current V8 Status
   */
  public getStats = (req: Request, res: Response) => {
    try {
      const stats = this.memoryService.getCurrentStats()
      res.json(stats)
    } catch (error) {
      res.status(500).json({
        error: 'Failed to retrieve memory statistics'
      })
    }
  }
}
