import express from 'express'
import cors from 'cors'
import { Router } from 'express'

export function createServer(routes: Router) {
  const app = express()

  app.use(cors())
  app.use(express.json())

  // Prefix
  app.use('/api/v1', routes)

  return app
}
