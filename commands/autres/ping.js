const { DB } = require("../../db")
const MESSAGES = require("../../util/constants.json")

module.exports.run = (client, message, args) => {
    message.channel.send("Pong !")

    message.delete()
}

module.exports.help = MESSAGES.COMMANDS.AUTRES.PING;