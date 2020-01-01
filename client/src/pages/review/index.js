import React, { useState } from 'react'
import ReactJson from 'react-json-view'
import { Page } from 'components'

// const ApplicationView = ({ application, clearUser, reloadUser }) => {
//   const [loading, setLoading] = useState(false)

//   const canAdmit =
//     user.appStatus !== 'unstarted' &&
//     user.appStatus !== 'unsubmitted' &&
//     user.appStatus !== 'accepted' &&
//     user.appStatus !== 'attending'

//   const admitUser = async event => {
//     event.preventDefault()

//     try {
//       setLoading(true)
//       const response = await fetch(`${window.location.origin}/api/applications`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           uuid: user.uid
//         })
//       })

//       setLoading(false)

//       if (response.status === 200) {
//         alert('User admitted!')
//         // clearUser()
//         reloadUser({ preventDefault: () => {} })
//       } else {
//         alert(`Admittance failed. Code: ${response.status}`)
//       }
//     } catch (error) {
//       console.error('Failed to admit user', error)
//       setLoading(false)
//       alert('Unknown error')
//     }
//   }

//   return (
//     <>
//       <h1>{name}</h1>
//       <ReactJson src={user} name='user' theme='monokai' />
//       {loading ? (
//         <p>loading...</p>
//       ) : (
//         <div>
//           <button type='button' onClick={admitUser} disabled={!canAdmit}>
//             Admit to event
//           </button>
//           <button type='button' disabled>
//             Print Badge
//           </button>
//           <button type='button' onClick={clearUser}>
//             Get new user
//           </button>
//         </div>
//       )}
//     </>
//   )
// }

const Review = () => {
  const [loading, setLoading] = useState(false)
  const [score, setScore] = useState(0)
  const [wave, setWave] = useState(1)
  const [answers, setAnswers] = useState(undefined)

  const getApplication = async event => {
    if (event) event.preventDefault()
    console.log('next')
    setLoading(true)

    // TODO: fetch, alert if none are left in wave
    //     const response = await fetch(`${window.location.origin}/api/review?wave=${wave}`)

    const mockAnswers = {
      accomplishmentStatement:
        "I believe hackathons present a very unique opportunity to fully dedicate yourself to a project for a weekend in a highly supportive environment. At cuHacking 2020, I hope to fully take advantage of this and learn a new skill while also coming away with a project I can be proud of having completed in the limited amount of time. I'm also excited about meeting new people of differing backgrounds and skill sets, and collaborating with them to create something that has the potential to change the world! After all, in this day and age the world is truly our oyster, and all we need is some imagination and dedication to pry it open to reveal the pearl.",
      challengeStatement:
        'I’m a student enrolled at the coop program at Waterloo, and by the nature of the program it makes for a very challenging environment when it comes to interview season. Nearly every single engineering student starts looking for a job at the same time, and you’re competing with thousands of other applicants for jobs. Although the last time I did a round of interviews I landed a job, it wasn’t the job I was aiming for. Of course I was disappointed in myself and would consider it a time that I failed, but I believe that by this point in my life, and after having done so many interviews already, those types of failures really don’t affect me as a person. It’s just a step along the way; one more experience I have to draw on the next time I come up against the same challenge.'
    }

    setAnswers(mockAnswers)
    setLoading(false)
  }

  const reviewApplication = async event => {
    if (event) event.preventDefault()

    //TODO: send review score and mark as inReview
  }

  if (loading) {
    return (
      <Page>
        <h1>Review</h1>
        <p>loading...</p>
      </Page>
    )
  } else if (!answers) {
    return (
      <Page>
        <h1>Review</h1>
        <form onSubmit={getApplication}>
          <label>
            Wave:{' '}
            <input
              type='number'
              min={1}
              max={3}
              name='wave'
              value={wave}
              onChange={event => setWave(event.target.value)}
            />
          </label>
          <button type='submit'>Start</button>
        </form>
      </Page>
    )
  } else {
    const { challengeStatement, accomplishmentStatement } = answers
    return (
      <Page>
        <h1>Review</h1>
        <form onSubmit={() => {}}>
          <label>
            Score:{' '}
            <input
              min={0}
              max={5}
              type='number'
              name='score'
              value={score}
              onChange={event => setScore(event.target.value)}
            />
          </label>
          <button type='submit'>Submit</button>
          <button type='button' onClick={getApplication}>
            Next
          </button>
        </form>
        <p>
          <i>What are you looking to learn or accomplish at cuHacking 2020?</i>
          <br />
          <br />
          {accomplishmentStatement}
        </p>
        <p style={{ marginTop: 20 }}>
          <i>Tell us about a time you faced a challenge, and how you overcame it.</i>
          <br />
          <br />
          {challengeStatement}
        </p>
      </Page>
    )
  }
}

export default Review
