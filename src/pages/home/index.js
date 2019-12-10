import React, { useEffect, useState } from 'react'
import * as firebase from 'firebase/app'
import { useCollection } from 'react-firebase-hooks/firestore'
import { Page } from 'components'

const Home = () => {
  const [values, loading, error] = useCollection(firebase.firestore().collection('Users'))
  const [stats, setStats] = useState({})

  useEffect(() => {
    let sts = {}
    if (!loading) {
      let docs = values.docs.map(doc => doc.data())
      docs.forEach(user => {
        if (sts[user.application.status]) {
          sts[user.application.status]++
        } else {
          sts[user.application.status] = 1
        }
      })
      setStats(sts)
    }
  }, [loading, values])

  return (
    <Page>
      <h1>cuHacking Admin Console</h1>
      {Object.keys(stats).map(status => (
        <p key={status}>
          {status}: {stats[status]}
        </p>
      ))}
    </Page>
  )
}

export default Home
