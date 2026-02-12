import { createServer } from './app.js'
import { setupRoutes } from './routes/index.js'
import { LeakController } from './controllers/LeakController.js'
import { MemoryController } from './controllers/MemoryController.js'
import { LeakService } from './services/LeakService.js'
import { MemoryService } from './services/MemoryService.js'
import { config } from './configs/configs.js'

// Dependency Injection
const memoryService = new MemoryService()
const leakService = new LeakService()

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
