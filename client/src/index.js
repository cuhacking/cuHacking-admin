import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'

import './index.css'
import TabNav from './tabNav'
import { Home, Admittance, Users } from 'pages'

const App = () => {
  return (
    <BrowserRouter>
      <TabNav />
      <Route path='/' exact component={Home} />
      <Route path='/users' component={Users} />
      <Route path='/admittance' component={Admittance} />
      {/* <Route path='/applications' component={Applications} /> */}
    </BrowserRouter>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
