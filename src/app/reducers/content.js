export default function content(fullState, runningInstances) {
  let defaultState = {
    authData: fullState.authData,
    instanceData: fullState.instanceData,
    tabFocus: fullState.tabFocus
  }

  return (state = defaultState, { type, value }) => {
    switch(type) {
      case 'SET_FOCUS':
        return { ...state, tabFocus: value }

      default:
        return state
    }
  }
}
