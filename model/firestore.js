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
