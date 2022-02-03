import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import cors from 'cors'

import dotenv from 'dotenv'
import database from './config/database'

import middlewares from './middlewares'
import routes from './routes'

import './passport'

dotenv.config()
database.connect()

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(helmet())
app.use(cors())

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the API'
  })
})

app.use('/api', routes)

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

export default app
