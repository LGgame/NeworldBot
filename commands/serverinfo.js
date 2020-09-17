const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    let botIcon = "https://i.imgur.com/JMjjJmw.png";

    let serverEmbed = new discord.MessageEmbed()
        .setDescription("**Server info:**")
        .setColor("#38ffa5")
        // .setThumbnail(Icon)
        .addField("Server name:", message.guild.name, true)
        .addField("Server owner:", message.guild.owner.user.tag, true)
        .addField("You are joined on:", message.member.joinedAt)
        .addField("Total discord members:", message.guild.memberCount)
        .addField("Webstore:", 'https://neworld.tebex.io/')
        .setFooter("By LGgame ©", botIcon)
        .setTimestamp();

    return message.channel.send(serverEmbed);
  
}

module.exports.help = {
    name: "serverinfo"
}