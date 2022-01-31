import mongoose from 'mongoose'
import config from './config'

function connect () {
  mongoose
    .connect(config.database.url)
    .then(() => {
      console.log('Connected to database')
    })
    .catch((error: Error) => {
      console.log('Error connecting to database. Exiting now...')
      console.log(error)
      process.exit(1)
    })
}

export default { connect }
