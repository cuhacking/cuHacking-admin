import React, { useState } from 'react'
import ReactJson from 'react-json-view'
import { Page } from 'components'

const SearchForm = ({ search, setEmail }) => (
  <form onSubmit={search}>
    <p>
      Email:
      <input name='input' onChange={event => setEmail(event.target.value || '')} />
    </p>
    <button type='submit'>Search</button>
  </form>
)

const UserView = ({ user, name, clearUser, reloadUser }) => {
  const [loading, setLoading] = useState(false)

  const canAdmit =
    user.appStatus !== 'unstarted' &&
    user.appStatus !== 'unsubmitted' &&
    user.appStatus !== 'accepted' &&
    user.appStatus !== 'attending'

  const admitUser = async event => {
    event.preventDefault()

    try {
      setLoading(true)
      const response = await fetch(`${window.location.origin}/api/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uuid: user.uid
        })
      })

      setLoading(false)

      if (response.status === 200) {
        alert('User admitted!')
        // clearUser()
        reloadUser({ preventDefault: () => {} })
      } else {
        alert(`Admittance failed. Code: ${response.status}`)
      }
    } catch (error) {
      console.error('Failed to admit user', error)
      setLoading(false)
      alert('Unknown error')
    }
  }

  return (
    <>
      <h1>{name}</h1>
      <ReactJson src={user} name='user' theme='monokai' />
      {loading ? (
        <p>loading...</p>
      ) : (
        <div>
          <button type='button' onClick={admitUser} disabled={!canAdmit}>
            Admit to event
          </button>
          <button type='button' disabled>
            Print Badge
          </button>
          <button type='button' onClick={clearUser}>
            Get new user
          </button>
        </div>
      )}
    </>
  )
}

const Users = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [user, setUser] = useState(undefined)

  const search = async event => {
    event.preventDefault()

    try {
      setLoading(true)
      const response = await fetch(`${window.location.origin}/api/users?email=${email}`)
      let userObject = (await response.json()).user

      // let userObject = {
      //   application: {
      //     personalInfo: {
      //       firstName: 'Wal',
      //       lastName: 'Wal'
      //     }
      //   },
      //   theRest: 'yo'
      // }
      setName(`${userObject.application.basicInfo.firstName} ${userObject.application.basicInfo.lastName}`)
      userObject.application = '<redacted>'
      setUser(userObject)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Page>
        <h1>Users</h1>
        <p>loading...</p>
      </Page>
    )
  } else if (!user) {
    return (
      <Page>
        <h1>Users</h1>
        <SearchForm search={search} setEmail={setEmail} />
      </Page>
    )
  } else {
    return (
      <Page>
        <h1>Users</h1>
        <UserView user={user} name={name} clearUser={() => setUser(undefined)} reloadUser={search} />
      </Page>
    )
  }
}

export default Users
