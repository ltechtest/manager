import rest from 'npm-rest'
import electronSoundcloudAdapter from './soundcloud.adapter'

rest.registerAdapter(electronSoundcloudAdapter)

let bot = rest.new({
  adapter: 'soundcloud-electron',
  authorization: {
    manual: false
  }
})

export default function restSequencer(db, defaultState, runningInstances) {
  console.log(db)

  return (state = defaultState, { type, value }) => {
    switch (type) {
      case 'RUN_BOT':
        bot.run()

        return state

      default:
        return state
      }
  }
}
