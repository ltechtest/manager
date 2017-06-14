import rest from 'npm-rest'
import electronSoundcloudAdapter from './soundcloud.adapter'

rest.registerAdapter(electronSoundcloudAdapter)

let bot = rest.new({
  adapter: 'soundcloud-electron',
  authorization: {
    manual: false
  }
})
console.log(bot, rest)
bot.run()

export default function restSequencer(defaultState, runningInstances) {
  return (state = defaultState, { type, value }) => {
    return state

  }
}
