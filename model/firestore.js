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

Firestore.uploadApplications = async applications => {
  let batch = fb.batch()

  applications.forEach(app => {
    let userRef = fb.collection('Users').doc(app.uid)
    batch.update(userRef, {
      review: {
        longAnswerScore: app.score
      },
      appStatus: 'inReview'
    })
  })
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
