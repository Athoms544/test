const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { DB } = require('../../db')

module.exports = client => {
    console.log(`Connected!`)

    setInterval(function() {
        let statuts = ["New-Athoms City RP", "Dev Thomas_bons544#0933"]
        let stats = statuts[Math.floor(Math.random()*statuts.length)];
        client.user.setActivity(stats, { type: "WATCHING" }); 
    }, 10000)
}