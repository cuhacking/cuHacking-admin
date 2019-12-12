const express = require('express')
const path = require('path')
const app = express()

const admin = require('firebase-admin')
const firebase = require('firebase/app')

const env = process.env.PROD ? 'production' : 'development'
const config = require('./config.json')[env]
const serviceAccount = require('./' + config.firebase_key_file)

// Initialize Firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://cuhacking-dev.firebaseio.com'
})

// Use client files
app.use(express.static(path.join(__dirname, './client/build')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'))
})

const backendRouter = express.Router()
app.use('/api', backendRouter)

const port = process.env.PORT || 3000
app.listen(port)

console.log(`Admin console is listening on port ${port}${process.env.DEV ? ' in development mode.' : '.'}`)
