import React, { useEffect, useState } from 'react'
import { Page } from 'components'
import useUsers from 'hooks/useUsers'

const Home = () => {
  const users = useUsers()
  const [applications, setApps] = useState({})
  const [answers, setAnswers] = useState({})

  useEffect(() => {
    let sts = {}
    let longAnswer = {
      accomplishment: 0,
      challenge: 0
    }
    users.forEach(user => {
      if (sts[user.application.status]) {
        sts[user.application.status]++
      } else {
        sts[user.application.status] = 1
      }

      if (user.application.status === 'submitted') {
        longAnswer.accomplishment += user.application.skills.accomplishmentStatement ? 1 : 0
        longAnswer.challenge += user.application.skills.challengeStatement ? 1 : 0
      }
    })
    setApps(sts)
    setAnswers(longAnswer)
  }, [users])

  return (
    <Page>
      <h1>cuHacking Admin Console</h1>
      {Object.keys(applications).map(status => (
        <p key={status}>
          {status}: {applications[status]}
        </p>
      ))}
      <p>
        accomplishmentStatement: {answers.accomplishment}
        <br />
        challengeStatement: {answers.challenge}
      </p>
    </Page>
  )
}

export default Home
