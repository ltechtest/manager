import { createStore, combineReducers, applyMiddleware } from 'redux'

import { composeWithDevTools } from 'redux-devtools-extension';

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

export default (middleware, { ...reducers }) => {
  return createStore(
    combineReducers({
      ...reducers,
      tabs: tabs(defaultState, runningInstances),
      content: content(defaultState, runningInstances),
      restSequencer: restSequencer(defaultState, runningInstances)
    }),
    composeWithDevTools(applyMiddleware(middleware))
  )
}
