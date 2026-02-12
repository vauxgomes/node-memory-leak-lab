export const config = {
  api: {
    version: process.env.API_VERSION || 'beta',
    port: Number(process.env.PORT) || 3000
  },
  nodeEnv: process.env.NODE_ENV || 'development',
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173'
  }
}
