import React, { useEffect, useState } from 'react'
import { Page } from 'components'
import ReactJson from 'react-json-view'

const Stats = () => {
  const [loading, setLoading] = useState(true) // TODO: change to true when using backend
  const [isUnder18, setUnder18] = useState(false)

  const [total, setTotal] = useState([])
  const [submitted, setSubmitted] = useState([])
  const [inReview, setInReview] = useState([])
  const [accepted, setAccepted] = useState([])
  const [attending, setAttending] = useState([])
  const [withdrawn, setWithdrawn] = useState([])

  const getApplications = async event => {
    if (event) event.preventDefault()

    setLoading(true)

    const response = await fetch(`${window.location.origin}/api/users`)
    const { users } = await response.json()

    let _total = []
    let _submitted = []
    let _inReview = []
    let _accepted = []
    let _attending = []
    let _withdrawn = []

    users.forEach(user => {
      switch (user.appStatus) {
        case 'submitted':
          _submitted.push(user)
          _total.push(user)
          break
        case 'inReview':
          _inReview.push(user)
          _total.push(user)
          break
        case 'accepted':
          _accepted.push(user)
          _total.push(user)
          break
        case 'attending':
          _attending.push(user)
          _total.push(user)
          break
        case 'withdrawn':
          _withdrawn.push(user)
          _total.push(user)
          break
        default:
          break
      }
    })

    setTotal(_total)
    setSubmitted(_submitted)
    setInReview(_inReview)
    setAccepted(_accepted)
    setAttending(_attending)
    setWithdrawn(_withdrawn)

    setLoading(false)
  }

  const waveFilter = wave => users => users.filter(user => user.wave === wave)
  const genderFilter = gender => users =>
    users.filter(user => {
      if (gender === 'Other') {
        return user.application.basicInfo.gender !== 'Male' && user.application.basicInfo.gender !== 'Female'
      } else {
        return user.application.basicInfo.gender === gender
      }
    })

  const ageFilter = users => (isUnder18 ? users.filter(user => user.application.terms.under18 === isUnder18) : users)

  useEffect(() => {
    getApplications()
  }, [])

  return (
    <Page>
      <h1>Attendance Stats</h1>
      {loading ? (
        <p>loading...</p>
      ) : (
        <>
          <button type='button' onClick={getApplications} style={{ marginBottom: 20 }}>
            Refresh
          </button>
          <div>
            <h2>Total</h2>
            <p>total: {total.length}</p>
            <p>submitted: {submitted.length}</p>
            <p>in review: {inReview.length}</p>
            <p>accepted: {accepted.length}</p>
            <p>attending: {attending.length}</p>
            <p>withdrawn: {withdrawn.length}</p>
          </div>
          <div style={{ height: 50 }} />
          <button type='button' onClick={() => setUnder18(!isUnder18)}>
            {isUnder18 ? 'Remove filter' : 'Only minors'}
          </button>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <h2>Wave 1</h2>
              <p>total: {ageFilter(waveFilter(1)(total)).length}</p>
              <div>
                <h3>Male</h3>
                <p>submitted: {ageFilter(waveFilter(1)(genderFilter('Male')(submitted))).length}</p>
                <p>in review: {ageFilter(waveFilter(1)(genderFilter('Male')(inReview))).length}</p>
                <p>accepted: {ageFilter(waveFilter(1)(genderFilter('Male')(accepted))).length}</p>
                <p>attending: {ageFilter(waveFilter(1)(genderFilter('Male')(attending))).length}</p>
                <p>withdrawn: {ageFilter(waveFilter(1)(genderFilter('Male')(withdrawn))).length}</p>
              </div>
              <div>
                <h3>Female</h3>
                <p>submitted: {ageFilter(waveFilter(1)(genderFilter('Female')(submitted))).length}</p>
                <p>in review: {ageFilter(waveFilter(1)(genderFilter('Female')(inReview))).length}</p>
                <p>accepted: {ageFilter(waveFilter(1)(genderFilter('Female')(accepted))).length}</p>
                <p>attending: {ageFilter(waveFilter(1)(genderFilter('Female')(attending))).length}</p>
                <p>withdrawn: {ageFilter(waveFilter(1)(genderFilter('Female')(withdrawn))).length}</p>
              </div>
              <div>
                <h3>Other</h3>
                <p>submitted: {ageFilter(waveFilter(1)(genderFilter('Other')(submitted))).length}</p>
                <p>in review: {ageFilter(waveFilter(1)(genderFilter('Other')(inReview))).length}</p>
                <p>accepted: {ageFilter(waveFilter(1)(genderFilter('Other')(accepted))).length}</p>
                <p>attending: {ageFilter(waveFilter(1)(genderFilter('Other')(attending))).length}</p>
                <p>withdrawn: {ageFilter(waveFilter(1)(genderFilter('Other')(withdrawn))).length}</p>
              </div>
            </div>
            <div style={{ width: 50 }} />
            <div>
              <h2>Wave 2</h2>
              <p>total: {ageFilter(waveFilter(2)(total)).length}</p>
              <div>
                <h3>Male</h3>
                <p>submitted: {ageFilter(waveFilter(2)(genderFilter('Male')(submitted))).length}</p>
                <p>in review: {ageFilter(waveFilter(2)(genderFilter('Male')(inReview))).length}</p>
                <p>accepted: {ageFilter(waveFilter(2)(genderFilter('Male')(accepted))).length}</p>
                <p>attending: {ageFilter(waveFilter(2)(genderFilter('Male')(attending))).length}</p>
                <p>withdrawn: {ageFilter(waveFilter(2)(genderFilter('Male')(withdrawn))).length}</p>
              </div>
              <div>
                <h3>Female</h3>
                <p>submitted: {ageFilter(waveFilter(2)(genderFilter('Female')(submitted))).length}</p>
                <p>in review: {ageFilter(waveFilter(2)(genderFilter('Female')(inReview))).length}</p>
                <p>accepted: {ageFilter(waveFilter(2)(genderFilter('Female')(accepted))).length}</p>
                <p>attending: {ageFilter(waveFilter(2)(genderFilter('Female')(attending))).length}</p>
                <p>withdrawn: {ageFilter(waveFilter(2)(genderFilter('Female')(withdrawn))).length}</p>
              </div>
              <div>
                <h3>Other</h3>
                <p>submitted: {ageFilter(waveFilter(2)(genderFilter('Other')(submitted))).length}</p>
                <p>in review: {ageFilter(waveFilter(2)(genderFilter('Other')(inReview))).length}</p>
                <p>accepted: {ageFilter(waveFilter(2)(genderFilter('Other')(accepted))).length}</p>
                <p>attending: {ageFilter(waveFilter(2)(genderFilter('Other')(attending))).length}</p>
                <p>withdrawn: {ageFilter(waveFilter(2)(genderFilter('Other')(withdrawn))).length}</p>
              </div>
            </div>
            <div style={{ width: 50 }} />
            <div>
              <h2>Wave 3</h2>
              <p>total: {ageFilter(waveFilter(3)(total)).length}</p>
              <div>
                <h3>Male</h3>
                <p>submitted: {ageFilter(waveFilter(3)(genderFilter('Male')(submitted))).length}</p>
                <p>in review: {ageFilter(waveFilter(3)(genderFilter('Male')(inReview))).length}</p>
                <p>accepted: {ageFilter(waveFilter(3)(genderFilter('Male')(accepted))).length}</p>
                <p>attending: {ageFilter(waveFilter(3)(genderFilter('Male')(attending))).length}</p>
                <p>withdrawn: {ageFilter(waveFilter(3)(genderFilter('Male')(withdrawn))).length}</p>
              </div>
              <div>
                <h3>Female</h3>
                <p>submitted: {ageFilter(waveFilter(3)(genderFilter('Female')(submitted))).length}</p>
                <p>in review: {ageFilter(waveFilter(3)(genderFilter('Female')(inReview))).length}</p>
                <p>accepted: {ageFilter(waveFilter(3)(genderFilter('Female')(accepted))).length}</p>
                <p>attending: {ageFilter(waveFilter(3)(genderFilter('Female')(attending))).length}</p>
                <p>withdrawn: {ageFilter(waveFilter(3)(genderFilter('Female')(withdrawn))).length}</p>
              </div>
              <div>
                <h3>Other</h3>
                <p>submitted: {ageFilter(waveFilter(3)(genderFilter('Other')(submitted))).length}</p>
                <p>in review: {ageFilter(waveFilter(3)(genderFilter('Other')(inReview))).length}</p>
                <p>accepted: {ageFilter(waveFilter(3)(genderFilter('Other')(accepted))).length}</p>
                <p>attending: {ageFilter(waveFilter(3)(genderFilter('Other')(attending))).length}</p>
                <p>withdrawn: {ageFilter(waveFilter(3)(genderFilter('Other')(withdrawn))).length}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </Page>
  )
}

export default Stats
