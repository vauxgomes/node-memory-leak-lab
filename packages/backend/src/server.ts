import { createServer } from './app.js'
import { config } from './configs/configs.js'
import { LeakController } from './controllers/LeakController.js'
import { MemoryController } from './controllers/MemoryController.js'
import { ClosureManager } from './domain/leaks/ClosureManager.js'
import { EventListenerManager } from './domain/leaks/EventListenerManager.js'
import { GlobalCacheManager } from './domain/leaks/GlobalCacheManager.js'
import { setupRoutes } from './routes/index.js'
import { LeakService } from './services/LeakService.js'
import { MemoryService } from './services/MemoryService.js'

// Dependency Injection
const memoryService = new MemoryService()
const globalCache = new GlobalCacheManager()
const eventManager = new EventListenerManager()
const closureManager = new ClosureManager()

//
const leakService = new LeakService(globalCache, eventManager, closureManager)

//
const leakController = new LeakController(leakService)
const memoryController = new MemoryController(memoryService)

// Wiring Infrastructure
const routes = setupRoutes(leakController, memoryController)
const app = createServer(routes)

app.listen(config.api.port, () => {
  console.log(
    `Memory Leak Lab API [${config.api.version}] [${config.nodeEnv}] running at ${config.api.port}`
  )
})
