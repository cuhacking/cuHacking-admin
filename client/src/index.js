import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'

import './index.css'
import TabNav from './tabNav'
import { Home, Users, Admittance, Stats, Review } from 'pages'

const App = () => {
  return (
    <BrowserRouter>
      <TabNav />
      {/* <Route path='/' exact component={Home} />
      <Route path='/users' component={Users} />
      <Route path='/admittance' component={Admittance} />
      <Route path='/stats' component={Stats} /> */}
      <Route path='/review' component={Review} />
      <Redirect to='/review' />
    </BrowserRouter>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
