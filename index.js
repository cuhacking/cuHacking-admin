const express = require('express')
const path = require('path')
const app = express()

const admin = require('firebase-admin')
const { init: initFirestore } = require('./model/firestore')

const { logger, stringify } = require('./helpers/logger')
const { applications, stats, users } = require('./routes')

const env = process.env.PROD ? 'production' : 'development'
const serviceAccount = process.env.PROD ? require('./firebase-admin-prod.json') : require('./firebase-admin-dev.json')
const config = require('./config.json')[env]

// Allow the server to parse JSON
app.use(express.json({ limit: '50mb' }))

// Log each request the server receives
app.use('*', (req, res, next) => {
  logger.info(`HTTP request received: ${req.method} -> ${req.originalUrl}`)
  // if (req.method !== 'GET') logger.debug(`Request Body: ${stringify(req.body)}`)
  next()
})

// Log all errors
app.use((error, req, res, next) => {
  logger.error(`Express error: ${stringify(error)}`)
  res.sendStatus(error.status || 500)
})

// Initialize Firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.firebaseUrl,
  databaseAuthVariableOverride: 'cuhacking-admin'
})

// Initializing firestore
initFirestore(admin)

// Frontend
app.use(express.static(path.join(__dirname, './client/build')))
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'))
})

// Backend routes
const backendRouter = express.Router()
backendRouter.use('/applications', applications)
// backendRouter.use('/stats', stats)
backendRouter.use('/users', users)

app.use('/api', backendRouter)

const port = process.env.PORT || 3000
app.listen(port)

logger.info(
  `Admin console is listening on port ${port}${process.env.PROD ? ' in production mode' : ' in development mode'}.`
)
