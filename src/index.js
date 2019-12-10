import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import './index.css'
import TabNav from './tabNav'
import { Home, Accounts, Applications } from 'pages'

const App = () => (
  <BrowserRouter>
    <TabNav />
    <Route path='/' exact component={Home} />
    <Route path='/accounts' component={Accounts} />
    <Route path='/applications' component={Applications} />
  </BrowserRouter>
)

ReactDOM.render(<App />, document.getElementById('root'))
