const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    // tl.update title | bericht | kleur | kanaal

    if (!message.member.hasPermission("KICK_MEMBERS")) {
        return message.reply("You don't have permissions to do this!");
    }

    let seperator = "|";

    if(args[0] == null){

        let embed = new discord.MessageEmbed()
        .setTitle("Use")
        .setColor("#38ffa5")
        .setDescription(`Make a update with this format: \n ,update title ${seperator} massage ${seperator} channel`);

        return message.reply(embed);

    }

    let argsList = args.join(" ").split(seperator);

    //if(argsList[2] === undefined) argsList[2] = "#d11919";
    if(argsList[2] === undefined) argsList[2] = "discord-logs";

    let options = {

        title: argsList[0],
        bericht: argsList[1] || "You must include a message",
        //kleur: argsList[2].trim(),
        kanaal: argsList[2].trim()

    }

    let botIcon = "https://i.imgur.com/JMjjJmw.png";

    let annouceEmbed = new discord.MessageEmbed()
        .setTitle("Update")
        .setColor("#d11919")
        .setDescription(`Message from the team \n\n ${options.title} \n ${options.bericht}`)
        .setTimestamp()
        .setFooter("By LGgame ©", botIcon);
    let channel = message.member.guild.channels.cache.find(channels => channels.name === options.kanaal);
    if(!channel) return message.reply("This channel does not exist");

    channel.send(annouceEmbed);

}

module.exports.help = {
    name: "update"
}