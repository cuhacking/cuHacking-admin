const { logger, stringify } = require('../helpers/logger')

const Firestore = module.exports
let fb

Firestore.init = admin => {
  logger.verbose('Initializing Firestore')
  fb = admin.firestore()
}

Firestore.getCollection = async collection => {
  logger.verbose(`Getting collection: ${collection}`)
  const snapshot = await fb.collection(collection).get()
  return snapshot.docs.map(doc => doc.data())
}

Firestore.getDocument = async (collection, id) => {
  const document = await fb
    .collection(collection)
    .doc(id)
    .get()
  return document.data()
}

Firestore.getByEmail = async email => {
  const query = await fb
    .collection('Users')
    .where('email', '==', email)
    .get()

  if (query.docs.length > 1) {
    throw new Error({
      message: 'Email matches more than one user.',
      query: query.forEach(doc => doc.data())
    })
  } else if (query.docs.length === 0) {
    return
  }

  return query.docs[0].data()
}

Firestore.queryUsers = async constraints => {
  // Getting all users
  let users = (await fb.collection('Users').get()).docs.map(doc => doc.data())

  constraints.forEach(({ field, value }) => {
    switch (field) {
      case 'appStatus':
        users = users.filter(user => user.appStatus === value)
        break
      case 'gender':
        users = users.filter(user => user.application.basicInfo.gender === value)
        break
      case 'cityOfOrigin':
        users = users.filter(user =>
          user.application.personalInfo.cityOfOrigin.toLowerCase().includes(value.toLowerCase())
        )
        break
      case 'glutenFree':
        users = users.filter(user => user.application.personalInfo.dietaryRestrictions.glutenFree === value)
        break
      case 'halal':
        users = users.filter(user => user.application.personalInfo.dietaryRestrictions.halal === value)
        break
      case 'lactoseFree':
        users = users.filter(user => user.application.personalInfo.dietaryRestrictions.lactoseFree === value)
        break
      case 'nutFree':
        users = users.filter(user => user.application.personalInfo.dietaryRestrictions.nutFree === value)
        break
      case 'otherDiet':
        users = users.filter(user => user.application.personalInfo.dietaryRestrictions.other)
        break
      case 'vegetarian':
        users = users.filter(user => user.application.personalInfo.dietaryRestrictions.vegetarian === value)
        break
      case 'school':
        users = users.filter(user => user.application.personalInfo.school === value)
        break
      case 'wantsShuttle':
        users = users.filter(user => user.application.personalInfo.wantsShuttle === value)
        break
      case 'under18':
        users = users.filter(user => user.application.terms.under18 === value)
        break
      case 'wave':
        users = users.filter(user => user.review.wave == value)
        break
      case 'longAnswerScore':
        users = users.filter(user => user.review.longAnswerScore == value)
        break
    }
  })

  return users
}

Firestore.setStatus = (uuid, appStatus) => {
  fb.collection('Users')
    .doc(uuid)
    .update({ appStatus })
}

Firestore.getByStatus = async (wave, status) => {
  const query = await fb
    .collection('Users')
    .where('appStatus', '==', status)
    .get()

  const users = query.docs
    .map(doc => doc.data())
    .filter(user => {
      return user.review.wave == wave
    })

  if (users.length === 0) {
    return undefined
  } else {
    return users[0]
  }
}

Firestore.review = async (uuid, wave, score) => {
  await fb
    .collection('Users')
    .doc(uuid)
    .update({
      appStatus: 'inReview',
      review: {
        wave,
        longAnswerScore: score
      }
    })
}

/**
 * [DANGEROUS] Set a collection
 */
// Firestore.setDocuments = async collection => {
//   let batch = fb.batch()

//   collection.forEach(doc => {
//     let docRef = fb.collection('Users').doc(doc.uid)
//     batch.set(docRef, doc)
//   })
//   return batch.commit()
// }

/**
 * [DANGEROUS] Reformat the users collection
 */
// let nextColor = 0
// const foodColors = ['red', 'blue', 'green', 'yellow']
// Firestore.reformat = async users => {
//   logger.verbose('Starting batch')
//   let batch = fb.batch()

//   users.forEach(user => {
//     logger.debug(stringify(user.application.basicInfo))

//     // This gives everyone a color, flattens the review object, moves the name to the top, and lowercase-ifies emails
//     if (!user.color) {
//       batch.update(fb.doc(`Users/${user.uid}`), {
//         color: foodColors[nextColor],
//         wave: user.review.wave,
//         longAnswerScore: user.review.longAnswerScore || null,
//         email: user.email.toLowerCase(),
//         name: !(user.application.basicInfo.firstName == null || user.application.basicInfo.lastName == null)
//           ? `${user.application.basicInfo.firstName.trim()} ${user.application.basicInfo.lastName.trim()}`
//           : null
//       })
//     }
//     nextColor = (nextColor + 1) % foodColors.length
//   })

//   logger.verbose('Batch complete')
//   return batch.commit()
// }

/**
 * [LEGACY] Upload application review JSON
 */
// Firestore.uploadApplications = async applications => {
//   logger.verbose('Starting batch')
//   let batch = fb.batch()

//   applications.forEach(app => {
//     let userRef = fb.collection('Users').doc(app.uid)
//     batch.update(userRef, {
//       review: {
//         wave: 1,
//         longAnswerScore: app.score
//       },
//       appStatus: 'inReview'
//     })
//   })

//   logger.verbose('Batch complete')
//   return batch.commit()

//   // let userRefs = []

//   // await fb.runTransaction(async t => {
//   //   const appDocs = applications.map(app => {
//   //     let ref = fb.collection('Users').doc(app.uid)
//   //     userRefs.push(ref)
//   //     return t.get(ref)
//   //   })

//   //   await Promise.all(appDocs)

//   //   appDocs.forEach((docPromise, i) => {
//   //     docPromise.then(doc => {
//   //       let oldApplication = doc.get('application')
//   //       let updatedApplication = {
//   //         ...oldApplication,
//   //         longAnswerScore: applications[i].score,
//   //         status: 'inReview'
//   //       }

//   //       t.update(userRefs[i], {
//   //         application: updatedApplication
//   //       })
//   //     })
//   //   })
//   // })

//   // logger.verbose('Transaction success!')
// }
