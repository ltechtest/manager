export default function content(defaultState, runningInstances) {
  return (state = defaultState, { type, value }) => {
    switch(type) {
      case 'SET_FOCUS':
        return { ...state, tabFocus: value }

      default:
        return state
    }
  }
}
