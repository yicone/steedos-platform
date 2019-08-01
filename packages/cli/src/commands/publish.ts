const {Command, flags} = require('@oclif/command')
import {Publish} from '../publish'
class PublishCommand extends Command {
  async run() {
    const {flags} = this.parse(PublishCommand)

    await Publish.run(flags.username, flags.password, flags.spaces)
  }
}

// PublishCommand.args = [
// 	{
// 		name:        'username',
// 		required:    true,
// 		description: 'space admin username',
//     },
//     {
// 		name:        'password',
// 		required:    true,
// 		description: 'space admin password',
//     },
//     {
// 		name:        'spaces',
// 		required:    true,
// 		description: 'space ids, multiple separated by commas'
// 	}
// ];

PublishCommand.flags = {
    username: flags.string({char: 'u', description: 'Space admin username', required: true}),
    password: flags.string({char: 'p', description: 'Space admin password', required: true}),
    spaces: flags.string({char: 's', description: 'Space ids, multiple separated by commas', required: true})
}



PublishCommand.description = `publish object list views to db`

module.exports = PublishCommand
