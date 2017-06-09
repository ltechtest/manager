import React from 'react'
import ReactDOM from 'react-dom'

import { ipcRenderer } from 'electron'

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

const runningInstances = [
  {
    instanceId: 101,
    instance: {
      restInstance: true
    }
  }
]

const defaultState = {
  tabFocus: 0,
  tabs: [
    {
      title: 'SoundCloud [deadjapan]',
      instanceId: 101,
      // we can not keep a link to the instance, because the instance is mutable
      // so we are keeping the id of the instance in a special array
      hasNotifications: false,
      hasErrors: false,
    }
  ],
  instanceData: {
    101: {
      followers: [1, 2, 3]
    }
  }
}

const tabsReducer = (state = defaultState, { type, value }) => {
  switch(type) {
    case 'SET_FOCUS':
      return { ...state, tabFocus: value }

    case 'OPEN_NEW_TAB':
      let openedTabIndex = state.tabs.findIndex(el => el.instanceId === null)

      if (openedTabIndex !== -1) {
        // switches to already opened new tab instead of creating a new one
        return {
          ...state,
          tabFocus: openedTabIndex
        }
      }

      let newTabs = [
        ...state.tabs,
        {
          title: 'New Tab',
          instanceId: null
        }
      ]

      return {
        ...state,
        tabs: newTabs,
        tabFocus: newTabs.length - 1
      }

    default:
      return state
  }
}

const store = createStore(
  combineReducers({
    router: routerReducer,
    tabs: tabsReducer
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
