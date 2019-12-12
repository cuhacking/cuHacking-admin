const { logger } = require('../helpers/logger')
const Firestore = require('../model/firestore.js')

const StatsController = module.exports

StatsController.calculate = async (req, res) => {
  logger.info('Calculating stats')

  const users = await Firestore.getCollection('Users')
  const stats = {
    unstarted: 0,
    unfinished: 0,
    submitted: 0,
    inReview: 0,
    accepted: 0,
    waitlisted: 0,
    rejected: 0
  }

  users.forEach(user => stats[user.application.status]++)

  logger.info('Stats calculated')
  res.status(200).send(stats)
}
