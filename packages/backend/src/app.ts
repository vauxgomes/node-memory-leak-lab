import express from 'express'
import cors from 'cors'
import { Router } from 'express'
import { config } from './configs/configs.js'

export function createServer(routes: Router) {
  const app = express()

  app.use(
    cors({
      origin: config.cors.origin
    })
  )
  app.use(express.json())
  app.use(`/api/${config.api.version}`, routes) // Prefix

  return app
}
