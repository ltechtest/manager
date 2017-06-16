import Dexie from 'dexie'
// function createDB(appName) {
//   let openRequest = window.indexedDB.open(appName, 1)
//
//   openRequest.onupgradeneeded = event => {
//     let newVersion = event.target.result
//
//     if (!newVersion.objectStoreNames.contains('auth_tokens')) {
//       newVersion.createObjectStore('auth_tokens', { autoIncrement: true })
//     }
//   }
//
//   return openRequest
// }
function createDB(dbName) {
  const DB = new Dexie(dbName)

  DB.version(1).stores({
    users: '++id, name',
    settings: '++id, userId',
    services: '&id, service_name',
    auth_tokens: '++id, serviceId, token'
  })

  return DB
}

export default createDB
