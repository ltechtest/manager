import React from 'react'
import ReactDOM from 'react-dom'

import { ipcRenderer } from 'electron'

import { Provider } from 'react-redux'

import { createHashHistory } from 'history'
import { IndexRoute, Route } from 'react-router'
import { Redirect, HashRouter } from 'react-router-dom'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

import App from './components'
import Header from './components/header'
import Settings from './components/settings'

import createStore from './store'

const history = createHashHistory()
const middleware = routerMiddleware(history)

const store = createStore(middleware, { routerReducer })

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className='container'>
        <Route path="/" component={Header}/>
        <Route exact path="/" component={App}/>
        <Route path="/settings" component={Settings}/>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
