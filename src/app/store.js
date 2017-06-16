import { createStore, combineReducers, applyMiddleware } from 'redux'

import { composeWithDevTools } from 'redux-devtools-extension';

import createDB from './db'

import appState from './reducers/appState'
import tabs from './reducers/tabs'
import content from './reducers/content'
import restSequencer from './reducers/restSequencer'

const runningInstances = [
  {
    instanceId: 101,
    instance: {
      restInstance: true
    }
  }
]

const appName = 'AppDB'
const defaultState = {
  appName,
  appState: 'LOADING',
  appError: null,

  services: [],

  tabFocus: 0,
  tabs: [
    {
      title: 'SoundCloud [deadjapan]',
      instanceId: 101,
      // we can not keep a link to the instance, because the instance is mutable
      // so we are keeping the id of the instance in a special array
      hasNotifications: false,
      hasWarning: false,
      hasErrors: false,
    }
  ],

  authData: {

  },

  instanceData: {
    101: {
      followers: [1, 2, 3]
    }
  }
}

const getAppData = (store, DB) => {
  DB.services.toArray().then(value => {
    store.dispatch({ type: 'LOAD_SERVICES', value })
  })

  DB.auth_data.toArray().then(value => {
    store.dispatch({ type: 'LOAD_AUTH_DATA', value })
  })

  store.dispatch({ type: 'UPDATE_APP_STATE', value: 'READY' })
}

const getReducersList = DB => ({
  app: appState(DB, defaultState, runningInstances),
  tabs: tabs(defaultState, runningInstances),
  content: content(defaultState, runningInstances),
  restSequencer: restSequencer(DB, defaultState, runningInstances)
})

export default (middleware, { ...reducers }) => {
  let DB = createDB(appName)
  let store = createStore(
    combineReducers({
      app: appState(DB, defaultState, runningInstances),
    }),
    composeWithDevTools(applyMiddleware(middleware))
  )

  DB.on('ready', event => {
    store.replaceReducer(
      combineReducers(getReducersList(DB))
    )

    getAppData(store, DB)
  })

  let failedDBCallback = appError => {
    store.dispatch({
      type: 'UPDATE_APP_STATE',
      value: 'ERROR',
      appError
    })
  }

  DB.on('populate', _ => {
    store.dispatch({ type: 'POPULATE_STORE_AND_DB' })
  })

  DB.open().catch(failedDBCallback)
  DB.on('blocked', failedDBCallback)

  return store
}
