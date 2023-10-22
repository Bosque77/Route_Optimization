/* eslint-disable @typescript-eslint/no-misused-promises */
import config from './utils/config'

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import {UserType} from './types'
import usersRouter from './controllers/users-controller'
import landfillRouter from './controllers/landfills-controller'
import regionRouter from './controllers/regions-controller'
import loginRouter from './controllers/login-controller'
import driverRouter from './controllers/drivers-controller'
import orderRouter from './controllers/orders-controller'
import depotRouter from './controllers/depots-controller'
import vehicleRouter from './controllers/vehicles-controller'
import routeRouter from './controllers/routes-controller'
import stripeRouter from './controllers/stripe-controller'
import middleware from './utils/middleware'
import logger from './utils/logger'
import driverLoginRouter from './controllers/driver-login-controller'
import signUpRouter from './controllers/signup-controller'


declare global {
    namespace Express {
      interface Request {
        user?: UserType
        token?: string
      }
    }
  }

logger.info('connecting to', config.MONGODB_URI)
console.log('about to configure the mongo db uri')

const app = express()



console.log(config.MONGODB_URI)
if (config.MONGODB_URI) {
    console.log('configuring mongo db uri')
    mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
        .then(() => {
            logger.info('connected to MongoDB')
            console.log('successfully configured mongo')
        })
        .catch((error) => {
            logger.error('error connection to MongoDB:', error.message)
            console.log('monogo not configured correctly')
        })
}




app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)


app.use('/api/stripe', middleware.userExtractor,stripeRouter)
app.use('/api/regions', middleware.userExtractor,regionRouter)
app.use('/api/landfills', middleware.userExtractor,landfillRouter)
app.use('/api/drivers', middleware.userExtractor,driverRouter)
app.use('/api/orders', middleware.userExtractor,orderRouter)
app.use('/api/routes', middleware.userExtractor,routeRouter)
app.use('/api/depots', middleware.userExtractor,depotRouter)
app.use('/api/vehicles', middleware.userExtractor,vehicleRouter)
app.use('/api/users', middleware.userExtractor,usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/sign-up', signUpRouter)
app.use('/api/login-driver', driverLoginRouter)




app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

export default app