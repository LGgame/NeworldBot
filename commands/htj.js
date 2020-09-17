const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    
        
    let botEmbed = new discord.MessageEmbed()
        .setTitle("How to join (htj)")
        .setColor("#38ffa5")
        .addField("**Map name:**", "PEI Large")
        .addField("**Ip:**", "185.38.149.171")
        .addField("**Port:**", "27765")
        .setTimestamp();

    return message.channel.send(botEmbed);

}

module.exports.help = {
    name: "htj"
}