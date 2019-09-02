import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Redirect, Route} from 'react-router-dom'
import './index.css';
import TabNav from './tabNav'
import {Home, AccountManager, MapEditor} from 'pages';

const App = () => (
  <BrowserRouter>
    <TabNav/>
    <Route path='/' exact render={() => <Redirect to='/admin'/>}/>
    <Route path='/admin' exact component={Home}/>
    <Route path='/admin/accounts' component={AccountManager}/>
    <Route path='/admin/map' component={MapEditor}/>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('root'));
