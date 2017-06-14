let newTabTemplate = {
  title: 'New Tab',
  instanceId: null
}

function createNewInstance(state, instanceType) {
  let newTabs = [
    ...state.tabs.filter(tab => tab.instanceId !== null),
    {
      instanceId: state.tabs.length,
      title: instanceType
    }
  ]

  return {
    ...state,
    tabs: newTabs,
    tabFocus: newTabs.length - 1
  }
}

function openNewTab(state) {
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
    newTabTemplate
  ]

  return {
    ...state,
    tabs: newTabs,
    tabFocus: newTabs.length - 1
  }
}

function closeTab(state, tabIndex) {
  if (state.tabs.length === 1) {
    return {
      ...state,
      tabs: [newTabTemplate]
    }
  }

  let newTabs = state.tabs.slice()
  newTabs.splice(tabIndex, 1)

  let newIndex = state.tabFocus
  if (tabIndex === newIndex) {
    newIndex = 0
    if (tabIndex - 1 >= 0) {
      newIndex = tabIndex - 1
    }
  }

  return {
    ...state,
    tabFocus: newIndex,
    tabs: newTabs
  }
}

export default function tabs(defaultState, runningInstances) {
  return (state = defaultState, { type, value }) => {
    switch (type) {
      case 'CREATE_NEW_INSTANCE':
        return createNewInstance(state, value)

      case 'SET_FOCUS':
        return { ...state, tabFocus: value }

      case 'OPEN_NEW_TAB':
        return openNewTab(state)

      case 'CLOSE_CURRENT_TAB':
        return closeTab(state, state.tabFocus)

      case 'CLOSE_TAB':
        return closeTab(state, value)

      default:
        return state
    }
  }
}
