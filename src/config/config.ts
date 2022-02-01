export default {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'production',
  database: {
    url: process.env.DATABASE_URL || 'mongodb://localhost:27017/express'
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}
