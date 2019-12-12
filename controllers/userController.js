const { logger, stringify } = require('../helpers/logger')
const Firestore = require('../model/firestore.js')

const UserController = module.exports

UserController.getAll = async (req, res) => {
  logger.verbose('Getting all users')
  const users = await Firestore.getCollection('Users')

  logger.verbose('Users retrieved')
  res.status(200).send({ users })
}

// DANGEROUS
UserController.applyBackup = async (req, res) => {
  logger.verbose('Replacing Users with provided JSON')
  const { users } = req.body

  const CHUNK_SIZE = 400 // 500 is the max for firebase

  const chunks = users.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / CHUNK_SIZE)

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [] // start a new chunk
    }

    resultArray[chunkIndex].push(item)
    return resultArray
  }, [])

  chunks.forEach(async chunk => {
    await Firestore.setDocuments(chunk)
  })

  res.sendStatus(200)
}
