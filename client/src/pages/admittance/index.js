import React, { useState } from 'react'
import { Page } from 'components'

// https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

const Admittance = () => {
  const [isOperating, setOperating] = useState(false)
  const [ongoingOps, setOngoingOps] = useState(0)
  const [totalOps, setTotalOps] = useState(0)
  const [loading, setLoading] = useState(false)
  const [wave, setWave] = useState(1)
  const [under18, setUnder18] = useState(false)
  const [score, setScore] = useState(0)
  const [users, setUsers] = useState([])

  const makeQuery = async event => {
    event.preventDefault()

    setLoading(true)
    const response = await fetch(
      `${window.location.origin}/api/users?appStatus=inReview&wave=${wave}&under18=${under18}&longAnswerScore=${score}`
    )
    const { users } = await response.json()

    setUsers(users)
    setLoading(false)
    console.log(users)
  }

  const genderFilter = gender =>
    users.filter(user => {
      if (gender === 'Other') {
        return (
          user.application.basicInfo.gender === 'Prefer not to answer' || user.application.basicInfo.gender === 'Other'
        )
      } else {
        return user.application.basicInfo.gender === gender
      }
    })

  const admitHackers = async () => {
    setOperating(true)
    setTotalOps(users.length)
    setOngoingOps(0)

    await asyncForEach(users, async user => {
      try {
        const response = await fetch(`${window.location.origin}/api/applications`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            uuid: user.uid
          })
        })

        setOngoingOps(ongoingOps + 1)
        if (response.status !== 200) {
          console.error('Invalid status code:', response.status, response.statusText)
        }
      } catch (error) {
        console.error('Something went wrong', error)
      }
    })

    setOperating(false)
  }

  return (
    <Page>
      <h1>Admittance</h1>
      {isOperating ? (
        <p>
          DO NOT CLICK AWAY
          <br />
          Admitting hackers: ({ongoingOps}/{totalOps})
        </p>
      ) : (
        <>
          <button disabled={!users || users.length === 0} type='button' onClick={admitHackers}>
            Admit all
          </button>
          <form onSubmit={makeQuery} style={{ display: 'flex', flexDirection: 'column', margin: '20px 0 50px 0' }}>
            <label style={{ margin: '5px 0' }}>
              <input
                onChange={event => setUnder18(event.target.checked)}
                name='under18'
                type='checkbox'
                checked={under18}
              />
              under 18
            </label>
            <label style={{ margin: '5px 0' }}>
              wave:
              <input
                onChange={event => setWave(event.target.value)}
                name='wave'
                type='number'
                min={1}
                max={2}
                value={wave}
              />
            </label>
            <label style={{ margin: '10px 0' }}>
              score:
              <input
                onChange={event => setScore(event.target.value)}
                name='score'
                type='number'
                min={0}
                max={5}
                value={score}
              />
            </label>
            <button type='submit'>Search</button>
          </form>
          {loading ? (
            <p>loading...</p>
          ) : (
            <>
              <h3>Total: {users.length}</h3>
              <p>Male: {genderFilter('Male').length}</p>
              <p>Female: {genderFilter('Female').length}</p>
              <p>Other: {genderFilter('Other').length}</p>
            </>
          )}
        </>
      )}
    </Page>
  )
}
export default Admittance
