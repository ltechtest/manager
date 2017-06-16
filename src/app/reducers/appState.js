export default (DB, defaultState) => {
  return (state = defaultState.appState, { type, appState, appError }) => {
    switch (type) {
      case 'UPDATE_APP_STATE':
        return { appState, appError }

      case 'POPULATE_STORE_AND_DB':
        let services = ['instagram', 'soundcloud', 'twitter']

        services.forEach((service_name, id) => {
          DB.services.add({ id, service_name })
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
