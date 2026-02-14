import { Router } from 'express'
import type { MemoryController } from 'src/controllers/MemoryController.js'
import { LeakController } from '../controllers/LeakController.js'

export function setupRoutes(
  leakController: LeakController,
  memoryController: MemoryController
): Router {
  const router = Router()

  // Stats Route
  router.get('/stats', memoryController.getStats)

  // Leak Experiments
  router.post('/leak/global-cache', leakController.triggerGlobalCacheLeak)
  router.post('/leak/events', leakController.triggerEventListenersLeak)
  router.post('/leak/closures', leakController.triggerClosuresLeak)
  router.post('/leak/clear', leakController.clearAll)

  return router
}
