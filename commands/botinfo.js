const discord = require("discord.js");
const botConfig = require ("../botconfig.json");
const package = require ("../package.json");

module.exports.run = async(bot, message, args) => {

    let botIcon = "https://i.imgur.com/JMjjJmw.png";
        
    let botEmbed = new discord.MessageEmbed()
        .setDescription("**Neworld Helper info:**")
        .setColor("#38ffa5")
        .setThumbnail(botIcon)
        .addField("Bot name:", bot.user.username)
        .addField("Bot version:", package.version)
        .addField("Number of servers:", bot.guilds.cache.size)
        .addField("Number of users:", message.guild.memberCount)
        .addField("Ping:", message.createdTimestamp + "ms", true)
        // .addField("Ping:", Math.round(bot.ping) + "ms",true)
        .addField("Made by:", message.guild.members.cache.get(botConfig.botowner))
        .addField("Made on:", bot.user.createdAt)
        .addField("Suport server:", botConfig.suport)
        //.setFooter("By LGgame ©", botIcon)
        .setTimestamp();

    return message.channel.send(botEmbed);

}

module.exports.help = {
    name: "botinfo"
}