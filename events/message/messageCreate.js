const { Collection } = require('discord.js');
const { PREFIX } = require("../../config.js");

module.exports = (client, message) => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return client.emit("directMessage", message);
    if (message.guildId === "845737774949990401") return client.emit("lsPs4Mess", message);
    switch(message.channel.id) {
      case "916013331809177610" :
        client.emit("faq", message);
      return;
    }

    switch(message.channel.parentId) {
      case "913137019104927764" :
        if(message.content === "cancel") return client.emit("cancel", message);
      break;
    }

    const bannedWords = [`discord.gg`, `.gg/`, `.gg /`, `. gg /`, `. gg/`, `discord .gg /`, `discord.gg /`, `discord .gg/`, `discord .gg`, `discord . gg`, `discord. gg`, `discord gg`, `discordgg`, `discord gg /`]

    if (bannedWords.some(word => message.content.toLowerCase().includes(word))) {
      if (message.author.id === message.guild.ownerID) return;
      if(message.author.bot) return;
      return message.delete();
    }

    if(!message.content.startsWith(PREFIX) || message.author.bot) return;
    const args = message.content.slice(PREFIX.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
    if(!command) return;

    if (command.help.staff) {
      if(!message.member.roles.cache.has("913473656078876762")) return message.channel.send("Vous ne pouvez pas faire cette commande !");
    }
    
    if(message.author.id != message.guild.ownerId) {
      if(!message.member.roles.cache.has("913541751350898738")) return message.channel.send("Vous ne pouvez pas faire cette commande !")
    }

    if (command.help.args && !args.length) {
      let noArgsReply = `Il me faut des arguments pour cette commande, ${message.author}!`

    if (command.help.usage) noArgsReply += `\nVoici comment utiliser la commande: \`${PREFIX}${command.help.name} ${command.help.usage}\``
      
      return message.channel.send(noArgsReply);
    }

    if (!client.cooldowns.has(command.help.name)) {
      client.cooldowns.set(command.help.name, new Collection());
    }

    const timeNow = Date.now();
    const tStamps = client.cooldowns.get(command.help.name);
    const cdAmount = (command.help.cooldown || 0) * 1000; 

    if (tStamps.has(message.author.id)) {
      const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;

      if(timeNow < cdExpirationTime) {
        timeLeft = (cdExpirationTime - timeNow) / 1000;
        if (timeLeft > 59) {
          message.reply(`merci d'attendre ${timeLeft.toFixed(0) / 60} minutes avant de réuiliser la commande \`${command.help.name}\`!`)
        } else {
          return message.reply(`merci d'attendre ${timeLeft.toFixed(0)} secondes avant de réuiliser la commande \`${command.help.name}\`!`)
        }

        return
      }
    }

    tStamps.set(message.author.id, timeNow);
    setTimeout(() => tStamps.delete(message.author.id), cdAmount);

    command.run(client, message, args);
}