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

const getReducersList = DB => ({
  appState: appState(DB, defaultState, runningInstances),
  tabs: tabs(defaultState, runningInstances),
  content: content(defaultState, runningInstances),
  restSequencer: restSequencer(DB, defaultState, runningInstances)
})

export default (middleware, { ...reducers }) => {
  let db = createDB(appName)
  let store = createStore(
    combineReducers({
      appState: appState(db, defaultState, runningInstances),
    }),
    composeWithDevTools(applyMiddleware(middleware))
  )


  db.on('ready', event => {
    store.replaceReducer(
      combineReducers(getReducersList(db))
    )

    store.dispatch({ type: 'UPDATE_APP_STATE', appState: 'READY' })
  })

  let failedDBCallback = appError => {
    store.dispatch({
      type: 'UPDATE_APP_STATE',
      appState: 'ERROR',
      appError
    })
  }

  db.on('populate', _ => {
    store.dispatch({ type: 'POPULATE_STORE_AND_DB' })
  })

  db.open().catch(failedDBCallback)
  db.on('blocked', failedDBCallback)

  return store
}
