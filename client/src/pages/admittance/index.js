import React, { useState } from 'react'
import { Page } from 'components'

// https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

// https://stackoverflow.com/a/6274381/9772104
function shuffle(array) {
  let j, x, i
  let a = [...array] // modified to not mutate the argument
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }
  return a
}

const Admittance = () => {
  const [isOperating, setOperating] = useState(false)
  const [admitCapM, setAdmitCapM] = useState(0)
  const [admitCapF, setAdmitCapF] = useState(0)
  const [admitCapO, setAdmitCapO] = useState(0)

  const [loading, setLoading] = useState(false)
  const [wave, setWave] = useState(1)
  const [under18, setUnder18] = useState(false)
  const [score, setScore] = useState(0)
  const [users, setUsers] = useState([])

  const makeQuery = async event => {
    if (event) event.preventDefault()

    setLoading(true)
    // const response = await fetch(
    //   `${window.location.origin}/api/users?appStatus=inReview&wave=${wave}&longAnswerScore=${score}`
    // )
    // const { users } = await response.json()
    const response1 = await fetch(`${window.location.origin}/api/users?appStatus=inReview`)
    const { users: reviewedUsers } = await response1.json()

    const response2 = await fetch(`${window.location.origin}/api/users?appStatus=submitted`)
    const { users: submittedUsers } = await response2.json()

    setUsers([...reviewedUsers, ...submittedUsers])
    setLoading(false)
  }

  const genderFilter = gender =>
    users.filter(user => {
      if (gender === 'Other') {
        return user.application.basicInfo.gender !== 'Male' && user.application.basicInfo.gender !== 'Female'
      } else {
        return user.application.basicInfo.gender === gender
      }
    })

  const admitHackers = async u => {
    if (u.length === 0) return

    setOperating(true)

    await asyncForEach(u, async user => {
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

        if (response.status !== 200) {
          console.error('Invalid status code:', response.status, response.statusText)
        }
      } catch (error) {
        console.error('Something went wrong', error)
      }
    })

    setOperating(false)
    makeQuery()
  }

  return (
    <Page>
      <h1>Admittance</h1>
      {isOperating ? (
        <p>
          DO NOT CLICK AWAY
          <br />
          Admitting hackers...
        </p>
      ) : (
        <>
          <button disabled={!users || users.length === 0} type='button' onClick={() => admitHackers(users)}>
            Admit all
          </button>
          <form onSubmit={makeQuery} style={{ display: 'flex', flexDirection: 'column', margin: '20px 0 50px 0' }}>
            {/* <label style={{ margin: '5px 0' }}>
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
                max={4}
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
            </label> */}
            <button type='submit'>Search</button>
          </form>
          {loading ? (
            <p>loading...</p>
          ) : (
            <>
              <h3>Total: {users.length}</h3>
              {/* <p>Male: {genderFilter('Male').length}</p>
              <div style={{ margin: '0 0 15px' }}>
                <input
                  onChange={event => setAdmitCapM(event.target.value)}
                  type='number'
                  min={0}
                  max={genderFilter('Male').length}
                  disabled={!users || genderFilter('Male').length === 0}
                  value={admitCapM}
                />
                <button
                  disabled={!users || genderFilter('Male').length === 0}
                  type='button'
                  onClick={() => admitHackers(shuffle(genderFilter('Male')).slice(0, admitCapM))}
                >
                  Admit
                </button>
              </div>
              <p>Female: {genderFilter('Female').length}</p>
              <div style={{ margin: '0 0 15px' }}>
                <input
                  onChange={event => setAdmitCapF(event.target.value)}
                  type='number'
                  min={0}
                  max={genderFilter('Female').length}
                  disabled={!users || genderFilter('Female').length === 0}
                  value={admitCapF}
                />
                <button
                  disabled={!users || genderFilter('Female').length === 0}
                  type='button'
                  onClick={() => admitHackers(shuffle(genderFilter('Female')).slice(0, admitCapF))}
                >
                  Admit
                </button>
              </div>
              <p>Other: {genderFilter('Other').length}</p>
              <div style={{ margin: '0 0 15px' }}>
                <input
                  onChange={event => setAdmitCapO(event.target.value)}
                  type='number'
                  min={0}
                  max={genderFilter('Other').length}
                  disabled={!users || genderFilter('Other').length === 0}
                  value={admitCapO}
                />
                <button
                  disabled={!users || genderFilter('Other').length === 0}
                  type='button'
                  onClick={() => admitHackers(shuffle(genderFilter('Other')).slice(0, admitCapO))}
                >
                  Admit
                </button>
              </div> */}
            </>
          )}
        </>
      )}
    </Page>
  )
}
export default Admittance
