import SC from 'node-soundcloud'

export function getSoundcloudUrl(credentials) {
  SC.init({
    id: credentials.clientId,
    secret: credentials.clientSecret,
    uri: credentials.redirectURI
  })

  return SC.getConnectUrl()
}

export function requestHandler(instance, req, res) {
  if (req.query.error) {
    throw new Error(req.query.error_description)
  }

  // http://localhost:8080/callback.html?code=%code%
  SC.authorize(req.query.code, function(error, accessToken) {
    if (error) {
      throw new Error(error)
    } else {
      // Client is now authorized and able to make API calls
      instance._data.auth.accessToken = accessToken
      instance._data.SC = SC

      instance._onAuthorize()

      writeToken('soundcloud', accessToken)
    }
  })
}

export function authorizeWithToken(credentials, settings, instance, accessToken) {
  SC.init({
    accessToken,
    id: credentials.clientId,
    secret: credentials.clientSecret,
    uri: credentials.redirectURI
  })

  instance._data.auth.accessToken = accessToken
  instance._data.SC = SC

  instance._onAuthorize()

  // TODO
  // check here if user can make calls with this accessToken
  // previously there was a SPIKE: JSON parsing errors couln't be caught

  return instance
}

export function authorizeWithoutToken(credentials, settings, instance) {
  let authLink = getSoundcloudUrl(credentials)
  let { spawn } = require('child_process')

  createServer(
    instance.options.authorization.redirectURI,
    requestHandler.bind(requestHandler, instance),
    instance.options.authorization.port
  )

  spawn('open', [authLink])
}

export default function soundcloudAdapter(restSettings) {
  return {
    name: 'soundcloud-electron',
    defaultThreads: 1,
    defaultLimist: {
      callsPerPeriod: 15000,
      period: 86400
    },

    authorization: {
      manual: true
    },

    methods: {
      authorize(credentials, settings, instance) {
        if (!instance._data.auth) {
          instance._data.auth = {}
        }

        console.log('NOW WE CAN MAKE AUTH HERE FOR A SPECIFIC ELECTRON APP', SC)
      },

      deauthorize(credentials, settings, instance) {
        instance._data.auth.accessToken = null
        console.log('@deauthorize', [restSettings, credentials, settings], instance)
      }
    }
  }
}
