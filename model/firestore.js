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

  if (query.length > 1) {
    throw new Error({
      message: 'Email matches more than one user.',
      query: query.forEach(doc => doc.data())
    })
  }

  return query[0].data()
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
        users = users.filter(user => user.application.personalInfo.cityOfOrigin.includes(value))
        break
      case 'glutenFree':
        users = users.filter(user => user.application.personalInfo.dietaryRestrictions.glutenFree === true)
        break
      case 'halal':
        users = users.filter(user => user.application.personalInfo.dietaryRestrictions.halal === true)
        break
      case 'lactoseFree':
        users = users.filter(user => user.application.personalInfo.dietaryRestrictions.lactoseFree === true)
        break
      case 'nutFree':
        users = users.filter(user => user.application.personalInfo.dietaryRestrictions.nutFree === true)
        break
      case 'otherDiet':
        users = users.filter(user => user.application.personalInfo.dietaryRestrictions.other)
        break
      case 'vegetarian':
        users = users.filter(user => user.application.personalInfo.dietaryRestrictions.vegetarian === true)
        break
      case 'school':
        users = users.filter(user => user.application.personalInfo.school === value)
        break
      case 'wantsShuttle':
        users = users.filter(user => user.application.personalInfo.wantsShuttle === true)
        break
      case 'under18':
        users = users.filter(user => user.application.terms.under18 === true)
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

/**
 * [LEGACY] Upload application review JSON
 */
Firestore.uploadApplications = async applications => {
  logger.verbose('Starting batch')
  let batch = fb.batch()

  applications.forEach(app => {
    let userRef = fb.collection('Users').doc(app.uid)
    batch.update(userRef, {
      review: {
        wave: 1,
        longAnswerScore: app.score
      },
      appStatus: 'inReview'
    })
  })

  logger.verbose('Batch complete')
  return batch.commit()

  // let userRefs = []

  // await fb.runTransaction(async t => {
  //   const appDocs = applications.map(app => {
  //     let ref = fb.collection('Users').doc(app.uid)
  //     userRefs.push(ref)
  //     return t.get(ref)
  //   })

  //   await Promise.all(appDocs)

  //   appDocs.forEach((docPromise, i) => {
  //     docPromise.then(doc => {
  //       let oldApplication = doc.get('application')
  //       let updatedApplication = {
  //         ...oldApplication,
  //         longAnswerScore: applications[i].score,
  //         status: 'inReview'
  //       }

  //       t.update(userRefs[i], {
  //         application: updatedApplication
  //       })
  //     })
  //   })
  // })

  // logger.verbose('Transaction success!')
}

// Dangerous Action! Don't use
// Firestore.setDocuments = async collection => {
//   let batch = fb.batch()

//   collection.forEach(doc => {
//     let docRef = fb.collection('Users').doc(doc.uid)
//     batch.set(docRef, doc)
//   })
//   return batch.commit()
// }
