const { Client, Collection, Intents } = require('discord.js');
const { loadCommands, loadEvents } = require("./util/loader");
const { TOKEN } = require("./config");

client = new Client({ intents: new Intents(32767)}),
["commands", "cooldowns"].forEach(x => client[x] = new Collection());

process.on("uncaughtException", (err)=>{
    console.log(`[ERROR]: ${err}`)
})

loadCommands(client);
loadEvents(client);

client.login(TOKEN)