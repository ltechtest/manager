export default (DB, fullState) => {
  let defaultState = {
    appState: fullState.appState,
    appError: fullState.appError,
    services: fullState.services
  }

  return (state = defaultState, { type, value, appError }) => {
    switch (type) {
      case 'UPDATE_APP_STATE':
        return {
          ...state,
          appState: value,
          appError
        }

      case 'LOAD_SERVICES':
        return {
          ...state,
          services: value
        }

      case 'LOAD_AUTH_DATA':
        return {
          ...state,
          authData: value
        }

      case 'POPULATE_STORE_AND_DB':
        let services = ['instagram', 'soundcloud', 'twitter']

        services.forEach((serviceName, id) => {
          DB.services.add({ id, serviceName })
        })

        return {
          ...state,
          services: services.map((service_name, id) => { service_name, id })
        }

      default:
        return state
    }
  }
}
