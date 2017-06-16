import Dexie from 'dexie'

function createDB(dbName) {
  const DB = new Dexie(dbName)

  DB.version(1).stores({
    users: '++id, name',
    settings: '++id, userId',
    services: '&id, serviceName',
    auth_data: '&serviceId, apiKey, apiSecret, callbackURI, grantType',
    auth_tokens: '&serviceId, token',
  })

  return DB
}

export default createDB
