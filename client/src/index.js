import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import * as firebase from 'firebase/app'
import 'firebase/auth'

import './index.css'
import config from './config.json'
import TabNav from './tabNav'
import { Home, Accounts, Applications } from 'pages'

const env = config.env || 'development'
console.log(`Starting in ${env} mode.`)
const { email, password, firebaseConfig } = config[env]

firebase.initializeApp(firebaseConfig)

const App = () => {
  const [user, initialising, error] = useAuthState(firebase.auth())
  const login = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
  }

  if (initialising) {
    return <h2>Loading...</h2>
  }
  if (error) {
    return <h2>Error: {error}</h2>
  }
  if (user) {
    return (
      <BrowserRouter>
        <TabNav />
        <Route path='/' exact component={Home} />
        <Route path='/accounts' component={Accounts} />
        <Route path='/applications' component={Applications} />
      </BrowserRouter>
    )
  }
  return (
    <button type='button' onClick={login}>
      Start
    </button>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
