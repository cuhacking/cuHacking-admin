const got = require('got')
const { logger, stringify } = require('../helpers/logger')
const Firestore = require('../model/firestore.js')

const ApplicationController = module.exports

ApplicationController.admit = async (req, res, next) => {
  try {
    logger.verbose('Admitting hacker...')
    const { uuid } = req.body

    await Firestore.setStatus(uuid, 'accepted')

    logger.verbose(`User ${uuid} marked as accepted! Getting email address...`)
    const email = (await Firestore.getDocument('Users', uuid)).email.toLowerCase()

    if (process.env.PROD) {
      logger.verbose(`Sending email to ${email}...`)
      await got(`https://cuhacking.com/mail/users/${email}`, {
        method: 'POST',
        json: {
          tags: ['accepted', '2020']
        }
      })
    } else {
      logger.verbose(`[DISABLED] Sending email to ${email}...`)
    }

    logger.verbose('Hacker admitted!')
    return res.sendStatus(200)
  } catch (error) {
    logger.error('Failed to admit hackers to hackathon')
    next(error)
  }
}

/**
 * [LEGACY] Uploads a JSON containing an array of objects containing review scores
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
