import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import { createHashHistory } from 'history'
import { IndexRoute, Route } from 'react-router'
import { Redirect, HashRouter } from 'react-router-dom'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

import App from './components'
import App2 from './components/app2'

const history = createHashHistory()
const middleware = routerMiddleware(history)

const store = createStore(
  combineReducers({
    router: routerReducer
  }),
  applyMiddleware(middleware)
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={App}/>
        <Route path="/test" component={App2}/>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
