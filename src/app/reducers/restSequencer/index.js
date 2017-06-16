import rest from 'npm-rest'
import electronSoundcloudAdapter from './soundcloud.adapter'

rest.registerAdapter(electronSoundcloudAdapter)

let bot = rest.new({
  adapter: 'soundcloud-electron',
  authorization: {
    manual: false
  }
})

bot.run()

export default function restSequencer(db, defaultState, runningInstances) {
  console.log(db)

  return (state = defaultState, { type, value }) => {
    switch (type) {
      case 'GET_AUTH_URL':
        return

      default:
        return state
      }
  }
}
