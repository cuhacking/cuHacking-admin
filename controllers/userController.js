const { logger, stringify } = require('../helpers/logger')
const Firestore = require('../model/firestore.js')

const UserController = module.exports

UserController.getAll = async (req, res, next) => {
  try {
    logger.verbose('Getting all users...')
    const users = await Firestore.getCollection('Users')

    logger.verbose('Users retrieved')
    res.status(200).send({ users })
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

// const APPLICATION_SCHEMA = {
//   status: null,
//   basicInfo: {
//     firstName: null,
//     lastName: null,
//     gender: null,
//     otherGender: null,
//     ethnicity: null,
//     otherEthnicity: null,
//     emergencyPhone: null
//   },
//   personalInfo: {
//     school: null,
//     otherSchool: null,
//     major: null,
//     minor: null,
//     degree: null,
//     expectedGraduation: null,
//     cityOfOrigin: null,
//     tShirtSize: null,
//     dietaryRestrictions: {
//       halal: false,
//       vegetarian: false,
//       lactoseFree: false,
//       treeNutFree: false,
//       glutenFree: false,
//       other: null
//     },
//     wantsShuttle: false
//   },
//   skills: {
//     numHackathons: 0,
//     selfTitle: null,
//     accomplishmentStatement: null,
//     challengeStatement: null
//   },
//   profile: {
//     github: null,
//     linkedin: null,
//     website: null,
//     soughtPosition: null,
//     resume: false
//   },
//   terms: {
//     codeOfConduct: false,
//     privacyPolicy: false,
//     under18: false
//   }
// }

// const { emails } = require('../resumes-12-12.json')
// UserController.runScript = async (req, res, next) => {
//   logger.verbose('Replacing Users with provided JSON')
//   const users = await Firestore.getCollection('Users')

//   const CHUNK_SIZE = 100 // 500 is the max for firebase

//   const chunks = users.reduce((resultArray, user, index) => {
//     let newUser = { ...user, application: { ...APPLICATION_SCHEMA, ...user.application } }
//     try {
//       // Set wave
//       newUser.review = { wave: 1 }
//       // Delete application/basicInfo/race
//       delete newUser.application.basicInfo.race
//       // Delete application/stage
//       delete newUser.application.stage
//       // If application/status === 'submitted', set appStatus to 'submitted'
//       if (newUser.application.status === 'submitted') newUser.appStatus = 'submitted'
//       // If application/status === 'unstarted', set appStatus to 'unsubmitted'
//       if (newUser.application.status === 'unstarted') newUser.appStatus = 'unsubmitted'
//       // Delete application/status
//       delete newUser.application.status
//       // If application/profile/resume isn't null, set to true
//       newUser.application.profile.resume = emails.includes(newUser.email)
//       // change application/personalInfo/dietaryRestrictions/treeNutsFree to application/personalInfo/dietaryRestrictions/nutFree
//       newUser.application.personalInfo.dietaryRestrictions.nutFree = newUser.application.personalInfo
//         .dietaryRestrictions.treeNutFree
//         ? true
//         : false
//       delete newUser.application.personalInfo.dietaryRestrictions.treeNutFree
//       // If application/personalInfo/degree is null, set to 'Bachelor'
//       if (newUser.application.personalInfo.degree === null) newUser.application.personalInfo.degree = 'Bachelor'
//       // If application/personalInfo/wantsShuttle is null, set to false
//       if (newUser.application.personalInfo.wantsShuttle === null) newUser.application.personalInfo.wantsShuttle = false
//       // If application/personalInfo/tShirtSize is null, set to 'Small'
//       if (newUser.application.personalInfo.tShirtSize === null) newUser.application.personalInfo.tShirtSize = 'Small'
//       // If application/personalInfo/expectedGraduation is null, set to 2019
//       if (newUser.application.personalInfo.expectedGraduation === null)
//         newUser.application.personalInfo.expectedGraduation = 2019
//       // Set application/personalInfo/expectedGraduation to a number
//       if (newUser.application.personalInfo.expectedGraduation !== 2019)
//         newUser.application.personalInfo.expectedGraduation = Number(
//           newUser.application.personalInfo.expectedGraduation
//         )

//       newUser.application.skills.numHackathons = Number(newUser.application.skills.numHackathons)
//       // If application/profile/soughtPosition is null, set to 'Internship (Co-op)'
//       if (newUser.application.profile.soughtPosition === null)
//         newUser.application.profile.soughtPosition = 'Internship (Co-op)'

//       // Null checks
//       function nullEmptyStrings(obj) {
//         if (obj && typeof obj == 'object') {
//           let _obj = obj
//           Object.entries(obj).forEach(([key, value]) => {
//             // key is either an array index or object key
//             _obj[key] = nullEmptyStrings(value)
//           })
//           return _obj
//         } else {
//           if (typeof obj === 'string' && obj.trim() == '') return null
//           else return obj
//         }
//       }

//       newUser = nullEmptyStrings(newUser)

//       if (!newUser.application.basicInfo.otherGender) newUser.application.basicInfo.otherGender = null
//       if (!newUser.application.basicInfo.otherEthnicity) newUser.application.basicInfo.otherEthnicity = null

//       if (!newUser.application.skills.accomplishmentStatement) newUser.application.skills.accomplishmentStatement = null
//       if (!newUser.application.skills.challengeStatement) newUser.application.skills.challengeStatement = null

//       logger.debug(stringify(newUser))
//     } catch (error) {
//       logger.error(`Uh oh! ID: ${user.uid} | ${error}`)
//       next(error)
//     }

//     // --- Don't change; this is what applies the changes
//     const chunkIndex = Math.floor(index / CHUNK_SIZE)

//     if (!resultArray[chunkIndex]) {
//       resultArray[chunkIndex] = [] // start a new chunk
//     }

//     resultArray[chunkIndex].push(newUser)
//     return resultArray
//   }, [])

//   chunks.forEach(async chunk => {
//     await Firestore.setDocuments(chunk)
//   })

//   logger.verbose('Script Complete!')
//   res.sendStatus(200)
// }

// // DANGEROUS
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
