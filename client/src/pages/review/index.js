import React, { useState } from 'react'
import ReactJson from 'react-json-view'
import { Page } from 'components'

const Review = () => {
  const [loading, setLoading] = useState(false)
  const [score, setScore] = useState(0)
  const [wave, setWave] = useState(1)
  const [application, setApplication] = useState(undefined)

  const getApplication = async event => {
    if (event) event.preventDefault()
    setLoading(true)

    const response = await fetch(`${window.location.origin}/api/applications/review?wave=${wave}`)

    if (response.status === 404) {
      alert(`There are no more applications to review in wave ${wave}`)
    } else {
      setApplication(await response.json())
    }

    setLoading(false)
  }

  const reviewApplication = async event => {
    if (event) event.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`${window.location.origin}/api/applications/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uuid: application.uuid,
          wave,
          score
        })
      })

      if (response.status === 200) {
        getApplication()
      } else {
        alert(`Submission failed. Code: ${response.status}`)
      }
    } catch (error) {
      console.error('Failed to submit review', error)
      setLoading(false)
      alert('Unknown error, see console.')
    }
  }

  if (loading) {
    return (
      <Page>
        <h1>Review</h1>
        <p>loading...</p>
      </Page>
    )
  } else if (!application) {
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
    const { challengeStatement, accomplishmentStatement } = application
    return (
      <Page>
        <h1>Review</h1>
        <form onSubmit={reviewApplication}>
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
          <button type='submit'>Next</button>
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
