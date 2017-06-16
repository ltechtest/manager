export default function content(state, runningInstances) {
  let defaultState = {
    authData: state.authData,
    instanceData: state.instanceData,
    tabFocus: state.tabFocus
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
