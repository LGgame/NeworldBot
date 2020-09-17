const discord = require("discord.js");
const fs = require("fs");
const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async(bot, message, args) => {

    if (!message.member.hasPermission("KICK_MEMBERS")) {
        return message.reply("You don't have permissions to do this!");
    }

    if (!args[0]) return message.reply("Please enter a username");

    if (!args[1]) return message.reply("Give a reason");

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("You don't have permissions to do this!");

    let warnUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    let reason = args.slice(1).join(" ");

    if (!warnUser) return message.reply("I can't find that user");

    if (warnUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry, but you can't warn this user!");

    if (!warns[warnUser.id]) warns[warnUser.id] = {
        warns: 0
    };
    
    warns[warnUser.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) =>{
        if (err) console.log(err);
    });


    let embed = new discord.MessageEmbed()
        .setColor("#38ffa5")
        .setTimestamp()
        .setDescription(`**Warned user:** ${warnUser} (${warnUser.id})
        **Warnd by:** ${message.author}
        **Reason:** ${reason}`)
        .addField("Number of warns:", warns[warnUser.id].warns);

    let channel = message.member.guild.channels.cache.get("750721576424439846");

    if (!channel) return;

    channel.send(embed);

    if (warns[warnUser.id].warns) {

        let embed = new discord.MessageEmbed()
            .setColor("#38ffa5")
            .setTimestamp()
            .setDescription(`**Warned user:** ${warnUser} (${warnUser.id})
            **Warnd by:** ${message.author}
            **Reason:** ${reason}`)
            .addField("Number of warns", warns[warnUser.id].warns, "warns");

        let channel = message.member.guild.channels.cache.get("750720301582647386");

        if (!channel) return;

        channel.send(embed);

    }

}

module.exports.help = {
    name: "warn"
}