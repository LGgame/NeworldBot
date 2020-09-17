const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    let botIcon = "https://i.imgur.com/JMjjJmw.png";
        
    let botEmbed = new discord.MessageEmbed()
        .setTitle("Neworld Helper bot commands:")
        .setColor("#38ffa5")
        .addField("**,help**", "Gives a command list (this)")
        .addField("**,botinfo**", "Let you see the bot info")
        .addField("**,serverinfo**", "Let you see the discord server info")
        .addField("**,htj**", "Let you see the Ip & Port of the Unturned server")
        
        .addField("**,ticket**", "To make a ticket")
        .addField("**,close**", "To close a ticket")
        
        .addField("**,clear [Number of messages]**", "Deletes the number of specified messages")
        .addField("**,update [Titel | Message]**", "With this you can make a update")

        .addField("**,warn [User | Reason]**", "With this you can warn a user")
        .addField("**,tempmute [User | Time in seconds]**", "With this you can mute a user")

        .setFooter("By LGgame ©", botIcon)
        .setTimestamp();

    return message.channel.send(botEmbed);

}

module.exports.help = {
    name: "help"
}