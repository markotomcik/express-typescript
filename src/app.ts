import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import cors from 'cors'

import middlewares from './middlewares'

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(helmet())
app.use(cors())

app.get('/', (req, res) => {
  res.status(404)
  res.send({
    message: 'Hello World!'
  })
})

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

export default app
