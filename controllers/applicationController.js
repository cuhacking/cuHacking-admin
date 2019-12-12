const { logger, stringify } = require('../helpers/logger')
const Firestore = require('../model/firestore.js')

const ApplicationController = module.exports

ApplicationController.upload = async (req, res) => {
  logger.verbose('Uploading reviewed applications')

  let applications = req.body[Object.keys(req.body)[0]]
  Firestore.uploadApplications(applications)
  return res.sendStatus(200)
}
