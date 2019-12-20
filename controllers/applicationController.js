const { logger, stringify } = require('../helpers/logger')
const Firestore = require('../model/firestore.js')

const ApplicationController = module.exports

/**
 * Uploads a JSON containing an array of objects containing review scores
 * Success Codes: 200
 * Error codes: N/A
 */
ApplicationController.upload = async (req, res, next) => {
  try {
    logger.verbose('Uploading reviewed applications...')

    let applications = req.body[Object.keys(req.body)[0]]
    Firestore.uploadApplications(applications)
    return res.sendStatus(200)
  } catch (error) {
    logger.error('Failed to upload reviewed applications')
    next(error)
  }
}
