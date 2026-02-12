import { createServer } from './app.js'
import { setupRoutes } from './routes/index.js'
import { LeakController } from './controllers/LeakController.js'
import { MemoryController } from './controllers/MemoryController.js' 
import { LeakService } from './services/LeakService.js'
import { MemoryService } from './services/MemoryService.js'

// Dependency Injection
const memoryService = new MemoryService()
const leakService = new LeakService()

//
const leakController = new LeakController(leakService)
const memoryController = new MemoryController(memoryService)

// Wiring Infrastructure
const routes = setupRoutes(leakController, memoryController)
const app = createServer(routes)

// TODO
const PORT = 3000

app.listen(PORT, () => {
  console.log(`Memory Leak Lab API running at ${PORT}`)
})
