const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    const categoryID = "750721240989434008";

    if (!message.member.hasPermission("KICK_MEMBERS")) {
        return message.reply("You don't have permissions to do this!");
    }

    if (!args[0]) return message.reply("please enter a reason");

    let reason = args.slice(0).join(" ");

    if (message.channel.parentID == categoryID) {
        message.channel.delete();

        let embedCreateTicket = new discord.MessageEmbed()
            .setTitle("Ticket: " + message.channel.name)
            .addField(`Ticket closed`, `Reason: ${reason}`)
            .setTimestamp()

        let ticketChannel = message.member.guild.channels.cache.find(channel => channel.name === "discord-logs");

        if (!ticketChannel) return message.reply("This channel does not exist");

        ticketChannel.send(embedCreateTicket);

    } else {

        message.channel.send("Use this command in a ticket!");

    }

}

module.exports.help = {
    name: "close"
}