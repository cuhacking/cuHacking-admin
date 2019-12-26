const { logger, stringify } = require('../helpers/logger')
const Firestore = require('../model/firestore.js')

const UserController = module.exports

const validQueryFields = [
  'appStatus',
  'gender', // basicInfo
  'cityOfOrigin', // personalInfo
  'glutenFree', // dietaryRestrictions
  'halal',
  'lactoseFree',
  'nutFree',
  'otherDiet', // When != null
  'vegetarian',
  'school',
  'wantsShuttle',
  'under18', // terms
  'wave', // review
  'longAnswerScore'
]

UserController.getByQuery = async (req, res, next) => {
  try {
    const fields = Object.keys(req.query)

    if (fields.length === 0) {
      logger.verbose('Getting all users...')
      const users = await Firestore.getCollection('Users')

      logger.verbose('Users retrieved')
      res.status(200).send({ users })
    } else {
      if (req.query.email) {
        logger.verbose(`Getting user with email ${req.query.email}`)
        const user = await Firestore.getByEmail(req.query.email)

        if (!user) {
          logger.warn(`User with email ${email} not found`)
          res.sendStatus(404)
        }

        logger.verbose('User retrieved!')
        return res.status(200).send({ user })
      } else {
        logger.verbose('Querying for users...')

        // Check if all the fields are queryable
        fields.forEach(field => {
          if (!validQueryFields.includes(field)) {
            throw new Error(`Invalid query field: ${field}`)
          }
        })

        const users = await Firestore.queryUsers(
          fields.map(field => {
            return {
              field,
              value: req.query[field]
            }
          })
        )

        logger.verbose('Query complete')
        return res.status(200).send({ users })
      }
    }
  } catch (error) {
    logger.error('Error retrieving users')
    next(error)
  }
}

UserController.getByUuid = async (req, res, next) => {
  try {
    logger.verbose(`Getting user with uuid ${req.params.uuid}...`)
    const user = await Firestore.getDocument('Users', req.params.uuid)

    logger.verbose('Retrieved user')
    return res.status(200).send({ user })
  } catch (error) {
    logger.error('Error retrieving user')
    next(error)
  }
}

// DANGEROUS
// UserController.applyBackup = async (req, res) => {
//   logger.verbose('Replacing Users with provided JSON')
//   const { users } = req.body

//   const CHUNK_SIZE = 400 // 500 is the max for firebase

//   const chunks = users.reduce((resultArray, item, index) => {
//     const chunkIndex = Math.floor(index / CHUNK_SIZE)

//     if (!resultArray[chunkIndex]) {
//       resultArray[chunkIndex] = [] // start a new chunk
//     }

//     resultArray[chunkIndex].push(item)
//     return resultArray
//   }, [])

//   chunks.forEach(async chunk => {
//     await Firestore.setDocuments(chunk)
//   })

//   logger.verbose('Users set!')
//   res.sendStatus(200)
// }
